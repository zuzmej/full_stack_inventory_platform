from sqlalchemy import Column, Integer, String, DateTime
from database import Base, engine
from datetime import datetime, timezone

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    category = Column(String)
    quantity = Column(Integer)
    status = Column(String)
    date_added = Column(DateTime, default=lambda: datetime.now(timezone.utc))  
    last_updated = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)) 


User.metadata.create_all(bind=engine)
Resource.metadata.create_all(bind=engine)
