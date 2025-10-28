@echo off
echo ================================================
echo  Cricket Auction Application - Docker Startup
echo ================================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not installed or not in PATH
    echo Please install Docker Desktop from https://www.docker.com/get-started
    pause
    exit /b 1
)

REM Check if docker-compose is available
docker compose version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker Compose is not available
    echo Please install Docker Desktop which includes Docker Compose
    pause
    exit /b 1
)

echo Docker and Docker Compose found!
echo.
echo Building and starting containers...
echo.

REM Build and start containers
docker compose up --build

pause

