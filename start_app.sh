#!/bin/bash
# Start script for Mac/Linux users

echo "🏏 Starting Cricket Auction Application..."
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check dependencies
if ! command_exists python3; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js 14 or higher."
    exit 1
fi

echo "✅ Dependencies found"
echo ""

# Start backend in background
echo "Starting backend server..."
cd backend
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt > /dev/null 2>&1

echo "🚀 Backend starting on http://localhost:8000"
uvicorn app.main:app --reload &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "Starting frontend..."
cd frontend
npm install > /dev/null 2>&1

echo "🎨 Frontend starting on http://localhost:3000"
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Application is starting!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait

