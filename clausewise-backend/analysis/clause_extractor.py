def extract_clauses(path: str):
    return [
        {
            "id": 1,
            "title": "Confidentiality",
            "category": "Confidentiality",
            "text": "The Receiving Party shall hold the Disclosing Party's Confidential Information in strict confidence and shall not disclose such Confidential Information to any third party without the Disclosing Party's prior written consent.",
            "simplified": "Don't share secrets without permission."
        },
        {
            "id": 2,
            "title": "Indemnification",
            "category": "Indemnification",
            "text": "Provider agrees to indemnify, defend, and hold harmless Client from and against any and all claims, damages, liabilities, costs, and expenses arising out of or related to Provider's breach of this Agreement.",
            "simplified": "Provider pays if they break the rules and cause problems."
        },
        {
            "id": 3,
            "title": "Termination",
            "category": "Termination",
            "text": "Either party may terminate this Agreement for any reason upon thirty (30) days written notice to the other party.",
            "simplified": "Anyone can quit with a 30-day note."
        },
        {
            "id": 4,
            "title": "Governing Law",
            "category": "Governing Law",
            "text": "This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles.",
            "simplified": "Delaware laws apply."
        }
    ]