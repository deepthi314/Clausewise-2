def simplify_text(text: str, mode: str) -> str:
    if mode == "ELI5":
        return f"Simple: {text}"
    if mode == "Professional":
        return f"Professional: {text}"
    return f"Simplified: {text}"

def simplify_clauses(clauses, mode: str):
    out = []
    for c in clauses:
        out.append({"id": c["id"], "category": c["category"], "text": c["text"], "simplified": simplify_text(c["text"], mode)})
    return out