# ClauseWise

ClauseWise is an intelligent AI-powered platform designed to analyze Non-Disclosure Agreements (NDAs) and other legal documents. It helps users understand complex legal jargon by simplifying clauses, detecting risks, calculating fairness scores, and ensuring document compliance.

## 🚀 Features

- **Document Analysis**:
  - **Risk Assessment**: Automatically detects and highlights high-risk clauses in NDAs.
  - **Fairness Score**: Evaluates the fairness of the contract for all parties involved.
  - **Clause Extraction**: Identifies key clauses and entities within the document.
  - **Simplification**: Translates complex legal text into simple, easy-to-understand language (ELI5).
- **Document Comparison**: Compare two documents side-by-side to identify differences.
- **Smart Chatbot**: Integrated AI chatbot to answer legal queries and provide context-aware assistance.
- **Legal Updates**: Stay informed with the latest updates in laws and regulations.
- **Secure Authentication**: User registration and login system to save and manage document history.

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens), Bcrypt
- **Libraries**: `pymongo`, `uvicorn`, `python-multipart`, `passlib`

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State/Routing**: React Router DOM, Axios
- **Internationalization**: i18next

## 📂 Project Structure

```
CLAUSEWISE/
├── clausewise-backend/    # FastAPI Backend
│   ├── analysis/          # Core analysis logic (NER, Risk, Fairness)
│   ├── auth/              # Authentication routes
│   ├── law_updates/       # Legal database updates
│   ├── storage/           # File handling and DB interactions
│   └── app.py             # Main application entry point
│
├── clausewise-frontend/   # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   └── assets/        # Static assets
│   └── package.json       # Frontend dependencies
│
└── start_servers.bat      # Windows batch script to start both servers
```

## ⚡ Getting Started

### Prerequisites
- **Node.js**: (Version 16+ recommended)
- **Python**: (Version 3.8+ recommended)
- **MongoDB**: Ensure a MongoDB instance is running locally or a connection string is configured.

### Quick Start (Windows)
Simply run the included batch script to start both the backend and frontend:
```bash
./start_servers.bat
```

### Manual Installation

#### 1. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd clausewise-backend
pip install -r requirements.txt
python -m uvicorn app:app --reload --port 8000
```

#### 2. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd clausewise-frontend
npm install
npm run dev
```

The frontend will act as the user interface, communicating with the backend API running on port 8000.

## 🔒 Environment Variables
Ensure you have a `.env` file in the backend directory with necessary secrets:
- `MONGO_URI`
- `SECRET_KEY` (for JWT)
- `OPENAI_API_KEY` (if applicable for AI features)

---

Developed for simplfying legal document review.
