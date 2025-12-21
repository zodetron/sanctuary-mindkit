# SANCTUARY OS | STRESS & ANXIETY TOOLKIT
## PROJECT SYNOPSIS
Sanctuary OS is a high-performance, full-stack mental wellness dashboard. It is engineered to provide immediate physiological and psychological relief through AI-driven insights and tactical breathing protocols. Built with a Soft Brutalist design language, it prioritizes speed, high-contrast scannability, and absolute data security.

## CORE FEATURES
NEURAL ANALYSIS: Stress assessment powered by Google Gemini AI for personalized recovery strategies.

IDENTITY SANCTUARY: Secure authentication using Bcrypt-protected credentials and JSON persistence.

RESPIRATORY PROTOCOLS: Interactive 4-7-8, Box, and Calm breathing cycles with visual haptic feedback.

GROUNDING LIBRARY: Tactical 5-4-3-2-1 sensory exercises to neutralize acute anxiety loops.

PROTOCOL INDEX: A curated library of daily mental health tips and emergency calm techniques.

## TECH STACK
FRONTEND: Next.js 14 (App Router), Tailwind CSS, React.

BACKEND: Node.js, Express.js.

SECURITY: Bcrypt.js (Hashing), CORS Middleware.

INTELLIGENCE: Google Gemini Pro API.

STORAGE: Lightweight JSON-based File Storage.

## SETUP & INSTALLATION
Terminal 1 - Backend:
```bash
npm install
npm run dev:backend
```

Terminal 2 - Frontend:
```bash
cd app
npm run dev
```

The backend will run on `http://localhost:8000` and frontend on `http://localhost:3000`

# AI INTELLIGENCE
GEMINI_API_KEY=your_api_key_here

# CONNECTIVITY
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
BACKEND_PORT=8000
FRONTEND_URL=http://localhost:3000

# SECURITY
SESSION_SECRET=high_entropy_string_here

EXECUTION
Option A: Unified Launch (Recommended)

Bash

npm run dev:all

Option B: Manual Orchestration

Backend: npm run dev:backend (Port 8000)

Frontend: npm run dev (Port 3000)

## SYSTEM ARCHITECTURE

```
├── app/                  # Next.js App Router (80% Global Scale)
│   ├── dashboard/        # Secure Wellness Hub
│   ├── components/       # Soft Brutalist UI Modules
│   └── lib/              # API Client Logic
├── backend-node/         # Express.js Server
│   ├── routes/           # Auth & AI Endpoints
│   ├── utils/            # JSON Storage Helpers
│   └── data/             # Persistent User Store (users.json)
└── globals.css           # Soft Brutalist Design System
```

## SECURITY & DATA INTEGRITY
ENCRYPTION: User passwords are never stored in plain text. Sanctuary OS uses Bcrypt with a workload factor of 10 to ensure high-resistance against brute-force attacks.

CORS POLICY: The backend is locked to the specific frontend origin, preventing unauthorized cross-site API interaction.

AI PERSONA: Gemini API requests are wrapped in a specific counseling persona to ensure responses are clinical, empathetic, and safe.

## DESIGN SPECIFICATIONS
SCALE: The entire UI is scaled to 80% via root font-size adjustment for an information-dense, editorial look.

PALETTE:

Slate-900: Primary Text & Void

Lime-500: System Active / Growth

Amber-500: Warning / Release

Rose-500: System Abort

## LICENSE
MIT - Open Sanctuary Protocol.
