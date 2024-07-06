from typing import Union
from app.etc import database
from fastapi import FastAPI,APIRouter, status, UploadFile
import uvicorn 
from pydantic import BaseModel
from starlette.responses import FileResponse
from app.etc.constants import DB_FILE_PATH
import os.path
import time
from fastapi.staticfiles import StaticFiles

app = FastAPI()
router = APIRouter()

app.mount("/gui", StaticFiles(directory="gui"), name="gui")

class MetadataRequest(BaseModel):
    key: str
    value: str
    type: str

class AccountRequest(BaseModel):
    accType: str
    ccy: str
    name: str
    openingBalance: float

'''

@app.get("/api/account/getall")
def get_all_accounts():
    return db_get_all_accounts()

@app.post("/api/account", status_code=status.HTTP_201_CREATED)
def create_account(a: AccountRequest):
    return insert_account(a)



@app.get("/api/transaction/getall")
def get_all_trans():
    return get_all_transactions()

@app.delete("/api/transaction/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_transaction(id: str):
    return delete_transaction_by_id(id)
'''

### Crit Methods ###

@app.get("/api/bootstrap")
def bootstrap_app():
    if os.path.isfile(DB_FILE_PATH):
        return True
    else:
        return False

@app.get("/api/createdb")
def init_db():
    database.create_db()
    return {"message": "DB Init Successful"}

@app.get("/api/getdbfile")
def get_db_file():
    return FileResponse(DB_FILE_PATH, media_type='application/octet-stream',filename="expenseit.db")

@app.post("/api/setdbfile/")
async def create_upload_file(file: UploadFile):
    file_location = f"{DB_FILE_PATH}"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
    return {"info": f"file '{file.filename}' saved at '{file_location}'"}

    return {"Result": "OK"}

@app.get("/api/healthchecker")
def root():
    return {"message": "Welcome to ExpenseIt Server!"}


### Metadata Methods ###

@app.post("/api/metadata", status_code=status.HTTP_201_CREATED)
def create_metadata(metadata: MetadataRequest):
    return database.insert_metadata(metadata)

@app.get("/api/metadata/getall")
def get_all_metadata():
    return database.get_all_metadata()

@app.delete("/api/metadata/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_metadata(id: int):
    return database.delete_metadata(id)


### Account Methods ###

@app.post("/api/account", status_code=status.HTTP_201_CREATED)
def create_account(metadata: AccountRequest):
    return database.create_account(metadata)

@app.get("/api/account/getall")
def get_all_accounts():
    return database.db_get_all_accounts()

@app.delete("/api/account/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_account(id: int):
    return database.delete_account(id)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
