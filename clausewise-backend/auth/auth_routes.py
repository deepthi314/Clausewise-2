import bcrypt
from fastapi import APIRouter, Depends, Header, HTTPException
from .models import UserCreate, UserLogin
from .jwt_handler import create_token, verify_token
from storage.json_db import find_user_by_email, find_user_by_id, save_user

router = APIRouter()


def hash_password(plain: str) -> str:
    return bcrypt.hashpw(plain.encode(), bcrypt.gensalt()).decode()


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode(), hashed.encode())
    except Exception:
        return False


def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401)
    token = authorization.split(" ")[1]
    try:
        data = verify_token(token)
    except Exception:
        raise HTTPException(status_code=401)

    user = find_user_by_id(data["sub"])
    if not user:
        raise HTTPException(status_code=401)
    return {"id": user["_id"], "email": user["email"], "name": user.get("name", "")}


@router.post("/signup")
def signup(payload: UserCreate):
    if find_user_by_email(payload.email):
        raise HTTPException(status_code=400, detail="Email already registered")

    user = {
        "_id": payload.email,
        "name": payload.name,
        "email": payload.email,
        "password": hash_password(payload.password),
        "theme": "dark"
    }
    save_user(user)
    token = create_token(user["_id"], user["email"])
    return {"token": token, "user": {"id": user["_id"], "email": user["email"], "name": user["name"]}}


@router.post("/login")
def login(payload: UserLogin):
    user = find_user_by_email(payload.email)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(payload.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(user["_id"], user["email"])
    return {"token": token, "user": {"id": user["_id"], "email": user["email"], "name": user["name"]}}


@router.put("/preferences/theme")
def set_theme(body: dict, user=Depends(get_current_user)):
    return {"ok": True}
