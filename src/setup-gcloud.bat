@echo off
REM ============================================
REM Sanjari Prints - Google Cloud Setup Script
REM ============================================
REM This script sets up Google Cloud CLI and configures the project

echo.
echo ============================================
echo  Sanjari Prints - Google Cloud Setup
echo ============================================
echo.

REM Check if gcloud is installed
where gcloud >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Google Cloud SDK is not installed!
    echo.
    echo Please install it from:
    echo https://cloud.google.com/sdk/docs/install
    echo.
    pause
    exit /b 1
)

echo Google Cloud SDK is installed.
echo.

REM Load environment variables from .env file if it exists
if exist .env (
    echo Loading environment variables from .env file...
    for /f "tokens=*" %%a in ('type .env ^| findstr /v "^#"') do (
        set %%a
    )
    echo.
)

REM Step 1: Authenticate with Google Cloud
echo ============================================
echo Step 1: Authenticating with Google Cloud
echo ============================================
echo.
echo This will open a browser window for authentication.
echo.
pause

gcloud auth login
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Authentication failed!
    pause
    exit /b 1
)

echo.
echo Authentication successful!
echo.

REM Step 2: Set the project
echo ============================================
echo Step 2: Setting up Google Cloud Project
echo ============================================
echo.

if "%GCP_PROJECT_ID%"=="" (
    echo Available projects:
    gcloud projects list
    echo.
    set /p GCP_PROJECT_ID="Enter your Google Cloud Project ID: "
)

gcloud config set project %GCP_PROJECT_ID%
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to set project!
    pause
    exit /b 1
)

echo.
echo Project set to: %GCP_PROJECT_ID%
echo.

REM Step 3: Enable required APIs
echo ============================================
echo Step 3: Enabling Required APIs
echo ============================================
echo.
echo This may take a few minutes...
echo.

echo Enabling Cloud Run API...
gcloud services enable run.googleapis.com

echo Enabling Container Registry API...
gcloud services enable containerregistry.googleapis.com

echo Enabling Cloud Build API...
gcloud services enable cloudbuild.googleapis.com

echo.
echo APIs enabled successfully!
echo.

REM Step 4: Set default region
echo ============================================
echo Step 4: Setting Default Region
echo ============================================
echo.

if "%GCP_REGION%"=="" (
    echo Recommended regions for India:
    echo   1. asia-south1 (Mumbai)
    echo   2. asia-south2 (Delhi)
    echo   3. asia-southeast1 (Singapore)
    echo.
    set /p GCP_REGION="Enter your preferred region [asia-south1]: "
    if "%GCP_REGION%"=="" set GCP_REGION=asia-south1
)

gcloud config set run/region %GCP_REGION%
echo.
echo Default region set to: %GCP_REGION%
echo.

REM Step 5: Configure Docker authentication
echo ============================================
echo Step 5: Configuring Docker Authentication
echo ============================================
echo.

gcloud auth configure-docker
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Docker configuration failed!
    pause
    exit /b 1
)

echo.
echo Docker authentication configured successfully!
echo.

REM Step 6: Update .env file with GCP settings
echo ============================================
echo Step 6: Updating .env file
echo ============================================
echo.

if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env
)

REM Create a PowerShell script to update the .env file
echo $envContent = Get-Content .env > update-env.ps1
echo $envContent = $envContent -replace "^GCP_PROJECT_ID=.*", "GCP_PROJECT_ID=%GCP_PROJECT_ID%" >> update-env.ps1
echo $envContent = $envContent -replace "^GCP_REGION=.*", "GCP_REGION=%GCP_REGION%" >> update-env.ps1
echo $envContent ^| Set-Content .env >> update-env.ps1

powershell -ExecutionPolicy Bypass -File update-env.ps1
del update-env.ps1

echo.
echo .env file updated with GCP configuration.
echo.

REM Summary
echo ============================================
echo  Setup Complete!
echo ============================================
echo.
echo Configuration Summary:
echo   Project ID: %GCP_PROJECT_ID%
echo   Region: %GCP_REGION%
echo.
echo Next steps:
echo   1. Update your .env file with Supabase and payment gateway credentials
echo   2. Build Docker image: run build.bat
echo   3. Test locally: run local-test.bat
echo   4. Deploy to Cloud Run: run deploy.bat
echo.

pause
