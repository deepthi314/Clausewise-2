import os
from pymongo import MongoClient

def client():
    uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    return MongoClient(uri)

def db():
    return client()[os.getenv("MONGODB_DB", "clausewise")]

def latest_updates():
    cur = db()["law_updates"].find({}).sort("date", -1).limit(10)
    return [{"title": d.get("title"), "date": d.get("date"), "source": d.get("source")} for d in cur]