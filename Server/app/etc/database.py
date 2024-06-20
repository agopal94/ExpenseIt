from sqlalchemy import create_engine, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import Column, Integer, String, Float
from app.etc.constants import DB_FILE_PATH

SQLITE_DATABASE_URL = "sqlite:///" + DB_FILE_PATH

engine = create_engine(
    SQLITE_DATABASE_URL, echo=True, connect_args={"check_same_thread": False}
)
Base = declarative_base()

def create_db():
    global engine
    Base.metadata.create_all(engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

## Accounts Table and Actions

class Accounts(Base):
    __tablename__ = "accounts"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    ccy = Column(String(100))
    acc_type = Column(String(100))
    opening_balance = Column(Float)

def db_get_all_accounts():
    session = Session(bind=engine, expire_on_commit=False)
    all_acc = session.query(Accounts).all()
    session.close()
    return all_acc

def insert_account(new_acc):
    session = Session(bind=engine, expire_on_commit=False)
    accdb = Accounts(type = new_acc.accType, ccy= new_acc.ccy, name=new_acc.name, opening_balance = new_acc.openingBalance)
    session.add(accdb)
    session.commit()
    id = accdb.id
    session.close()
    return f"created Account with id {id}"

## Metadata Table and Actions

class Metadata(Base):
    __tablename__ = "metadata"
    id = Column(Integer, primary_key=True)
    key = Column(String(100))
    value = Column(String(100))

def get_all_metadata():
    session = Session(bind=engine, expire_on_commit=False)
    all_meta = session.query(Metadata).all()
    session.close()
    return all_meta

def insert_metadata(metadata):
    session = Session(bind=engine, expire_on_commit=False)
    meta_new_row = Metadata(key = metadata.key, value=metadata.value)
    session.add(meta_new_row)
    session.commit()
    session.close()
    return f"created new metadata entry"

def delete_metadata(id: int):
    session = Session(bind=engine, expire_on_commit=False)
    metadata = session.query(Metadata).get(id)
    if metadata:
        session.delete(metadata)
        session.commit()
        session.close()
    else:
        raise HTTPException(status_code=404, detail=f"metadata item with id {id} not found")
    return None
