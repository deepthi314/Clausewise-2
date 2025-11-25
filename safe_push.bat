@echo off
REM Try to add origin, suppress error if it exists
git remote add origin https://github.com/deepthi314/Clausewise-2.git 2>NUL

REM Set the URL to ensure it's correct (safe even if it exists)
git remote set-url origin https://github.com/deepthi314/Clausewise-2.git

REM Push to main
git push -u origin main
