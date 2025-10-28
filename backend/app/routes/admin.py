from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import SessionLocal, engine, Base
from app.models import Player, PlayerCreate, PlayerResponse
from app.utils.file_parser import parse_excel
import io

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/upload", response_model=List[PlayerResponse])
async def upload_players(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(('.xlsx', '.csv')):
        raise HTTPException(status_code=400, detail="Only Excel (.xlsx) and CSV files are allowed")
    
    contents = await file.read()
    players_data = await parse_excel(contents, file.filename)
    
    created_players = []
    for player_data in players_data:
        # Validate required fields
        if not all([player_data.get('name'), player_data.get('mobile'), player_data.get('role')]):
            continue
        
        player = Player(
            name=player_data.get('name'),
            mobile=player_data.get('mobile'),
            role=player_data.get('role'),
            photo_url=player_data.get('photo_url'),
            stats_url=player_data.get('stats_url')
        )
        db.add(player)
        created_players.append(player)
    
    db.commit()
    
    return [PlayerResponse.model_validate(p) for p in created_players]

@router.post("/reset")
def reset_auction(db: Session = Depends(get_db)):
    try:
        # Drop all tables
        Base.metadata.drop_all(bind=engine)
        # Recreate tables
        Base.metadata.create_all(bind=engine)
        return {"status": "reset complete"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/players", response_model=List[PlayerResponse])
def get_all_players(db: Session = Depends(get_db)):
    players = db.query(Player).all()
    return [PlayerResponse.model_validate(p) for p in players]