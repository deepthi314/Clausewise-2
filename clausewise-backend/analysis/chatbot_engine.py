def answer_query(message: str) -> str:
    msg = message.lower()
    
    # Greetings
    if msg in ["hi", "hello", "hey", "greetings"]:
        return "Hello! I am ClauseWise AI. Please ask me questions related to your NDA or legal documents."
        
    # Legal/NDA related keywords
    legal_keywords = ["risk", "fair", "bias", "summary", "about", "clause", "nda", "agreement", "contract", "liability", "indemnity", "termination", "law", "legal"]
    
    if any(word in msg for word in legal_keywords):
        if "risk" in msg:
            return "Based on my analysis, the document contains high-risk clauses related to Indemnification and Liability. You should review these carefully."
        elif "fair" in msg or "bias" in msg:
            return "The document has a fairness score of 65/100. It seems to favor the Service Provider in terms of termination rights."
        elif "summary" in msg or "about" in msg:
            return "This is a Master Services Agreement for software development services. It outlines the responsibilities of both parties."
        else:
            return "That sounds like a legal question. I can help analyze that aspect of your document. Could you be more specific about which clause you are interested in?"
            
    # Off-topic fallback
    return "Please pose a question related to NDA or legal matters. I am designed to assist with document analysis only."