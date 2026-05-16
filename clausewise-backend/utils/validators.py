ALLOWED_EXTENSIONS = {".pdf", ".docx", ".txt"}


def is_legal_document(filename: str) -> bool:
    """Accept any PDF, DOCX, or TXT file as a legal document."""
    if not filename:
        return False
    ext = "." + filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    return ext in ALLOWED_EXTENSIONS
