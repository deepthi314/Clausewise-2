# ClauseWise

AI-powered legal document analysis platform. Upload contracts, NDAs, and legal agreements to get instant risk analysis, clause extraction, fairness scoring, and plain-language summaries.

## Features

- **Document Upload** — PDF, DOCX, TXT support
- **Clause Extraction** — Identifies and categorizes key clauses
- **Risk Analysis** — Flags high/medium/low risk clauses with explanations
- **Fairness Score** — Rates document balance between parties
- **Plain Language Summaries** — Simplified, ELI5, and Professional modes
- **Multi-language Support** — English, Hindi, Tamil, Bengali
- **Legal Chatbot** — Ask questions about legal concepts
- **JWT Authentication** — Secure user accounts

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, i18next |
| Backend | FastAPI, Python 3.10+ |
| Auth | JWT (PyJWT), bcrypt via passlib |
| Database | JSON file (no external DB required) |
| Optional | MongoDB (for law updates) |

## Project Structure

```
Clausewise-2/
├── clausewise-backend/     # FastAPI backend
│   ├── analysis/           # AI analysis modules
│   ├── auth/               # JWT auth routes & models
│   ├── law_updates/        # Law update scraper & DB
│   ├── storage/            # JSON DB & file management
│   ├── utils/              # Parsers & validators
│   ├── app.py              # FastAPI app entry point
│   └── requirements.txt
└── clausewise-frontend/    # React frontend
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── context/        # Auth context
    │   ├── pages/          # Route pages
    │   └── services/       # API service layer
    └── package.json
```

## Getting Started

### Backend

```bash
cd clausewise-backend

# Create virtual environment
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env        # Windows
# cp .env.example .env        # macOS/Linux
# Edit .env and set JWT_SECRET

# Run the server
uvicorn app:app --reload --port 8000
```

Backend runs at: http://localhost:8000  
API docs at: http://localhost:8000/docs

### Frontend

```bash
cd clausewise-frontend

# Install dependencies
npm install

# Configure environment
copy .env.example .env        # Windows
# cp .env.example .env        # macOS/Linux

# Run dev server
npm run dev
```

Frontend runs at: http://localhost:5173

## Environment Variables

### Backend (`clausewise-backend/.env`)

| Variable | Description | Default |
|---|---|---|
| `JWT_SECRET` | Secret key for JWT signing | `dev-secret` (change in prod) |
| `MONGODB_URI` | MongoDB connection string (optional) | empty |
| `MONGODB_DB` | MongoDB database name | `clausewise` |

### Frontend (`clausewise-frontend/.env`)

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000` |

## Deployment

### Backend (e.g., Render, Railway, Fly.io)

1. Set environment variables in your hosting dashboard
2. Set `JWT_SECRET` to a long random string
3. Start command: `uvicorn app:app --host 0.0.0.0 --port $PORT`

### Frontend (e.g., Vercel, Netlify)

1. Set `VITE_API_URL` to your deployed backend URL
2. Build command: `npm run build`
3. Output directory: `dist`

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/signup` | No | Register new user |
| POST | `/auth/login` | No | Login |
| POST | `/files/upload` | Yes | Upload document |
| GET | `/files/history` | Yes | List user documents |
| GET | `/analysis/{id}/overview` | Yes | Document summary & entities |
| GET | `/analysis/{id}/extract` | Yes | Extract & simplify clauses |
| GET | `/analysis/{id}/risk` | Yes | Risk analysis |
| GET | `/analysis/{id}/fairness` | Yes | Fairness score |
| POST | `/chatbot/ask` | No | Ask legal question |
| GET | `/laws/latest` | No | Latest law updates |

## License

MIT
