from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Ensure database directory exists
db_dir = "/app"
os.makedirs(db_dir, exist_ok=True)

# Use absolute path for database
#DATABASE_URL = "sqlite:////app/auction.db"
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@postgres:5432/auction_db")

engine = create_engine("postgresql+psycopg2://auction_user:auction_pass@postgres:5432/auction_db")
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()