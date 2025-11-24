def analyze_risk(path: str):
    return {
        "high_risk_count": 1,
        "medium_risk_count": 2,
        "low_risk_count": 1,
        "risks": [
            {
                "category": "Indemnification",
                "description": "The indemnification clause is one-sided, favoring the other party heavily.",
                "severity": "high"
            },
            {
                "category": "Termination",
                "description": "Termination notice period is shorter than standard market practice (15 days vs 30 days).",
                "severity": "medium"
            },
            {
                "category": "Liability Cap",
                "description": "Liability is capped at a fixed amount rather than contract value.",
                "severity": "medium"
            },
            {
                "category": "Jurisdiction",
                "description": "Jurisdiction is set to a foreign court, which might increase dispute resolution costs.",
                "severity": "low"
            }
        ]
    }