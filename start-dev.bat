@echo off
REM Windows batch script to start development servers
REM Note: This opens two separate windows

echo Starting Stress & Anxiety Toolkit Development Servers...
echo.


REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

timeout /t 2 /nobreak >nul

echo Starting Next.js frontend server on port 3000...
echo.
echo ==========================================
echo Servers are running:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:8000
echo.
echo Close both windows to stop the servers
echo ==========================================
echo.

start "Next.js Frontend Server" cmd /k "npm run dev"

pause

