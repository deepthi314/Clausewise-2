def fairness_score(path: str):
    return {
        "score": 65,
        "summary": "The document shows a moderate bias towards the service provider. While most terms are standard, the termination and liability clauses could be more balanced.",
        "breakdown": [
            {
                "point": "Payment Terms",
                "explanation": "Payment terms of Net 30 are standard and fair to both parties.",
                "is_fair": True
            },
            {
                "point": "Confidentiality",
                "explanation": "Mutual confidentiality obligations ensure both parties are protected.",
                "is_fair": True
            },
            {
                "point": "Termination Rights",
                "explanation": "Only the provider has the right to terminate for convenience, which is unbalanced.",
                "is_fair": False
            },
            {
                "point": "Intellectual Property",
                "explanation": "Client retains ownership of deliverables, which is fair.",
                "is_fair": True
            },
            {
                "point": "Liability Limit",
                "explanation": "The liability cap is too low for the potential risk involved.",
                "is_fair": False
            }
        ]
    }