@echo off
REM ============================================
REM Sanjari Prints - Docker Build Script
REM ============================================
REM This script builds the Docker image locally

echo.
echo ============================================
echo  Sanjari Prints - Docker Build
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

echo Building Docker image: %IMAGE_NAME%
echo.

REM Build the Docker image
docker build -t %IMAGE_NAME% .

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================
    echo  Build Successful!
    echo ============================================
    echo.
    echo Image: %IMAGE_NAME%
    echo.
    echo Next steps:
    echo 1. Test locally: run local-test.bat
    echo 2. Deploy to Google Cloud: run deploy.bat
    echo.
) else (
    echo.
    echo ============================================
    echo  Build Failed!
    echo ============================================
    echo.
    echo Please check the error messages above.
    echo.
)

pause
