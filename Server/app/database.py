from sqlalchemy import create_engine, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import Column, Integer, String, Float
from constants import DB_FILE_PATH

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


class Accounts(Base):
    __tablename__ = "accounts"
    id = Column(Integer, primary_key=True)
    type = Column(String(100))
    opening_balance = Column(Float)

def db_get_all_accounts():
    # create a new database session
    session = Session(bind=engine, expire_on_commit=False)
    # get the todo item with the given id
    all_acc = session.query(Accounts).all()
    # close the session
    session.close()
    return all_acc

def insert_account(new_acc):
    session = Session(bind=engine, expire_on_commit=False)
    accdb = Accounts(type = new_acc.accType, opening_balance = new_acc.openingBalance)
    session.add(accdb)
    session.commit()
    id = accdb.id
    session.close()
    return f"created Account with id {id}"


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


def insert_transaction(transReq):
    session = Session(bind=engine, expire_on_commit=False)
    transactiondb = Transaction(guid = transReq.guid, type = transReq.type, category = transReq.category, value = transReq.value, ts= transReq.ts, acc_id=transReq.acc_id)
    session.add(transactiondb)
    session.commit()
    id = transactiondb.guid
    session.close()
    return f"created transaction item with id {id}"

class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True)
    cat = Column(String(100), unique=True)

class Transaction(Base):
    __tablename__ = "transactions"
    guid = Column(String(100), primary_key=True)
    type = Column(String(100))
    ts = Column(String(100))
    category = Column(String(100), ForeignKey(Category.cat))
    acc_id = Column(Integer, ForeignKey(Accounts.id))
    value = Column(Float)

