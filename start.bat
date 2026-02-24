@echo off
echo ============================================
echo    CYTOMIND - Bone Marrow Cell Classifier
echo ============================================
echo.

REM Check if ensemble_final.pth exists
if not exist "ensemble_final.pth" (
    echo ERROR: ensemble_final.pth not found!
    echo Please download the model file and place it in this folder.
    echo.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
    echo.
)

REM Check MongoDB
sc query MongoDB | find "RUNNING" > nul
if errorlevel 1 (
    echo WARNING: MongoDB service is not running!
    echo Starting MongoDB...
    net start MongoDB
    echo.
)

echo Starting ML Backend (this loads the AI model, wait ~30 seconds)...
start "Cytomind Backend" cmd /k "cd backend && python main.py"

echo Waiting for backend to load...
timeout /t 35 /nobreak > nul

echo.
echo Starting Frontend...
start "Cytomind Frontend" cmd /k "npm run dev"

timeout /t 10 /nobreak > nul

echo.
echo ============================================
echo   Cytomind is running!
echo.
echo   Open in browser: http://localhost:3000
echo.
echo   Backend API:     http://localhost:8000
echo ============================================
echo.
echo Press any key to exit (servers will keep running)
pause > nul
