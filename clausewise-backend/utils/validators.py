def is_legal_document(filename: str) -> bool:
    f = filename.lower()
    # Check extension
    valid_ext = f.endswith(".pdf") or f.endswith(".docx") or f.endswith(".txt")
    if not valid_ext:
        return False
    
    # Check if it's an NDA (simple keyword check as requested)
    # The user specifically asked to restrict to NDAs.
    is_nda = "nda" in f or "non-disclosure" in f or "confidentiality" in f
    return is_nda