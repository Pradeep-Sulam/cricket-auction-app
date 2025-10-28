# Cricket Auction Application - Setup Guide

## Overview
This is a full-stack cricket auction application built with FastAPI (backend) and React (frontend). It allows you to manage player auctions, team bidding, and track auction results.

## Project Structure
```
cricket-auction-app/
├── backend/          # FastAPI backend
├── frontend/         # React frontend
├── data/            # Sample player data
└── ReadMe.MD        # Requirements document
```

## Prerequisites
- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend server:
```bash
uvicorn app.main:app --reload
```

The backend will run on `http://localhost:8000`

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

### Starting the Application

1. Start the backend first (in one terminal):
```bash
cd backend
uvicorn app.main:app --reload
```

2. Start the frontend (in another terminal):
```bash
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

### Using the Application

1. **Admin Page** (`/admin`):
   - Upload player data (Excel or CSV file)
   - Reset auction data if needed
   - Required columns: Name, Mobile Number, Player Role
   - Optional columns: Photo URL, Stats URL

2. **Teams Page** (`/teams`):
   - View all teams and their details
   - Edit team names and budgets
   - View team rosters

3. **Auction Page** (`/auction`):
   - Click "Start Auction" to begin
   - Each team can place bids
   - Adjust bid increment as needed
   - Click "SOLD" when satisfied with bid
   - Use "UNDO" to revert last action

4. **Downloads Page** (`/download`):
   - View team rosters
   - View unsold players
   - Export data as CSV

5. **Support Page** (`/support`):
   - View FAQs
   - Read instructions for admins and team owners

## API Endpoints

### Admin
- `POST /admin/upload` - Upload player data
- `POST /admin/reset` - Reset auction
- `GET /admin/players` - Get all players

### Teams
- `GET /teams` - Get all teams
- `GET /teams/{id}` - Get specific team
- `PUT /teams/{id}` - Update team
- `POST /teams` - Create team
- `DELETE /teams/{id}` - Delete team

### Auction
- `GET /auction/next-player` - Get next unsold player
- `POST /auction/sell-player` - Sell player to team
- `POST /auction/undo` - Undo last action

### Download
- `GET /download/teams` - Get team rosters
- `GET /download/unsold` - Get unsold players

### Support
- `GET /support/faq` - Get FAQs
- `GET /support/instructions` - Get instructions
- `GET /support/help` - Get help information

## Default Teams

When you start the application, 4 default teams are created:
- Team_A (Budget: 6000 points)
- Team_B (Budget: 6000 points)
- Team_C (Budget: 6000 points)
- Team_D (Budget: 6000 points)

## Database

The application uses SQLite database (`auction.db`) which is automatically created in the backend directory. The database is reset when you use the "Reset Auction" function in the admin panel.

## Troubleshooting

### Backend Issues
- Ensure Python 3.8+ is installed
- Make sure all dependencies are installed: `pip install -r requirements.txt`
- Check if port 8000 is already in use

### Frontend Issues
- Ensure Node.js 14+ is installed
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check if port 3000 is already in use
- Ensure backend is running on port 8000

### CORS Issues
If you encounter CORS errors, make sure:
- Backend is running on `http://localhost:8000`
- Frontend is running on `http://localhost:3000`
- The CORS middleware is properly configured in `backend/app/main.py`

## Sample Data

A sample Excel file is provided in the `data/` directory:
- `players.xlsx` - Sample player registration file

## Future Enhancements

- Real-time sync across multiple devices
- Player role limits per team
- Advanced analytics and statistics
- Timer for bidding rounds
- Photo upload functionality
- CricHero API integration

## License

This project is for educational purposes.

## Support

For issues or questions, refer to the Support page in the application or contact the administrator.

