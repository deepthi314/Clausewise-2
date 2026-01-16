import json
import os
from passlib.context import CryptContext

# Setup password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

DB_FILE = "db.json"

def get_hash(password):
    return pwd_context.hash(password)

def add_users():
    if not os.path.exists(DB_FILE):
        print(f"{DB_FILE} not found!")
        return

    with open(DB_FILE, "r") as f:
        data = json.load(f)

    users = data.get("users", [])
    
    users_to_add = [
        {"email": "saritha@gmail.com", "name": "Saritha", "password": "password123"},
        {"email": "deepo@gmail.com", "name": "Deepo", "password": "password123"}
    ]

    updated = False
    for new_user in users_to_add:
        exists = False
        for user in users:
            if user["email"] == new_user["email"]:
                exists = True
                break
        
        if not exists:
            print(f"Adding user: {new_user['email']}")
            users.append({
                "_id": new_user["email"],
                "name": new_user["name"],
                "email": new_user["email"],
                "password": get_hash(new_user["password"]),
                "theme": "dark"
            })
            updated = True
        else:
            print(f"User already exists: {new_user['email']}")

    if updated:
        data["users"] = users
        with open(DB_FILE, "w") as f:
            json.dump(data, f, indent=2)
        print("Database updated successfully.")
    else:
        print("No changes made to database.")

if __name__ == "__main__":
    add_users()
