# Deployment Guide

## Prerequisites
- Python 3.8+
- Node.js 14+
- Web server (nginx, Apache, or similar for production)

## Production Build

### Backend Deployment

1. **Create Production Requirements**
   ```bash
   cd backend
   pip freeze > requirements-prod.txt
   ```

2. **Environment Variables**
   Create `.env` file:
   ```
   DATABASE_URL=sqlite:///./auction.db
   CORS_ORIGINS=https://yourdomain.com
   DEBUG=False
   ```

3. **Run with Gunicorn** (Recommended for production)
   ```bash
   pip install gunicorn
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
   ```

### Frontend Deployment

1. **Build for Production**
   ```bash
   cd frontend
   npm run build
   ```

2. **Serve Static Files**
   - Copy `build/` folder to your web server
   - Configure nginx/Apache to serve React files
   - Update API URL in production

3. **Update API Configuration**
   Edit `frontend/src/api/api.js`:
   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
   ```

## Docker Deployment (Optional)

### Create Dockerfile

**Backend Dockerfile:**
```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
      
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://localhost:8000
```

## Cloud Deployment Options

### Heroku

**Backend:**
1. Install Heroku CLI
2. Create `Procfile`: `web: uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. `heroku create your-app-name`
4. `git push heroku main`

**Frontend:**
1. Build: `npm run build`
2. Serve build folder
3. Update CORS settings in backend

### Railway/Render

1. Connect GitHub repository
2. Set build commands
3. Configure environment variables
4. Deploy

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **CORS**: Restrict allowed origins in production
3. **HTTPS**: Use SSL certificates
4. **Database**: Use environment-specific database files
5. **Rate Limiting**: Implement rate limiting for API
6. **Input Validation**: All inputs validated on backend

## Performance Optimization

1. **Backend**:
   - Use gunicorn with multiple workers
   - Enable compression
   - Cache static data
   - Optimize database queries

2. **Frontend**:
   - Code splitting
   - Image optimization
   - CDN for static assets
   - Service workers for offline access

## Monitoring

1. **Logging**: Set up application logging
2. **Error Tracking**: Integrate error tracking service
3. **Analytics**: Track usage patterns
4. **Backup**: Regular database backups

## Backup Strategy

1. Regular database backups
2. Version control for code
3. Environment configuration backup
4. Test restore procedures

## Maintenance

1. Update dependencies regularly
2. Monitor security advisories
3. Review logs for errors
4. Optimize database as it grows
5. Scale resources as needed

---

**Note**: For simple local deployments, the current setup is sufficient. For production, consider the above security and optimization steps.

