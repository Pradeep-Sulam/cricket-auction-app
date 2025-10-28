from sqlalchemy.orm import Session
from app.models import Player, Team

def get_unsold_players(db: Session):
    """Get all players not assigned to any team"""
    return db.query(Player).filter(Player.team_id == None).all()

def get_sold_players(db: Session):
    """Get all players assigned to teams"""
    return db.query(Player).filter(Player.team_id != None).all()

def get_players_by_team(db: Session, team_id: int):
    """Get all players in a specific team"""
    return db.query(Player).filter(Player.team_id == team_id).all()

def create_player(db: Session, name: str, mobile: str, role: str, photo_url: str = None, stats_url: str = None):
    """Create a new player"""
    player = Player(
        name=name,
        mobile=mobile,
        role=role,
        photo_url=photo_url,
        stats_url=stats_url
    )
    db.add(player)
    db.commit()
    db.refresh(player)
    return player

def update_player(db: Session, player_id: int, **kwargs):
    """Update player information"""
    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        return None
    
    for key, value in kwargs.items():
        setattr(player, key, value)
    
    db.commit()
    db.refresh(player)
    return player

def delete_player(db: Session, player_id: int):
    """Delete a player"""
    player = db.query(Player).filter(Player.id == player_id).first()
    if player:
        db.delete(player)
        db.commit()
        return True
    return False

def get_team_by_id(db: Session, team_id: int):
    """Get team by ID"""
    return db.query(Team).filter(Team.id == team_id).first()

def get_team_by_name(db: Session, team_name: str):
    """Get team by name"""
    return db.query(Team).filter(Team.name == team_name).first()

def get_team_stats(db: Session, team_id: int):
    """Get team statistics"""
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        return None
    
    players = get_players_by_team(db, team_id)
    used_points = sum(p.points_spent for p in players)
    roles = [p.role for p in players]
    
    return {
        "team": team,
        "total_players": len(players),
        "used_points": used_points,
        "remaining_points": team.budget,
        "roles_covered": list(set(roles))
    }