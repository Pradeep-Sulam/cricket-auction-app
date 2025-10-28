from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import admin, teams, auction, download, support
from app.database import Base, engine, SessionLocal
from app.models import Team

app = FastAPI(title="Cricket Auction API", version="1.0.0")

# CORS configuration for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for Docker deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(admin.router, prefix="/admin", tags=["admin"])
app.include_router(teams.router, prefix="/teams", tags=["teams"])
app.include_router(auction.router, prefix="/auction", tags=["auction"])
app.include_router(download.router, prefix="/download", tags=["download"])
app.include_router(support.router, prefix="/support", tags=["support"])

# Create tables
Base.metadata.create_all(bind=engine)

# Initialize default teams
@app.on_event("startup")
def init_teams():
    db = SessionLocal()
    try:
        # Check if teams already exist
        existing_teams = db.query(Team).count()
        if existing_teams == 0:
            # Create default teams
            default_teams = [
                Team(name="Team_A", budget=6000),
                Team(name="Team_B", budget=6000),
                Team(name="Team_C", budget=6000),
                Team(name="Team_D", budget=6000),
            ]
            db.add_all(default_teams)
            db.commit()
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Cricket Auction API", "version": "1.0.0"}