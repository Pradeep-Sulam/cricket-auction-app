@echo off
echo Starting Cricket Auction Backend Server...
cd backend
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)
echo Activating virtual environment...
call venv\Scripts\activate
echo Installing dependencies...
pip install -r requirements.txt
echo Starting server on http://localhost:8000
uvicorn app.main:app --reload
pause

