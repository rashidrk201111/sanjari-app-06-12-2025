@echo off
REM ============================================
REM Sanjari Prints - View Logs Script
REM ============================================
REM This script displays logs from various sources

echo.
echo ============================================
echo  Sanjari Prints - View Logs
echo ============================================
echo.

echo Select log source:
echo.
echo 1. Local Docker Container
echo 2. Google Cloud Run (Production)
echo 3. Google Cloud Build
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" goto local_logs
if "%choice%"=="2" goto cloud_logs
if "%choice%"=="3" goto build_logs

echo Invalid choice!
pause
exit /b 1

:local_logs
echo.
echo Fetching local container logs...
echo Press Ctrl+C to exit
echo.
docker logs -f sanjari-prints-local
goto end

:cloud_logs
echo.
REM Load environment variables
if exist .env (
    for /f "tokens=*" %%a in ('type .env ^| findstr /v "^#"') do set %%a
)

if "%GCP_REGION%"=="" set GCP_REGION=asia-south1
if "%GCP_SERVICE_NAME%"=="" set GCP_SERVICE_NAME=sanjari-prints

echo Fetching Cloud Run logs...
echo Press Ctrl+C to exit
echo.
gcloud run services logs read %GCP_SERVICE_NAME% --region %GCP_REGION% --limit 100
echo.
echo Showing live logs (press Ctrl+C to exit)...
gcloud run services logs tail %GCP_SERVICE_NAME% --region %GCP_REGION%
goto end

:build_logs
echo.
echo Fetching Cloud Build logs...
echo.
gcloud builds list --limit 10
echo.
set /p build_id="Enter Build ID to view logs (or press Enter to skip): "
if not "%build_id%"=="" (
    gcloud builds log %build_id%
)
goto end

:end
echo.
pause
