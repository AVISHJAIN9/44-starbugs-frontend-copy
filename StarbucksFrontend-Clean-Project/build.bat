@echo off
title Starbucks Redesign - Build Production Bundle
echo ========================================================
echo       Building Starbucks Redesign Production Bundle...
echo ========================================================
set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"
cd /d "%~dp0"
call npm run build
echo.
echo Build completed! Assets generated in dist\
pause
