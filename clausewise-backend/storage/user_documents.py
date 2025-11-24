from datetime import datetime
import uuid
from storage.json_db import save_document, get_documents, get_document_by_id

def create_document_record(user_id: str, name: str, doc_type: str, path: str):
    doc_id = str(uuid.uuid4())
    doc = {
        "id": doc_id,
        "userId": user_id, 
        "filename": name, 
        "type": doc_type, 
        "path": path, 
        "upload_date": datetime.utcnow().isoformat()
    }
    save_document(doc)
    return doc

def list_documents(user_id: str):
    docs = get_documents(user_id)
    # Sort by upload_date desc
    docs.sort(key=lambda x: x["upload_date"], reverse=True)
    return docs

def get_document(user_id: str, document_id: str):
    doc = get_document_by_id(document_id)
    if doc and doc["userId"] == user_id:
        return doc
    return None