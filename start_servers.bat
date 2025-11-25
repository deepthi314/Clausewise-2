@echo off
echo Starting ClauseWise Servers...

start "ClauseWise Backend" cmd /k "cd clausewise-backend && python -m uvicorn app:app --reload --port 8000"
start "ClauseWise Frontend" cmd /k "cd clausewise-frontend && npm run dev"

echo Servers started in new windows.
pause
