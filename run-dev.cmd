@echo off
REM Run from project root: installs deps (if needed), starts Vite, opens browser
cd /d "%~dp0"

echo Checking Node and npm versions...
node -v >nul 2>&1 || (
  echo Node.js is not installed or not on PATH. Please install Node.js first.
  pause
  exit /b 1
)
npm -v >nul 2>&1 || (
  echo npm is not available. Please ensure npm is installed.
  pause
  exit /b 1
)

echo Installing dependencies (this may take a while)...
npm install

echo Starting dev server in a new terminal...
start "Vite Dev" cmd /k "npm run dev"

REM Give Vite a short moment to start before opening the browser
timeout /t 2 /nobreak >nul

echo Opening browser to http://localhost:5173
start "" "http://localhost:5173"

exit /b 0
