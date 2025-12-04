@echo off
REM ============================================
REM Sanjari Prints - Stop Local Container Script
REM ============================================
REM This script stops and removes the local Docker container

echo.
echo ============================================
echo  Sanjari Prints - Stop Local Container
echo ============================================
echo.

set CONTAINER_NAME=sanjari-prints-local

echo Checking if container is running...
docker ps -q -f name=%CONTAINER_NAME% >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Stopping container: %CONTAINER_NAME%
    docker stop %CONTAINER_NAME%
    
    echo Removing container: %CONTAINER_NAME%
    docker rm %CONTAINER_NAME%
    
    echo.
    echo Container stopped and removed successfully!
) else (
    echo Container is not running.
)

echo.
pause
