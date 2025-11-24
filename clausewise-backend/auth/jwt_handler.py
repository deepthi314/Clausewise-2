import os
import time
import jwt

SECRET = os.getenv("JWT_SECRET", "dev-secret")

def create_token(user_id: str, email: str):
    payload = {"sub": user_id, "email": email, "exp": int(time.time()) + 60 * 60 * 24 * 7}
    return jwt.encode(payload, SECRET, algorithm="HS256")

def verify_token(token: str):
    return jwt.decode(token, SECRET, algorithms=["HS256"])