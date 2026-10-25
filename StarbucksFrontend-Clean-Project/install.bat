@echo off
title Starbucks Redesign - Install Dependencies
echo ========================================================
echo       Installing Dependencies for Starbucks App...
echo ========================================================
set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"
cd /d "%~dp0"
call npm install
echo.
echo Dependencies installed successfully!
pause
