from typing import Union
from database import create_db,insert_category,get_all_categories,delete_category,insert_transaction,get_all_transactions,delete_transaction_by_id, db_get_all_accounts,insert_account
from fastapi import FastAPI,APIRouter, status, UploadFile
import uvicorn 
from pydantic import BaseModel
from starlette.responses import FileResponse
from constants import DB_FILE_PATH
import os.path
import time

app = FastAPI()
router = APIRouter()

class CategoryRequest(BaseModel):
    cat: str

class TransactionRequest(BaseModel):
    guid: str
    type: str
    ts: str
    category: str
    value: float
    acc_id: int

class AccountRequest(BaseModel):
    accType: str
    openingBalance: float

@app.get("/api/bootstrap")
def bootstrap_app():
    if os.path.isfile(DB_FILE_PATH):
        return True
    else:
        return False

@app.get("/api/account/getall")
def get_all_accounts():
    return db_get_all_accounts()

@app.post("/api/account", status_code=status.HTTP_201_CREATED)
def create_account(a: AccountRequest):
    return insert_account(a)

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

@app.get("/api/getdbfile")
def get_db_file():
    return FileResponse("./transactions.db", media_type='application/octet-stream',filename="transactions.db")

@app.post("/api/setdbfile/")
async def create_upload_file(file: UploadFile):
    file_location = f"./{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
    return {"info": f"file '{file.filename}' saved at '{file_location}'"}

    return {"Result": "OK"}

@app.get("/api/healthchecker")
def root():
    return {"message": "Welcome to ExpenseIt Server!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
