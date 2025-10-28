# Network Error Fix Guide

## Issue: "Network Error" When Uploading Files

### Root Cause
Frontend in Docker cannot reach backend API due to CORS or network configuration.

### ✅ Solution Applied

1. **Updated API configuration** (`frontend/src/api/api.js`)
   - Detects environment automatically
   - Uses `/api` proxy for Docker deployment
   - Uses `http://localhost:8000` for development

2. **Updated CORS settings** (`backend/app/main.py`)
   - Now allows all origins: `allow_origins=["*"]`
   - Ensures Docker containers can communicate

3. **Nginx Proxy** (already configured)
   - Proxies `/api` requests to backend
   - Handles CORS properly

### How to Apply Fix

```bash
# Rebuild and restart containers
docker compose down
docker compose up --build -d
```

### Verify Fix

1. Check both containers are running:
   ```bash
   docker compose ps
   ```
   
2. Check backend logs:
   ```bash
   docker compose logs backend
   ```
   
3. Check frontend logs:
   ```bash
   docker compose logs frontend
   ```

### Test Upload

1. Visit http://localhost:3000
2. Go to Admin page
3. Upload `data/sample_players.csv`
4. Should work now!

### Troubleshooting

If still getting errors:

1. **Check containers are running:**
   ```bash
   docker compose ps
   ```
   Both should show "Up"

2. **Check API accessibility:**
   ```bash
   curl http://localhost:8000/
   ```
   Should return JSON

3. **Check browser console:**
   - Open DevTools (F12)
   - Look for error messages
   - Check Network tab

4. **Restart everything:**
   ```bash
   docker compose restart
   ```

### Manual Verification

Test backend directly:
```bash
curl http://localhost:8000/docs
```

Should open Swagger UI documentation.

## Expected Behavior

✅ Frontend loads on port 3000
✅ Backend API accessible on port 8000
✅ File upload works
✅ Teams page loads
✅ Auction page works

## If Problem Persists

Run these commands:
```bash
docker compose down
docker system prune -f
docker compose up --build
```

Then try uploading again.

