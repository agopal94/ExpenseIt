from sqlalchemy import create_engine, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import Column, Integer, String, Float

SQLITE_DATABASE_URL = "sqlite:///./transactions.db"

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


def get_all_categories():
    # create a new database session
    session = Session(bind=engine, expire_on_commit=False)
    # get the todo item with the given id
    all_cat = session.query(Category).all()
    # close the session
    session.close()
    return all_cat


def insert_category(cat: str):
    # create a new database session
    session = Session(bind=engine, expire_on_commit=False)
    # create an instance of the ToDo database model
    catdb = Category(cat = cat)
    # add it to the session and commit it
    session.add(catdb)
    session.commit()
    # grab the id given to the object from the database
    id = catdb.id
    # close the session
    session.close()
    # return the id
    return f"created category item with id {id}"

def delete_category(id: int):
    # create a new database session
    session = Session(bind=engine, expire_on_commit=False)
    # get the category item with the given id
    category = session.query(Category).get(id)
    # if todo item with given id exists, delete it from the database. Otherwise raise 404 error
    if category:
        session.delete(category)
        session.commit()
        session.close()
    else:
        raise HTTPException(status_code=404, detail=f"category item with id {id} not found")
    return None

def delete_transaction_by_id(id: int):
    session = Session(bind=engine, expire_on_commit=False)
    transaction = session.query(Transaction).get(id)
    if transaction:
        session.delete(transaction)
        session.commit()
        session.close()
    else:
        raise HTTPException(status_code=404, detail=f"transaction item with id {id} not found")
    return None


def get_all_transactions():
    # create a new database session
    session = Session(bind=engine, expire_on_commit=False)
    # get the todo item with the given id
    all_transactions = session.query(Transaction).all()
    # close the session
    session.close()
    return all_transactions


def insert_transaction(catReq):
    # create a new database session
    session = Session(bind=engine, expire_on_commit=False)
    # create an instance of the ToDo database model
    transactiondb = Transaction(guid = catReq.guid, type = catReq.type, category = catReq.category, value = catReq.value)
    # add it to the session and commit it
    session.add(transactiondb)
    session.commit()
    # grab the id given to the object from the database
    id = transactiondb.guid
    # close the session
    session.close()
    # return the id
    return f"created transaction item with id {id}"


class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True)
    cat = Column(String(100), unique=True)

class Transaction(Base):
    __tablename__ = "transactions"
    guid = Column(String(100), primary_key=True)
    type = Column(String(100))
    category = Column(String(100), ForeignKey(Category.cat))
    value = Column(Float)

