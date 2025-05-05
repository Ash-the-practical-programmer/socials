# socials.io — Your AI-Powered Social Research Assistant

**Tagline:** Ask. Discover. Summarize. Instantly.

## Overview
socials.io is a lightweight AI assistant that helps users:
- Discover public social profiles (e.g. GitHub, LinkedIn, Twitter)
- Summarize trending topics across platforms (Twitter, Reddit, Google Trends)
- Use a floating "Quick Ball" UI to interact instantly

No login, no friction — just ask the assistant and get smart answers.

## Tech Stack
- **Frontend:** Vue + TailwindCSS (PWA)
- **Backend:** Node.js + Express
- **AI:** OpenAI GPT-4 API
- **Search:** Google Programmable Search Engine (CSE), Reddit API, Twitter API

## Directory Structure
## Getting Started
1. Clone the repo
2. `cd frontend && npm install && npm run dev`
3. `cd backend && npm install && npm run dev`
4. Set up `.env` files with keys:
   - OPENAI_API_KEY
   - GOOGLE_CSE_ID
   - GOOGLE_API_KEY
   - TWITTER_BEARER_TOKEN (optional)

## Contributing
- PRs welcome
- Use feature branches and submit clean commits
- Keep code modular and scalable

---

**MVP Goal:** A working AI assistant with:
- Profile fetch
- Trend summarization
- Quick Ball UI launcher
