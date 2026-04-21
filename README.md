# Sanctuary OS — Stress & Anxiety Toolkit

> Designed with ❤️ for mental wellness.

Sanctuary OS is a full-stack mental wellness platform that combines AI-powered stress analysis, guided breathing protocols, and grounding exercises into a single, secure, high-performance dashboard. Built for anyone who needs immediate, evidence-based tools to manage stress and anxiety — available instantly, from any device.

---

## What It Does

- Assesses stress and delivers personalized recovery strategies via Google Gemini AI
- Guides users through clinically recognized breathing protocols with real-time visual feedback
- Provides grounding exercises to neutralize acute anxiety
- Secures every user account with bcrypt-hashed credentials and session-based authentication
- Delivers a focused, distraction-free interface designed for clarity under stress

---
## Screenshots
<img width="500" alt="Screenshot 2026-04-21 120958" src="https://github.com/user-attachments/assets/91a18764-958a-4838-9081-07a3bd2585a9" />
<img width="500"  alt="Screenshot 2026-04-21 121019" src="https://github.com/user-attachments/assets/afb0a41d-fff0-4355-b964-315c55755948" />
<img width="501"  alt="Screenshot 2026-04-21 121035" src="https://github.com/user-attachments/assets/1e82c347-2b57-46dc-84f5-e78cbfc615bd" />
<img width="501" alt="Screenshot 2026-04-21 121055" src="https://github.com/user-attachments/assets/d7fec0be-689e-4e76-bedb-47ca5a05a245" />
<img width="500" alt="Screenshot 2026-04-21 121122" src="https://github.com/user-attachments/assets/fee19610-de30-48b2-8ddc-0f414d664ba9" />
<img width="500"  alt="Screenshot 2026-04-21 121139" src="https://github.com/user-attachments/assets/6b6975c0-b384-445a-9248-c3ad49f71915" />


---

## Core Features

### AI-Powered Neural Analysis
Google Gemini Pro processes user input and returns personalized, empathetic stress recovery strategies. The AI is wrapped in a clinical counseling persona to ensure responses are safe, grounded, and actionable.

### Secure Authentication
User registration and login protected with bcrypt password hashing (workload factor 10). Sessions managed server-side with a high-entropy secret. Passwords are never stored in plain text.

### Breathing Protocols
Interactive, visually guided breathing cycles with real-time phase transitions:
- **4-7-8 Breathing** — nervous system reset
- **Box Breathing** — focus and stress regulation
- **Calm Breathing** — general anxiety relief
- **Deep Belly Breathing** — diaphragmatic relaxation
- **Mindful Breathing** — present-moment awareness

### Grounding Library
Tactical 5-4-3-2-1 sensory exercises designed to break acute anxiety loops and restore present-moment awareness.

### Protocol Index
A curated library of daily mental health techniques and emergency calm strategies accessible without authentication.

### Analytics Dashboard
Visual insights into stress and anxiety trends including stress levels before and after COVID-19, anxiety rates by age group, stress distribution by profession, and global mental health statistics over time.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (local or MongoDB Atlas) |
| Authentication | Express Session, bcrypt.js |
| AI | Google Gemini Pro API |
| Charts | Recharts |
| Animations | Framer Motion |
| Language | TypeScript |

---

## System Architecture

```
app/                        — Next.js App Router (frontend)
├── dashboard/              — Authenticated wellness hub
├── breathing/              — Breathing protocol pages
├── analytics/              — Mental health analytics dashboard
├── chatbot/                — AI chat interface
├── login/ & signup/        — Authentication pages
├── components/             — Reusable UI modules
└── lib/                    — API client logic

backend-node/               — Express.js server
├── routes/
│   ├── auth.js             — Registration, login, logout, session check
│   ├── exercises.js        — Breathing exercise CRUD and activity logging
│   ├── analytics.js        — Mental health statistics endpoints
│   └── chatbot.js          — Gemini AI proxy
├── models/                 — MongoDB schemas (User, Exercise, Activity, Stats)
├── middleware/
│   └── auth.js             — Session-based route protection
└── config/
    └── db.js               — MongoDB connection

globals.css                 — Design system (Soft Brutalist)
```

### Data Flow

- **Authentication**: Client → Express → MongoDB → Session
- **Breathing Exercises**: Client → Express → MongoDB (fetch and log)
- **Analytics**: Client → Express → MongoDB (pre-seeded statistics)
- **AI Chat**: Client → Express → Google Gemini API → Client

---

## API Endpoints

### Authentication — `/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/auth/signup` | Create new account | No |
| POST | `/auth/login` | Login | No |
| POST | `/auth/logout` | Logout | Yes |
| GET | `/auth/check_session` | Verify session | No |

### Breathing Exercises — `/api/exercises`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/exercises` | List all exercises | No |
| GET | `/api/exercises/:id` | Single exercise detail | No |
| POST | `/api/exercises/activity` | Log a session | Yes |
| GET | `/api/exercises/activity/user/history` | User activity history | Yes |
| GET | `/api/exercises/activity/user/stats` | User statistics | Yes |

### Analytics — `/api/analytics`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/analytics/stress-trend` | Stress trend data | No |
| GET | `/api/analytics/anxiety-by-age` | Anxiety by age group | No |
| GET | `/api/analytics/profession-stress` | Stress by profession | No |
| GET | `/api/analytics/summary` | Summary statistics | No |
| GET | `/api/analytics/all` | All analytics data | No |

### Chatbot — `/api/chatbot`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/chatbot/chat` | Send message to AI | Yes |
| GET | `/api/chatbot/status` | Check API status | Yes |

---

## Security

- **Passwords**: bcrypt with workload factor 10 — never stored in plain text
- **Sessions**: HTTP-only cookies with server-side session management
- **CORS**: Backend locked to frontend origin only
- **AI Safety**: Gemini safety filters set to BLOCK_MEDIUM_AND_ABOVE for harassment, hate speech, and dangerous content
- **API Keys**: Server-side only — never exposed to the client
- **Input Sanitization**: Usernames restricted to alphanumeric characters

---

## Setup and Installation

### Prerequisites

- Node.js v18 or higher
- MongoDB (local) or a MongoDB Atlas account
- Google Gemini API key — free tier available at [makersuite.google.com](https://makersuite.google.com/app/apikey)

### 1. Clone the repository

```bash
git clone <repository-url>
cd stress-anxiety-toolkit
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
# Server
BACKEND_PORT=8000
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=your-high-entropy-secret-here
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# MongoDB
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=stress_toolkit

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Start MongoDB

**Local:**
```bash
mongod
```

**Atlas:** Add your Atlas connection string to `MONGODB_URI` in `.env`.

---

## Running the Project

### Recommended — start both servers together

```bash
npm run dev:all
```

### Manual — separate terminals

```bash
# Terminal 1 — Backend (port 8000)
npm run dev:backend

# Terminal 2 — Frontend (port 3000)
cd app
npm run dev
```

Open **http://localhost:3000** in your browser.

**First time:** Click Sign Up, create an account, and log in to access all features.

---

## Design System

Sanctuary OS uses a **Soft Brutalist** design language — high-contrast, information-dense, and editorially clean. The UI is scaled to 80% via root font-size adjustment for a focused, distraction-free experience.

**Palette:**
- `slate-900` — Primary text and background
- `lime-500` — Active states and growth indicators
- `amber-500` — Warnings and release signals
- `rose-500` — Critical alerts and abort states

---

## Disclaimer

Sanctuary OS provides general wellness support and educational content only. It is not a medical device and is not intended for clinical diagnosis, treatment, or crisis intervention. Users experiencing a mental health emergency should contact emergency services or a licensed mental health professional immediately.

**Crisis Resources:**
- National Suicide Prevention Lifeline: **988**
- Crisis Text Line: Text **HOME** to **741741**
- International Crisis Centers: [iasp.info](https://www.iasp.info/resources/Crisis_Centres/)

---

## License

MIT — Open Sanctuary Protocol.
