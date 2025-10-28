# Quick Start Guide

Get the Cricket Auction Application running in 3 steps!

## Step 1: Install Dependencies

### Backend
```bash
cd backend
pip install -r requirements.txt
```

### Frontend
```bash
cd frontend
npm install
```

## Step 2: Start the Servers

### Terminal 1 - Backend
```bash
cd backend
uvicorn app.main:app --reload
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

## Step 3: Use the Application

1. Open `http://localhost:3000` in your browser
2. Go to **Admin** page
3. Upload a player data file (Excel or CSV)
4. Go to **Auction** page
5. Click **Start Auction** and begin bidding!

## Sample Data Format

Your Excel/CSV file should have these columns:

| Name | Mobile | Role | Photo URL | Stats URL |
|------|--------|------|-----------|-----------|
| John Doe | 1234567890 | Batsman | https://... | https://... |
| Jane Smith | 0987654321 | Bowler | | |

**Required columns**: Name, Mobile, Role  
**Optional columns**: Photo URL, Stats URL

## Need Help?

- See detailed setup: [SETUP.md](SETUP.md)
- Read full documentation: [README.md](README.md)
- Check the Support page in the application

## Troubleshooting

**Backend not starting?**
- Check if Python 3.8+ is installed
- Make sure port 8000 is available
- Try: `python -m pip install --upgrade -r requirements.txt`

**Frontend not starting?**
- Check if Node.js 14+ is installed
- Delete `node_modules` and run `npm install` again
- Make sure port 3000 is available

**CORS errors?**
- Ensure backend is running on port 8000
- Make sure frontend is running on port 3000
- Both servers must be running simultaneously

---

Happy Bidding! 🏏

