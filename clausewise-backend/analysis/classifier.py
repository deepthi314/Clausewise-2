def detect_type(path: str) -> str:
    p = path.lower()
    if "nda" in p:
        return "NDA"
    if "lease" in p:
        return "Lease"
    if "contract" in p:
        return "Contract"
    return "Compliance"