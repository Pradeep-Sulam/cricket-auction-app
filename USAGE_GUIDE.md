# Cricket Auction Application - Usage Guide

## 🎯 Getting Started

### First Time Setup

1. **Install Dependencies**
   - Backend: `pip install -r requirements.txt` (in backend folder)
   - Frontend: `npm install` (in frontend folder)

2. **Start the Application**
   - Backend: `uvicorn app.main:app --reload`
   - Frontend: `npm start`

3. **Access the Application**
   - Open http://localhost:3000 in your browser

## 📚 Step-by-Step Usage

### Step 1: Upload Player Data

1. Navigate to **Admin** page
2. Click **"Choose File"** under "Upload Player Data"
3. Select an Excel or CSV file with player information
4. Click **"Upload Players"**
5. Wait for confirmation message
6. Review the list of uploaded players

**File Format Requirements:**
```
Columns required: Name, Mobile Number, Player Role
Columns optional: Photo URL, Stats URL
```

**Sample Format:**
| Name | Mobile Number | Player Role | Photo URL | Stats URL |
|------|---------------|-------------|-----------|-----------|
| John Doe | 1234567890 | Batsman | https://... | https://... |

### Step 2: Review Teams

1. Navigate to **Teams** page
2. View the 4 default teams (Team_A, Team_B, Team_C, Team_D)
3. Each team starts with 6000 points budget
4. (Optional) Click **Edit** on any team to:
   - Change team name
   - Adjust budget
5. Click **Save** or **Cancel**

### Step 3: Start the Auction

1. Navigate to **Auction** page
2. Click **"Start Auction"** button
3. First player will appear automatically
4. Player photo displays for 5 seconds, then auction layout appears

### Step 4: Bidding Process

For each player:

1. **View Player Details** (left side):
   - Player photo
   - Name
   - Mobile number
   - Role
   - CricHero stats link (if available)

2. **Place Bids** (right side):
   - Each team has a bid button
   - Click to increment bid by the set amount (default: 100)
   - Current bid displays under each team name
   - Budget remaining shows current available points

3. **Adjust Bid Increment** (if needed):
   - Modify the "Bid Increment" value
   - Minimum: 10 points

4. **Finalize Sale**:
   - Review all bids
   - Click **"SOLD"** button when satisfied
   - Confirmation popup shows player sold to highest bidder
   - Next player loads automatically

5. **Undo Last Action** (if needed):
   - Click **"Undo"** button
   - Last sale is reverted
   - Player returns to unsold list
   - Team budget restored

### Step 5: Monitor Progress

During the auction:

1. **Check Team Status**:
   - Navigate to **Teams** page
   - View current team rosters
   - See points used and remaining budget
   - Check which roles are covered

2. **Track Unsold Players**:
   - Auction continues until all players are sold
   - Or stop manually when desired

### Step 6: Download Results

1. Navigate to **Downloads** page
2. Click **"View Team Rosters"**
   - See all teams and their players
   - View points used and remaining
   - Click **"Export as CSV"** to download
3. Click **"View Unsold Players"**
   - See players not sold to any team
   - Click **"Export as CSV"** to download

## 🎮 Tips & Best Practices

### For Administrators

1. **File Preparation**:
   - Ensure all required columns are present
   - Validate mobile numbers (10 digits)
   - Use clear role names (Batsman, Bowler, Wicket Keeper, All Rounder)
   - Preview data before uploading

2. **Team Configuration**:
   - Set team names before starting auction
   - Adjust budgets if needed
   - Verify all teams are ready

3. **During Auction**:
   - Monitor team budgets
   - Ensure fair bidding
   - Use Undo carefully

4. **After Auction**:
   - Export all results
   - Save data for records
   - Review team compositions

### For Team Owners

1. **Before Auction**:
   - Know your budget (6000 points)
   - Plan role distribution
   - Set bidding strategy

2. **During Bidding**:
   - Monitor your remaining budget
   - Keep track of players purchased
   - Balance between different roles
   - Don't rush - review stats

3. **After Each Purchase**:
   - Check updated roster
   - Verify budget remaining
   - Plan next purchases

### Common Scenarios

**Scenario 1: Incorrect Upload**
- Problem: Uploaded wrong file
- Solution: Click "Reset Auction" to clear all data and start over

**Scenario 2: Wrong Player Sold**
- Problem: Sold to wrong team or wrong price
- Solution: Click "Undo" immediately to revert

**Scenario 3: Team Runs Out of Budget**
- Problem: Team tries to bid but has insufficient budget
- Solution: They cannot bid. Other teams can continue.

**Scenario 4: Need to Edit Team**
- Problem: Want to change team name or budget during auction
- Solution: Go to Teams page and edit (affects current budget, not spent points)

## 🚨 Important Notes

1. **Budget Management**:
   - Teams cannot bid more than their budget
   - Budget is checked on each bid
   - Remaining budget updates in real-time

2. **Undo Functionality**:
   - Only undoes the LAST sale
   - Restores player to unsold list
   - Returns points to team
   - Cannot undo multiple actions

3. **Data Persistence**:
   - All data is saved in SQLite database
   - Survives server restarts
   - Only cleared by "Reset Auction"

4. **File Upload**:
   - Supports .xlsx (Excel) and .csv files
   - Maximum recommended: 100 players
   - Validates required fields

## 🔧 Keyboard Shortcuts (Future Feature)

- Not yet implemented

## 📊 Understanding the Interface

### Admin Page
- **Upload Section**: File selection and upload
- **Reset Section**: Clear all data
- **Uploaded Players**: List of registered players

### Teams Page
- **Team Cards**: Each team's information
- **Edit Mode**: Inline editing of name and budget
- **Statistics**: Players, points used, budget remaining

### Auction Page
- **Player Display**: Current player for auction
- **Bidding Area**: Team bid buttons and controls
- **Auction Controls**: Increment, SOLD, Undo buttons

### Downloads Page
- **Team Rosters**: Complete team breakdowns
- **Unsold Players**: List of available players
- **Export Buttons**: Download data as CSV

### Support Page
- **FAQ**: Common questions
- **Instructions**: How-to guides
- **Help**: Additional information

## 📞 Getting Help

1. Check the **Support** page in the application
2. Review this usage guide
3. Check SETUP.md for installation issues
4. Review QUICK_START.md for quick setup
5. Contact the administrator

## 🎉 Success Tips

- Take your time during bidding
- Review player stats before bidding
- Monitor your team's role distribution
- Keep some budget for important players
- Don't overbid early in the auction
- Export results regularly

---

**Happy Bidding! 🏏**

