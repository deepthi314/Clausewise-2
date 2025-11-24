from fastapi import APIRouter, Depends, Header, HTTPException
from passlib.context import CryptContext
from .models import UserCreate, UserLogin
from .jwt_handler import create_token, verify_token
from storage.json_db import find_user_by_email, find_user_by_id, save_user

router = APIRouter()
pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401)
    token = authorization.split(" ")[1]
    try:
        data = verify_token(token)
    except:
        raise HTTPException(status_code=401)
        
    user = find_user_by_id(data["sub"])
    if not user:
        raise HTTPException(status_code=401)
    return {"id": user["_id"], "email": user["email"], "theme": user.get("theme", "dark")}

@router.post("/signup")
def signup(payload: UserCreate):
    if find_user_by_email(payload.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user = {
        "_id": payload.email, 
        "name": payload.name, 
        "email": payload.email, 
        "password": pwd.hash(payload.password), 
        "theme": "dark"
    }
    save_user(user)
    token = create_token(user["_id"], user["email"]) 
    return {"token": token, "user": {"id": user["_id"], "email": user["email"], "name": user["name"]}}

@router.post("/login")
def login(payload: UserLogin):
    user = find_user_by_email(payload.email)
    if not user or not pwd.verify(payload.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(user["_id"], user["email"]) 
    return {"token": token, "user": {"id": user["_id"], "email": user["email"], "name": user["name"]}}

@router.put("/preferences/theme")
def set_theme(body: dict, user=Depends(get_current_user)):
    # Theme update not implemented in simple JSON DB for now, just pass
    return {"ok": True}