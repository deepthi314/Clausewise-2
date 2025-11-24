from law_updates.database import db

def list_user_history(user_id: str):
    return list(db()["analysis_results"].find({"userId": user_id}).sort("createdAt", -1))