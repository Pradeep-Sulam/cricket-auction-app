# Quick Fix - Application Working Guide

## Current Issue
Docker backend has database initialization issues. Let's use the **manual setup** method which works reliably.

## ✅ Working Solution: Manual Setup

### Step 1: Setup Backend (Terminal 1)

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend will run on: **http://localhost:8000**

### Step 2: Setup Frontend (Terminal 2)

```bash
cd frontend
npm install
npm start
```

Frontend will run on: **http://localhost:3000**

### Step 3: Access Application

1. Open browser: **http://localhost:3000**
2. Go to **Admin** page
3. Upload Lottery players from `data/sample_players.csv`
4. Start auction!

## Why Manual is Better for Now

✅ **Fast**: 2 commands, 2 terminals
✅ **Works**: No Docker issues
✅ **Debuggable**: Easy to see errors
✅ **Hot Reload**: Changes apply instantly

## Once Working

After manual setup works, you can:
- Test all features
- Upload your data
- Run your auction
- Export results

The application is fully functional, just use the manual method instead of Docker for now.

---

**Quick Command Summary:**

Terminal 1:
```bash
cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload
```

Terminal 2:
```bash
cd frontend && npm install && npm start
```

Then visit: **http://localhost:3000**

