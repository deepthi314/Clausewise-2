import os

# MongoDB is optional. If MONGODB_URI is not set, latest_updates returns static data.
_mongo_available = False

try:
    from pymongo import MongoClient
    _mongo_uri = os.getenv("MONGODB_URI", "")
    if _mongo_uri:
        _client = MongoClient(_mongo_uri, serverSelectionTimeoutMS=2000)
        _client.server_info()  # test connection
        _mongo_available = True
except Exception:
    _mongo_available = False


def db():
    if not _mongo_available:
        return None
    from pymongo import MongoClient
    uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    return MongoClient(uri)[os.getenv("MONGODB_DB", "clausewise")]


def latest_updates():
    """Return latest law updates. Falls back to static data if MongoDB is unavailable."""
    if _mongo_available:
        try:
            cur = db()["law_updates"].find({}).sort("date", -1).limit(10)
            return [
                {"title": d.get("title"), "date": d.get("date"), "source": d.get("source")}
                for d in cur
            ]
        except Exception:
            pass

    # Static fallback data
    return [
        {
            "title": "Information Technology (Amendment) Act, 2008",
            "date": "2008-12-27",
            "source": "https://indiacode.nic.in"
        },
        {
            "title": "Consumer Protection Act, 2019",
            "date": "2019-08-09",
            "source": "https://consumeraffairs.nic.in"
        },
        {
            "title": "Personal Data Protection Bill (Draft)",
            "date": "2023-08-11",
            "source": "https://meity.gov.in"
        }
    ]
