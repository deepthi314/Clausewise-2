import os
import sys
from fastapi import FastAPI, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
sys.path.append(os.path.dirname(__file__))
from auth.auth_routes import router as auth_router, get_current_user
from storage.user_documents import create_document_record, list_documents, get_document
from storage.file_manager import save_upload
from utils.validators import is_legal_document
from analysis.classifier import detect_type
from analysis.ner_extract import extract_overview
from analysis.clause_extractor import extract_clauses
from analysis.simplifier import simplify_clauses
from analysis.risk_analyzer import analyze_risk
from analysis.fairness_checker import fairness_score
from analysis.comparator import compare_documents
from analysis.chatbot_engine import answer_query
from law_updates.database import latest_updates

app = FastAPI(title="ClauseWise")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(auth_router, prefix="/auth")

@app.get("/")
def health_check():
    return {"status": "ok", "message": "ClauseWise Backend is running"}

@app.post("/files/upload")
def upload(file: UploadFile = File(...), user=Depends(get_current_user)):
    if not is_legal_document(file.filename):
        return JSONResponse(status_code=400, content={"valid": False, "message": "Only NDA documents (PDF, DOCX, TXT) are allowed."})
    
    try:
        path = save_upload(file)
        doc_type = detect_type(path)
        doc = create_document_record(user["id"], file.filename, doc_type, path)
        return {"valid": True, "documentId": doc["id"]}
    except Exception as e:
        print(f"Upload error: {e}")
        return JSONResponse(status_code=500, content={"valid": False, "message": "Internal server error during upload."})

@app.get("/files/history")
def history(user=Depends(get_current_user)):
    documents = list_documents(user["id"]) 
    return {"documents": documents}

@app.get("/analysis/{document_id}/overview")
def overview(document_id: str, user=Depends(get_current_user)):
    doc = get_document(user["id"], document_id)
    data = extract_overview(doc["path"])
    return data

@app.get("/analysis/{document_id}/extract")
def extract(document_id: str, lang: str = "en", user=Depends(get_current_user)):
    doc = get_document(user["id"], document_id)
    clauses = extract_clauses(doc["path"])
    # Apply simplification to generate all modes
    clauses = simplify_clauses(clauses, "Simplified", lang)
    return {"clauses": clauses}

@app.post("/analysis/{document_id}/simplify")
def simplify(document_id: str, body: dict, user=Depends(get_current_user)):
    doc = get_document(user["id"], document_id)
    clauses = extract_clauses(doc["path"])
    result = simplify_clauses(clauses, body.get("mode", "Simplified"))
    return {"clauses": result}

@app.get("/analysis/{document_id}/risk")
def risk(document_id: str, user=Depends(get_current_user)):
    doc = get_document(user["id"], document_id)
    res = analyze_risk(doc["path"]) 
    return res

@app.get("/analysis/{document_id}/fairness")
def fairness(document_id: str, user=Depends(get_current_user)):
    doc = get_document(user["id"], document_id)
    res = fairness_score(doc["path"]) 
    return res

@app.post("/compare/{document_id}")
def compare(document_id: str, file: UploadFile = File(...), user=Depends(get_current_user)):
    doc = get_document(user["id"], document_id)
    second = save_upload(file)
    res = compare_documents(doc["path"], second)
    return res

@app.post("/chatbot/ask")
def ask(body: dict):
    ans = answer_query(body.get("message", ""))
    return {"answer": ans}

@app.get("/laws/latest")
def laws():
    return {"updates": latest_updates()}