from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Team, Player

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/teams")
def download_team_rosters(db: Session = Depends(get_db)):
    teams = db.query(Team).all()
    result = []
    for team in teams:
        players = db.query(Player).filter(Player.team_id == team.id).all()
        used_points = sum(p.points_spent for p in players)
        result.append({
            "name": team.name,
            "used_points": used_points,
            "remaining_points": team.budget,
            "players": [
                {"name": p.name, "role": p.role, "points_spent": p.points_spent}
                for p in players
            ]
        })
    return result

@router.get("/unsold")
def download_unsold_players(db: Session = Depends(get_db)):
    players = db.query(Player).filter(Player.team_id == None).all()
    return [
        {"name": p.name, "role": p.role}
        for p in players
    ]