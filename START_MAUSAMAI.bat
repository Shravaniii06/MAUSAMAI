@echo off
title MAUSAMAI - Storm Nowcasting System

echo.
echo ==========================================
echo        MAUSAMAI - NOWCASTING SYSTEM
echo ==========================================
echo.
echo Starting Backend...
echo.

start "MAUSAMAI Backend" cmd /k "cd /d C:\Users\Ram\MAUSAMAI\backend && .\venv\Scripts\activate && uvicorn main:app --reload"

timeout /t 3 /nobreak >nul

echo Starting Frontend...
echo.

start "MAUSAMAI Frontend" cmd /k "cd /d C:\Users\Ram\MAUSAMAI\frontend && npm run dev"

timeout /t 5 /nobreak >nul

echo Opening MAUSAMAI Dashboard...
echo.

start http://localhost:5175

echo.
echo ==========================================
echo       MAUSAMAI IS STARTING...
echo ==========================================
echo.
echo Backend  : http://127.0.0.1:8000
echo Frontend : http://localhost:5175
echo.
echo You can close this window.
echo ==========================================
pause