from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import SessionLocal
from app.models import Team, TeamCreate, TeamResponse, PlayerResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("", response_model=List[TeamResponse])
def get_teams(db: Session = Depends(get_db)):
    teams = db.query(Team).all()
    return [TeamResponse.model_validate(t) for t in teams]

@router.get("/{team_id}", response_model=TeamResponse)
def get_team(team_id: int, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return TeamResponse.model_validate(team)

@router.put("/{team_id}", response_model=TeamResponse)
def update_team(team_id: int, team_data: TeamCreate, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    team.name = team_data.name
    team.budget = team_data.budget
    db.commit()
    db.refresh(team)
    
    return TeamResponse.model_validate(team)

@router.post("", response_model=TeamResponse)
def create_team(team_data: TeamCreate, db: Session = Depends(get_db)):
    # Check if team name already exists
    existing = db.query(Team).filter(Team.name == team_data.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Team name already exists")
    
    team = Team(name=team_data.name, budget=team_data.budget)
    db.add(team)
    db.commit()
    db.refresh(team)
    
    return TeamResponse.model_validate(team)

@router.delete("/{team_id}")
def delete_team(team_id: int, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    db.delete(team)
    db.commit()
    return {"status": "deleted"}
