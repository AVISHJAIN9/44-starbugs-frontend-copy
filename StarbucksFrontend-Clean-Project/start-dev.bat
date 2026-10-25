@echo off
title Starbucks Redesign - Development Server
echo ========================================================
echo     Starting Starbucks Redesign Dev Server (Vite)...
echo ========================================================
set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"
cd /d "%~dp0"
if not exist node_modules (
    echo node_modules not found. Installing dependencies first...
    call npm install
)
echo Launching browser at http://localhost:5173 ...
start http://localhost:5173
npm run dev
