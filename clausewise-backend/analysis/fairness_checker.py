def fairness_score(path: str):
    return {
        "score": 65,
        "summary": "The document shows a moderate bias. While consistent with general Indian commercial practices, some clauses like termination and liability could be better aligned with the principles of equity under the Specific Relief Act, 1963.",
        "breakdown": [
            {
                "point": "Payment Terms",
                "explanation": "Payment terms of Net 30 are standard in the Indian market and compliant with MSME Act provisions if applicable.",
                "is_fair": True
            },
            {
                "point": "Confidentiality",
                "explanation": "Mutual confidentiality obligations are present, aligning with best practices for protecting trade secrets in India.",
                "is_fair": True
            },
            {
                "point": "Termination Rights",
                "explanation": "Unilateral termination for convenience by the provider may be considered unfair under consumer protection principles if applicable.",
                "is_fair": False
            },
            {
                "point": "Intellectual Property",
                "explanation": "Client retaining ownership is standard for 'work made for hire' under the Copyright Act, 1957.",
                "is_fair": True
            },
            {
                "point": "Liability Limit",
                "explanation": "The liability cap is low. Indian courts generally uphold caps unless they are unconscionable, but this leaves significant residual risk.",
                "is_fair": False
            }
        ]
    }