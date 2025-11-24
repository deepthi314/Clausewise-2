import os
import uuid
import shutil

def uploads_dir():
    d = os.path.join(os.path.dirname(__file__), "..", "uploads")
    d = os.path.abspath(d)
    os.makedirs(d, exist_ok=True)
    return d

def save_upload(file):
    name = f"{uuid.uuid4().hex}_{file.filename}"
    path = os.path.join(uploads_dir(), name)
    
    # Use shutil.copyfileobj for efficient large file handling
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return path