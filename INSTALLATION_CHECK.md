# Installation Check

Use this guide to verify your installation is complete and ready to run.

## ✅ Prerequisites Check

Run these commands to verify you have everything:

```bash
# Check Python version (should be 3.8 or higher)
python --version
# OR
python3 --version

# Check Node.js version (should be 14 or higher)
node --version

# Check npm version
npm --version
```

## 📦 Backend Files Check

Verify these files exist in `backend/`:

- [ ] `app/main.py`
- [ ] `app/models.py`
- [ ] `app/database.py`
- [ ] `app/crud.py`
- [ ] `app/routes/admin.py`
- [ ] `app/routes/teams.py`
- [ ] `app/routes/auction.py`
- [ ] `app/routes/download.py`
- [ ] `app/routes/support.py`
- [ ] `app/utils/file_parser.py`
- [ ] `requirements.txt`

## 🌐 Frontend Files Check

Verify these files exist in `frontend/`:

- [ ] `src/App.js`
- [ ] `src/index.js`
- [ ] `src/index.css`
- [ ] `src/api/api.js`
- [ ] `src/components/Header.jsx`
- [ ] `src/components/PlayerCard.jsx`
- [ ] `src/components/TeamPanel.jsx`
- [ ] `src/components/AuctionControls.jsx`
- [ ] `src/pages/AdminPage.jsx`
- [ ] `src/pages/TeamsPage.jsx`
- [ ] `src/pages/AuctionPage.jsx`
- [ ] `src/pages/DownloadsPage.jsx`
- [ ] `src/pages/SupportPage.jsx`
- [ ] `public/index.html`
- [ ] `package.json`

## 🧪 Installation Test

### Test Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Expected**: Server starts on http://localhost:8000
**Expected**: API docs available at http://localhost:8000/docs

### Test Frontend

```bash
cd frontend
npm install
npm start
```

**Expected**: Server starts on http://localhost:3000
**Expected**: Browser opens automatically

## 🐛 Common Issues

### Issue: "Module not found"
**Solution**: Run `pip install -r requirements.txt` (backend) or `npm install` (frontend)

### Issue: "Port already in use"
**Solution**: 
- Backend: Change port in `uvicorn app.main:app --reload --port 8001`
- Frontend: Press `Ctrl+C` and change port in package.json or environment variable

### Issue: "CORS errors"
**Solution**: Ensure both servers are running and ports match configuration

### Issue: "Database locked"
**Solution**: Close all connections and delete `auction.db`, restart backend

## ✅ Final Checklist

Before using the app, ensure:

- [ ] Python 3.8+ installed
- [ ] Node.js 14+ installed
- [ ] All dependencies installed
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:8000/docs

## 🎉 Ready to Go!

If all checks pass, you're ready to use the application!

1. Start backend: `cd backend && uvicorn app.main:app --reload`
2. Start frontend: `cd frontend && npm start`
3. Open browser: http://localhost:3000
4. Go to Admin page and upload player data

---

Need help? Check SETUP.md or see the Support page in the application.

