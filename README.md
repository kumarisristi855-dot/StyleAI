# StyleAI — Your AI Fashion Stylist

AI-powered fashion styling platform. Upload photos, create outfits, get AI recommendations, and elevate your style.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: FastAPI, Python, PostgreSQL, Redis
- **Auth**: Clerk
- **Storage**: AWS S3
- **AI**: Gemini API (primary), OpenAI (fallback)
- **Infrastructure**: Docker, AWS

## Features

- AI Outfit Builder — Upload items, get complete outfit suggestions
- Virtual Try-On — AI-generated outfit previews
- Smart Wardrobe — Auto-categorize, search by natural language
- AI Personal Stylist — Learn preferences, get personalized advice
- Occasion Styling — Looks for college, office, party, wedding, etc.
- Weather-Based Recommendations — Weather-aware outfit suggestions
- Budget Shopping Assistant — Complete outfits within budget
- Multi-Store Comparison — Compare across Myntra, Amazon, Ajio, Flipkart
- Color Harmony Analyzer — Analyze compatibility, contrast, balance
- Outfit Scoring — Style, trend, color, occasion scores
- Alternative Look Generator — Casual, formal, luxury, minimal versions
- Friend Voting — Share outfits, get community feedback
- Packing Assistant — Generate packing lists for trips
- Sustainable Fashion Mode — Maximize existing wardrobe
- Fashion Trend Engine — Track trending colors and styles
- AI Shopping Copilot — Analyze screenshots, decide if you should buy

## Quick Start

### Prerequisites

- Node.js 20+
- Python 3.12+
- PostgreSQL 16
- Redis 7
- Docker & Docker Compose (optional)

### Environment Setup

```bash
# Clone and enter the project
cd styleai

# Copy environment variables
cp .env.example .env
# Fill in your API keys in .env
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:3000
```

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn main:app --reload
# API at http://localhost:8000
# Docs at http://localhost:8000/docs
```

### Docker (Full Stack)

```bash
docker-compose -f infrastructure/docker-compose.yml up -d
```

## Project Structure

```
styleai/
├── frontend/                # Next.js 15 application
│   ├── src/
│   │   ├── app/            # Pages (auth, dashboard, shop)
│   │   ├── components/     # UI, layouts, feature components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities, API client
│   │   ├── stores/         # Zustand state management
│   │   └── types/          # TypeScript type definitions
│   └── public/
├── backend/                 # FastAPI application
│   ├── app/
│   │   ├── api/v1/         # API endpoints
│   │   ├── core/           # Config, security, database
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/ai/    # AI service implementations
│   └── main.py
├── infrastructure/         # Docker, Nginx, Terraform
└── docs/                   # Documentation
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/health` | GET | Health check |
| `/api/v1/users/me` | GET | Current user profile |
| `/api/v1/wardrobe/items` | GET/POST | List/Create wardrobe items |
| `/api/v1/wardrobe/upload/analyze` | POST | Analyze uploaded image |
| `/api/v1/outfits` | GET/POST | List/Create outfits |
| `/api/v1/outfits/ai-generate` | POST | AI generate outfit |
| `/api/v1/outfits/{id}/score` | POST | Score an outfit |

## Deployment

### AWS Deployment

1. Set up RDS PostgreSQL and ElastiCache Redis
2. Configure S3 bucket for uploads
3. Deploy backend on ECS/EKS with Docker
4. Deploy frontend on Vercel or CloudFront + S3
5. Set up CloudFront CDN for static assets
6. Configure Route53 domain and SSL via ACM

### Environment Variables (Production)

```
DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/styleai
REDIS_URL=redis://host:6379/0
GEMINI_API_KEY=<your-key>
CLERK_SECRET_KEY=<your-key>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-key>
AWS_ACCESS_KEY_ID=<your-key>
AWS_SECRET_ACCESS_KEY=<your-key>
S3_BUCKET_NAME=styleai-prod-uploads
```

## License

MIT
