# Troubleshooting Guide

## Common Docker Build Issues

### Issue 1: npm ci Error (FIXED ✅)

**Error:**
```
npm error The `npm ci` command can only install with an existing package-lock.json
```

**Solution:**
Changed `npm ci` to `npm install` in frontend Dockerfile.

### Issue 2: Port Already in Use

**Error:**
```
Bind for 0.0.0.0:8000 failed: port is already allocated
```

**Solution:**
```bash
# Change port in docker-compose.yml
ports:
  - "8001:8000"  # Use different port
```

### Issue 3: Module Not Found

**Solution:**
```bash
# Rebuild without cache
docker compose down
docker compose build --no-cache
docker compose up
```

## Quick Fixes

### Rebuild Everything
```bash
docker compose down
docker compose build --no-cache
docker compose up
```

### Check Logs
```bash
docker compose logs -f
```

