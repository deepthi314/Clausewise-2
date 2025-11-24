def answer_query(message: str) -> str:
    msg = message.lower()
    if "risk" in msg:
        return "Based on my analysis, the document contains high-risk clauses related to Indemnification and Liability. You should review these carefully."
    elif "fair" in msg or "bias" in msg:
        return "The document has a fairness score of 65/100. It seems to favor the Service Provider in terms of termination rights."
    elif "summary" in msg or "about" in msg:
        return "This is a Master Services Agreement for software development services. It outlines the responsibilities of both parties."
    elif "hello" in msg or "hi" in msg:
        return "Hello! I am ClauseWise AI. How can I help you analyze your legal document today?"
    else:
        return "I can help you understand the risks, fairness, and key clauses of this document. Try asking about 'risks' or 'fairness'."