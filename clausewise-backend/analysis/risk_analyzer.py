def analyze_risk(path: str):
    return {
        "high_risk_count": 1,
        "medium_risk_count": 2,
        "low_risk_count": 1,
        "risks": [
            {
                "category": "Indemnification",
                "description": "The indemnification clause is one-sided. Under Section 124 of the Indian Contract Act, 1872, indemnity should ideally be mutual to ensure fairness.",
                "severity": "high"
            },
            {
                "category": "Termination",
                "description": "Termination notice is 15 days. Standard practice in India for service agreements is often 30-90 days to allow for reasonable transition.",
                "severity": "medium"
            },
            {
                "category": "Liability Cap",
                "description": "Liability is capped at a fixed amount. Section 73 of the Indian Contract Act allows for compensation for loss or damage, which might exceed this cap.",
                "severity": "medium"
            },
            {
                "category": "Jurisdiction",
                "description": "Jurisdiction is set to a foreign court. It is recommended to have jurisdiction in India (e.g., courts in New Delhi/Bangalore) for easier enforcement under the Code of Civil Procedure, 1908.",
                "severity": "low"
            }
        ]
    }