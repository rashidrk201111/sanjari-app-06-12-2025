@echo off
REM ============================================
REM Sanjari Prints - Local Docker Test Script
REM ============================================
REM This script runs the Docker container locally for testing

echo.
echo ============================================
echo  Sanjari Prints - Local Docker Test
echo ============================================
echo.

REM Load environment variables from .env file
if exist .env (
    echo Loading environment variables from .env file...
    for /f "tokens=*" %%a in ('type .env ^| findstr /v "^#"') do (
        set %%a
    )
) else (
    echo ERROR: .env file not found!
    echo Please copy .env.example to .env and configure your settings.
    pause
    exit /b 1
)

REM Set default values if not provided
if "%GCP_PROJECT_ID%"=="" (
    echo ERROR: GCP_PROJECT_ID not set in .env file
    pause
    exit /b 1
)

if "%DOCKER_IMAGE_TAG%"=="" (
    set DOCKER_IMAGE_TAG=latest
)

set IMAGE_NAME=gcr.io/%GCP_PROJECT_ID%/sanjari-prints:%DOCKER_IMAGE_TAG%
set CONTAINER_NAME=sanjari-prints-local

echo Checking if image exists...
docker image inspect %IMAGE_NAME% >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Image not found. Building image first...
    echo.
    call build.bat
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Build failed!
        pause
        exit /b 1
    )
)

echo.
echo Stopping any existing container...
docker stop %CONTAINER_NAME% >nul 2>nul
docker rm %CONTAINER_NAME% >nul 2>nul

echo.
echo Starting container: %CONTAINER_NAME%
echo Image: %IMAGE_NAME%
echo Port: http://localhost:8080
echo.

REM Run the container with environment variables
docker run -d ^
    --name %CONTAINER_NAME% ^
    -p 8080:8080 ^
    -e VITE_SUPABASE_URL=%VITE_SUPABASE_URL% ^
    -e VITE_SUPABASE_ANON_KEY=%VITE_SUPABASE_ANON_KEY% ^
    -e VITE_RAZORPAY_KEY_ID=%VITE_RAZORPAY_KEY_ID% ^
    -e VITE_PHONEPE_MERCHANT_ID=%VITE_PHONEPE_MERCHANT_ID% ^
    -e VITE_APP_URL=%VITE_APP_URL% ^
    %IMAGE_NAME%

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================
    echo  Container Started Successfully!
    echo ============================================
    echo.
    echo Your application is running at: http://localhost:8080
    echo.
    echo Waiting for application to start...
    timeout /t 5 /nobreak >nul
    echo.
    echo Opening browser...
    start http://localhost:8080
    echo.
    echo Useful commands:
    echo   View logs:    docker logs -f %CONTAINER_NAME%
    echo   Stop:         docker stop %CONTAINER_NAME%
    echo   Remove:       docker rm %CONTAINER_NAME%
    echo.
    echo Press any key to view container logs (Ctrl+C to exit logs)...
    pause >nul
    echo.
    docker logs -f %CONTAINER_NAME%
) else (
    echo.
    echo ============================================
    echo  Container Start Failed!
    echo ============================================
    echo.
    echo Please check the error messages above.
    echo.
)

pause
