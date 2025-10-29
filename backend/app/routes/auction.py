from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Player, Team, PlayerResponse
from app.crud import get_unsold_players
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.sql.expression import func

router = APIRouter()

# In-memory state for current auction
auction_state = {
    "current_player_id": None,
    "history": [],  # Track last sale for undo
}

class SellPlayerRequest(BaseModel):
    playerId: int
    team: str
    points: int

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/next-player", response_model=PlayerResponse)
def next_player(db: Session = Depends(get_db)):
    """Get a random unsold player for auction"""
    player = db.query(Player).filter(Player.team_id == None).order_by(func.random()).first()
    if not player:
        raise HTTPException(status_code=404, detail="No unsold players")
    
    auction_state["current_player_id"] = player.id
    return PlayerResponse.model_validate(player)

@router.post("/sell-player")
def sell_player(request: SellPlayerRequest, db: Session = Depends(get_db)):
    """Sell current player to a team"""
    if auction_state["current_player_id"] != request.playerId:
        raise HTTPException(status_code=400, detail="Invalid player")
    
    # Get team by name
    team = db.query(Team).filter(Team.name == request.team).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    # Check if team has enough budget
    if team.budget < request.points:
        raise HTTPException(status_code=400, detail="Team doesn't have enough budget")
    
    # Assign player to team
    player = db.query(Player).filter(Player.id == request.playerId).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    
    if player.team_id is not None:
        raise HTTPException(status_code=400, detail="Player already sold")
    
    # Update player and team
    player.team_id = team.id
    player.points_spent = request.points
    team.budget -= request.points
    
    # Track for undo
    auction_state["history"].append({
        "player_id": player.id,
        "points": request.points,
        "team_id": team.id
    })
    
    db.commit()
    
    # Clear current player
    auction_state["current_player_id"] = None
    
    return {"status": "sold", "player": player.name, "team": request.team, "points": request.points}

@router.post("/undo")
def undo(db: Session = Depends(get_db)):
    """Undo last sale"""
    if not auction_state["history"]:
        raise HTTPException(status_code=400, detail="No actions to undo")
    
    last_sale = auction_state["history"].pop()
    
    # Get player
    player = db.query(Player).filter(Player.id == last_sale["player_id"]).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    
    # Get team
    team = db.query(Team).filter(Team.id == last_sale["team_id"]).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    # Restore budget
    team.budget += last_sale["points"]
    player.team_id = None
    player.points_spent = 0
    
    db.commit()
    
    # Restore as current player
    auction_state["current_player_id"] = player.id
    
    return {"status": "undo successful", "player": player.name}

@router.post("/unsold/{player_id}")
def mark_unsold(player_id: int, db: Session = Depends(get_db)):
    """Mark current player as unsold"""
    # Ensure current auction player matches
    if auction_state["current_player_id"] != player_id:
        raise HTTPException(status_code=400, detail="Invalid player or no player active")

    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    # Just clear current player and keep them unsold (team_id stays None)
    auction_state["current_player_id"] = None

    return {"status": "unsold", "player": player.name}
