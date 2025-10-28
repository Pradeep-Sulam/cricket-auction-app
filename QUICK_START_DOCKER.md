# Quick Start with Docker 🐳

Get the Cricket Auction Application running in 1 command!

## Prerequisites

Install Docker Desktop:
- **Windows/Mac**: Download from [docker.com](https://www.docker.com/get-started)
- **Linux**: Install Docker and Docker Compose

## Start the Application

### Option 1: Use the Script

**Windows:**
```bash
start_docker.bat
```

**Mac/Linux:**
```bash
chmod +x start_docker.sh
./start_docker.sh
```

### Option 2: Manual Command

```bash
docker compose up --build
```

## Access the Application

Once containers are running:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## Stop the Application

Press `Ctrl+C` in the terminal, then run:
```bash
docker compose down
```

## Complete Example

```bash
# Start
docker compose up -d

# View logs
docker compose logs -f

# Stop
docker compose down
```

That's it! 🎉

For more details, see [DOCKER_SETUP.md](DOCKER_SETUP.md)

