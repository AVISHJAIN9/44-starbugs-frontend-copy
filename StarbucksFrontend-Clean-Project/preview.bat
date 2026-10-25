@echo off
title Starbucks Redesign - Preview Production Build
echo ========================================================
echo       Previewing Production Build Locally...
echo ========================================================
set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"
cd /d "%~dp0"
if not exist dist (
    echo Production build not found. Building first...
    call npm run build
)
start http://localhost:4173
npm run preview
