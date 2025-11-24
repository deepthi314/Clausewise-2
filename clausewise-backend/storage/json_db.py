import json
import os
from datetime import datetime

DB_FILE = "db.json"

def load_db():
    if not os.path.exists(DB_FILE):
        return {"users": [], "documents": []}
    try:
        with open(DB_FILE, "r") as f:
            return json.load(f)
    except:
        return {"users": [], "documents": []}

def save_db(data):
    with open(DB_FILE, "w") as f:
        json.dump(data, f, indent=2)

def get_users():
    return load_db()["users"]

def save_user(user):
    data = load_db()
    data["users"].append(user)
    save_db(data)

def find_user_by_email(email):
    users = get_users()
    for u in users:
        if u["email"] == email:
            return u
    return None

def find_user_by_id(uid):
    users = get_users()
    for u in users:
        if u["_id"] == uid:
            return u
    return None

def get_documents(user_id):
    data = load_db()
    return [d for d in data["documents"] if d["userId"] == user_id]

def save_document(doc):
    data = load_db()
    data["documents"].append(doc)
    save_db(data)

def get_document_by_id(doc_id):
    data = load_db()
    for d in data["documents"]:
        if d["id"] == doc_id:
            return d
    return None
