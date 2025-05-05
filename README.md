# socials.io - Your AI-Powered Social Research Assistant

**Tagline:** Ask. Discover. Summarize. Instantly.

## Overview
socials.io is a Vue.js-based AI assistant that helps users:
- Discover public social profiles (e.g. GitHub, LinkedIn, Twitter)
- Summarize trending topics across platforms (Twitter, Reddit, Google Trends)
- Use a floating "Quick Ball" UI to interact instantly

No login, no friction â€” just ask the assistant and get smart answers.

---

## Tech Stack

**Frontend:**
- Vue 3 + Vite
- TailwindCSS
- PWA-ready

**Backend:**
- Node.js + Express
- REST API with JSON responses

**AI & Search:**
- OpenAI GPT-4 API
- Google Programmable Search Engine
- Reddit & Twitter APIs

---

## Project Structure

```
socials.io/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── QuickBall.vue
│   │   ├── App.vue
│   │   └── main.js
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── routes/
│   │   └── ai.js
│   ├── index.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm or pnpm
- OpenAI + Google API keys

### Setup Instructions

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

### Required `.env` Variables

```
OPENAI_API_KEY=
GOOGLE_CSE_ID=
GOOGLE_API_KEY=
TWITTER_BEARER_TOKEN=
```

---

## MVP Deliverables

- [ ] AI-powered profile search via query
- [ ] Trend summarization from multiple sources
- [ ] Floating "Quick Ball" UI on any page
- [ ] PWA functionality for installable access

---

## Contributing

- Use GitHub Issues and PRs to track changes
- Follow feature branching strategy
- Keep code modular and components scoped

---

## License

MIT â€” free to use, adapt, and extend.
