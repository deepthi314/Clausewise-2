try:
    from pydantic import BaseModel, EmailStr, ValidationError
    print("Pydantic imported.")
except ImportError as e:
    print(f"ImportError: {e}")

try:
    import email_validator
    print("email-validator imported.")
except ImportError as e:
    print(f"email-validator MISSING: {e}")

try:
    class TestUser(BaseModel):
        email: EmailStr
    
    TestUser(email="test@example.com")
    print("EmailStr validation works.")
except Exception as e:
    print(f"EmailStr validation FAILED: {e}")

# Check db.json write permission
import json
try:
    with open("db.json", "a+") as f:
        pass
    print("db.json is writable.")
except Exception as e:
    print(f"db.json NOT writable: {e}")
