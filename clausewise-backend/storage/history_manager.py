from storage.json_db import get_documents

def list_user_history(user_id: str):
    """Return all documents for a user, sorted by upload_date descending."""
    docs = get_documents(user_id)
    docs.sort(key=lambda x: x.get("upload_date", ""), reverse=True)
    return docs
