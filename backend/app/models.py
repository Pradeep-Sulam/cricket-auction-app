from pydantic import BaseModel
from typing import Optional, List

# Pydantic models for API requests/responses
class PlayerCreate(BaseModel):
    name: str
    mobile: str
    role: str
    photo_url: Optional[str] = None
    stats_url: Optional[str] = None

class PlayerResponse(BaseModel):
    id: int
    name: str
    mobile: str
    role: str
    photo_url: Optional[str]
    stats_url: Optional[str]
    team_id: Optional[int]
    points_spent: int

    class Config:
        from_attributes = True

class TeamCreate(BaseModel):
    name: str
    budget: int

class TeamResponse(BaseModel):
    id: int
    name: str
    budget: int
    players: List[PlayerResponse] = []

    class Config:
        from_attributes = True

class AuctionState(BaseModel):
    current_player: Optional[PlayerResponse]
    bid_increment: int
    bids: dict[str, int]

# SQLAlchemy models for database
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    mobile = Column(String)
    role = Column(String)
    photo_url = Column(String, nullable=True)
    stats_url = Column(String, nullable=True)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=True)
    points_spent = Column(Integer, default=0)
    team = relationship("Team", back_populates="players")

class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    budget = Column(Integer)
    players = relationship("Player", back_populates="team")