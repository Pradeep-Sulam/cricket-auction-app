@echo off
echo Starting Cricket Auction Frontend...
cd frontend
echo Installing dependencies...
call npm install
echo Starting development server on http://localhost:3000
call npm start
pause

