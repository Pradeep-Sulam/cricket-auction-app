# Docker Setup Guide 🐳

This guide will help you run the Cricket Auction Application using Docker and Docker Compose.

## Prerequisites

- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 1.29 or higher
- **Git**: To clone the repository (if needed)

### Check Docker Installation

```bash
docker --version
docker-compose --version
```

If not installed, download from [docker.com](https://www.docker.com/get-started)

## Quick Start

### 1. Navigate to Project Directory

```bash
cd cricket-auction-app
```

### 2. Build and Start Containers

```bash
docker-compose up --build
```

This will:
- Build the backend Docker image
- Build the frontend Docker image
- Start both containers
- Set up networking between them

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Common Commands

### Start Services
```bash
docker-compose up
```

### Start in Background (Detached Mode)
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### Rebuild Containers
```bash
docker-compose up --build
```

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend

# Follow logs
docker-compose logs -f
```

### Stop and Remove All Data
```bash
docker-compose down -v
```

### Restart a Specific Service
```bash
docker-compose restart backend
docker-compose restart frontend
```

## Development with Docker

### Rebuild After Code Changes

If you make changes to the code, rebuild the containers:

```bash
docker-compose up --build
```

### Access Backend Shell
```bash
docker-compose exec backend bash
```

### Access Frontend Shell
```bash
docker-compose exec frontend sh
```

### Install New Python Packages

1. Edit `backend/requirements.txt`
2. Rebuild: `docker-compose up --build backend`

### Install New Node Packages

1. Edit `frontend/package.json`
2. Rebuild: `docker-compose up --build frontend`

## Docker Architecture

```
┌─────────────────────────────────────────┐
│         Docker Network                  │
│                                         │
│  ┌──────────────┐    ┌──────────────┐  │
│  │   Backend    │    │   Frontend   │  │
│  │  (FastAPI)   │◄───┤  (React)     │  │
│  │  Port: 8000  │    │  Port: 80    │  │
│  └──────────────┘    └──────────────┘  │
│         │                  │            │
└─────────┼──────────────────┼────────────┘
          │                  │
          ▼                  ▼
    localhost:8000    localhost:3000
```

## Volumes and Data Persistence

The application uses Docker volumes to persist data:

- **Database**: `./backend/auction.db` (mounted as volume)
- **Logs**: `./backend/logs` (mounted as volume)

Data persists even after stopping containers.

## Environment Variables

You can customize the application using environment variables in `docker-compose.yml`:

```yaml
environment:
  - PYTHONUNBUFFERED=1
  - DATABASE_URL=sqlite:///./auction.db
```

## Troubleshooting

### Port Already in Use

**Error**: `Bind for 0.0.0.0:8000 failed: port is already allocated`

**Solution**:
```bash
# Check what's using the port
netstat -ano | findstr :8000  # Windows
lsof -i :8000                 # Mac/Linux

# Stop the ping service or change port in docker-compose.yml
```

### Container Won't Start

**Error**: Container exits immediately

**Solution**:
```bash
# Check logs
docker-compose logs

# Rebuild without cache
docker-compose build --no-cache
docker-compose up
```

### Can't Connect to Backend

**Error**: Frontend can't connect to backend API

**Solution**:
1. Check both containers are running: `docker-compose ps`
2. Verify network: `docker network ls`
3. Check backend logs: `docker-compose logs backend`
4. Verify API health: `curl http://localhost:8000/`

### Database Not Persisting

**Solution**:
1. Ensure volume is mounted in `docker-compose.yml`
2. Check file permissions
3. Verify volume exists: `docker volume ls`

### Build Cache Issues

**Solution**:
```bash
# Rebuild without cache
docker-compose build --no-cache

# Remove old images
docker system prune -a
```

## Production Deployment

For production deployment with Docker:

### 1. Update docker-compose.yml

```yaml
services:
  backend:
    environment:
      - DEBUG=False
      - CORS_ORIGINS=https://yourdomain.com
      
  frontend:
    ports:
      - "443:80"  # HTTPS port
```

### 2. Add SSL/TLS

Use a reverse proxy like Traefik or Nginx for HTTPS.

### 3. Use Docker Secrets

For production credentials, use Docker secrets.

## Cleaning Up

### Remove All Containers and Images
```bash
docker-compose down -v --rmi all
```

### Remove Everything (Nuclear Option)
```bash
docker system prune -a --volumes
```

## Performance Tips

1. **Use Build Cache**: Leverage Docker layer caching
2. **Multi-stage Builds**: Already implemented for smaller images
3. **Resource Limits**: Add limits in docker-compose.yml if needed
4. **Volume Optimization**: Use named volumes for better performance

## Health Checks

Both services include health checks:

```bash
# Check health status
docker-compose ps

# Inspect health check
docker inspect cricket-auction-backend | grep -A 5 Health
```

## Backup and Restore

### Backup Database
```bash
docker cp cricket-auction-backend:/app/auction.db ./backup.db
```

### Restore Database
```bash
docker cp ./backup.db cricket-auction-backend:/app/auction.db
docker-compose restart backend
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [FastAPI Docker Guide](https://fastapi.tiangolo.com/deployment/docker/)
- [React Docker Guide](https://mherman.org/blog/dockerizing-a-react-app/)

## Next Steps

1. ✅ Start the application: `docker-compose up`
2. ✅ Access http://localhost:3000
3. ✅ Upload sample data
4. ✅ Start auctioning!

---

**Happy Dockerizing! 🐳🏏**

