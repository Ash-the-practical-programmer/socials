# socials.io - Your AI-Powered Social Research Assistant

Ask. Discover. Summarize. Instantly.

## Overview

**socials.io** is a Nuxt 3 + FastAPI-based AI assistant that helps users:

- Discover public social profiles (e.g. GitHub, LinkedIn, Twitter)
- Summarize trending topics across platforms (Twitter, Reddit, Google Trends)
- Use a floating "Quick Ball" UI to interact instantly

No login, no friction - just ask the assistant and get smart answers.

---

## Tech Stack

**Frontend:**
- Nuxt 3 (Vue 3) with Nitro server
- TailwindCSS
- PWA-ready
- SSR + API capabilities

**Backend:**
- Python FastAPI
- REST endpoints for AI logic and scraping
- Async processing and OpenAI integration

**AI & Search:**
- OpenAI GPT-4 API
- Google Programmable Search Engine
- Reddit & Twitter APIs

---

## Project Structure

```
socials.io/
├── nuxt-frontend/
│   ├── assets/
│   ├── components/
│   ├── composables/
│   ├── pages/
│   ├── public/
│   └── server/
│       └── api/              # Optional Nuxt server routes
│
├── ai-backend/
│   ├── app/
│   │   ├── main.py           # FastAPI entrypoint
│   │   ├── routes/
│   │   │   └── ai.py
│   │   └── services/
│   ├── requirements.txt
│   └── .env.example
│
└── docs/                     # Planning, prompts, brainstorming
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- Python 3.10+
- npm or pnpm
- OpenAI, Google API keys

### Setup Instructions

#### FastAPI Backend

```bash
cd ai-backend
python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

#### Nuxt Frontend

```bash
cd nuxt-frontend
npm install
npm run dev
```

---

## Required `.env` Variables (for Backend)

```
OPENAI_API_KEY=
GOOGLE_CSE_ID=
GOOGLE_API_KEY=
TWITTER_BEARER_TOKEN=
```

---

## MVP Deliverables

- [ ] AI-powered profile search via natural query
- [ ] Trend summarization from multiple sources
- [ ] Floating "Quick Ball" UI on every page
- [ ] PWA-ready for installable access
- [ ] Server-rendered SEO-friendly frontend

---

## Contributing

- Use GitHub Issues and PRs to track changes
- Follow feature branching strategy
- Keep code modular and maintain backend/frontend separation

---

## License

MIT - free to use, adapt, and extend.
