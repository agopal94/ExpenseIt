from typing import Union
from database import create_db,insert_category,get_all_categories,delete_category,insert_transaction,get_all_transactions,delete_transaction_by_id
from fastapi import FastAPI,APIRouter, status
import uvicorn 
from pydantic import BaseModel

app = FastAPI()
router = APIRouter()

class CategoryRequest(BaseModel):
    cat: str

class TransactionRequest(BaseModel):
    guid: str
    type: str
    category: str
    value: float

@app.post("/api/category", status_code=status.HTTP_201_CREATED)
def create_category(cat: CategoryRequest):
    return insert_category(cat.cat)

@app.get("/api/category/getall")
def get_all_cats():
    return get_all_categories()

@app.delete("/api/category/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_cat(id: int):
    return delete_category(id)

@app.post("/api/transaction", status_code=status.HTTP_201_CREATED)
def create_transaction(t: TransactionRequest):
    return insert_transaction(t)

@app.get("/api/transaction/getall")
def get_all_trans():
    return get_all_transactions()

@app.delete("/api/transaction/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_transaction(id: str):
    return delete_transaction_by_id(id)

@app.get("/api/createdb")
def init_db():
    create_db()
    return {"message": "DB Init Successful"}

@app.get("/api/healthchecker")
def root():
    return {"message": "Welcome to ExpenseIt Server!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)