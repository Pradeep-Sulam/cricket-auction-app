# Cricket Auction Application 🏏

A full-stack web application for managing cricket player auctions with real-time bidding, team management, and auction tracking.

## Features

- **Player Management**: Upload player data via Excel/CSV files with validation
- **Team Management**: Create and manage 4 teams with customizable names and budgets
- **Live Auction**: Real-time bidding interface with bid increments and undo functionality
- **Result Tracking**: View team rosters and export data to CSV
- **Responsive Design**: Works on both desktop and mobile devices
- **User-Friendly**: Simple and intuitive interface for all users

## Tech Stack

- **Backend**: FastAPI, SQLAlchemy, SQLite
- **Frontend**: React, React Router, Axios
- **Styling**: CSS3 with responsive design

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

### Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Set up the backend:**
   ```bash
   cd backend
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Mac/Linux
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

3. **Set up the frontend:**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the backend server** (from the `backend` directory):
   ```bash
   uvicorn app.main:app --reload
   ```
   Backend will be available at `http://localhost:8000`

2. **Start the frontend** (from the `frontend` directory, in a new terminal):
   ```bash
   npm start
   ```
   Frontend will open at `http://localhost:3000`

3. **Access the application** in your browser at `http://localhost:3000`

## Usage Guide

### For Administrators

1. **Upload Player Data** (`/admin`)
   - Click "Upload Players" and select an Excel or CSV file
   - Required columns: Name, Mobile Number, Player Role
   - Optional columns: Photo URL, Stats URL
   - Preview uploaded players before confirming

2. **Manage Teams** (`/teams`)
   - Edit team names and budgets before auction starts
   - Monitor team rosters and remaining budgets

3. **Reset Auction** (`/admin`)
   - Use with caution - clears all auction data
   - Useful for starting fresh or testing

### For Team Owners

1. **Start Auction** (`/auction`)
   - Click "Start Auction" to begin
   - Each team can place bids on the current player
   - Adjust bid increment (default: 100 points)
   - Click "SOLD" when satisfied with highest bid

2. **Track Your Team** (`/teams`)
   - View your team's players
   - Monitor remaining budget
   - Check roles covered

### Downloading Results

1. **View Rosters** (`/download`)
   - See all teams and their players
   - View points used and remaining budget
   - Export data as CSV

2. **Unsold Players** (`/download`)
   - View players not sold to any team
   - Export list for reference

## Project Structure

```
cricket-auction-app/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI entry point
│   │   ├── models.py         # Database models
│   │   ├── database.py       # Database configuration
│   │   ├── crud.py           # Database operations
│   │   ├── routes/           # API endpoints
│   │   └── utils/            # Utility functions
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── public/               # Static files
│   ├── src/
│   │   ├── api/              # API configuration
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── styles/           # CSS files
│   │   ├── App.js            # Main app component
│   │   └── index.js          # Entry point
│   └── package.json          # Node dependencies
├── data/                     # Sample data files
└── SETUP.md                  # Detailed setup guide
```

## API Documentation

Once the backend is running, visit `http://localhost:8000/docs` for interactive API documentation.

### Main Endpoints

- **Admin**: `/admin/upload`, `/admin/reset`, `/admin/players`
- **Teams**: `/teams`, `/teams/{id}`, `/teams/{id}` (PUT, DELETE)
- **Auction**: `/auction/next-player`, `/auction/sell-player`, `/auction/undo`
- **Download**: `/download/teams`, `/download/unsold`
- **Support**: `/support/faq`, `/support/instructions`

## Default Configuration

- **Number of Teams**: 4 (Team_A, Team_B, Team_C, Team_D)
- **Default Budget**: 6000 points per team
- **Default Bid Increment**: 100 points
- **Database**: SQLite (auto-created as `auction.db`)

## Sample Data

A sample Excel file is provided in the `data/` directory. You can use this to test the upload functionality.

## Troubleshooting

### Backend Issues
- Ensure port 8000 is not in use
- Check Python version: `python --version` (should be 3.8+)
- Reinstall dependencies: `pip install -r requirements.txt --force-reinstall`

### Frontend Issues
- Clear cache and reinstall: `rm -rf node_modules && npm install`
- Ensure backend is running on port 8000
- Check for port conflicts (frontend default: 3000)

### CORS Errors
- Verify backend CORS settings in `backend/app/main.py`
- Ensure both servers are running simultaneously
- Check browser console for specific errors

## Future Enhancements

- [ ] Authentication and role-based access
- [ ] Real-time synchronization across devices
- [ ] Player role limits per team
- [ ] Bidding timer with countdown
- [ ] Advanced analytics and statistics
- [ ] Photo upload functionality
- [ ] Integration with CricHero API
- [ ] Email notifications
- [ ] Multi-language support

## License

This project is for educational and personal use.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## Support

For detailed setup instructions, see [SETUP.md](SETUP.md).

For questions or issues, refer to the Support page within the application or contact the administrator.

---

**Made with ❤️ for Cricket Lovers**
