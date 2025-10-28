#!/bin/bash

echo "================================================"
echo " Cricket Auction Application - Docker Startup"
echo "================================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker is not installed"
    echo "Please install Docker from https://www.docker.com/get-started"
    exit 1
fi

# Check if docker-compose is available
if ! docker compose version &> /dev/null; then
    echo "ERROR: Docker Compose is not available"
    echo "Please install Docker which includes Docker Compose"
    exit 1
fi

echo "✅ Docker and Docker Compose found!"
echo ""
echo "Building and starting containers..."
echo ""

# Build and start containers
docker compose up --build

