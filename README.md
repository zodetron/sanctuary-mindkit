# Stress & Anxiety Self-Help Toolkit

A full-stack web application for managing stress and anxiety, built with Next.js (App Router) and PHP.

## Features

- User authentication (signup/login) with file-based storage
- Stress level assessment with AI-powered advice
- Guided breathing exercises
- Daily mental health tips
- Instant calm advice

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Node.js with Express
- **Storage**: File-based (JSON files)
- **AI**: Google Gemini API

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update the configuration:

```bash
cp .env.example .env
```

Edit `.env` and set:
- `GEMINI_API_KEY`: Your Google Gemini API key (get it from https://makersuite.google.com/app/apikey)
- `NEXT_PUBLIC_API_BASE_URL`: The URL of your backend server (default: http://localhost:8000)
- `BACKEND_PORT`: Backend server port (default: 8000)
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:3000)
- `SESSION_SECRET`: Secret key for sessions (change in production)

### 3. Start Development Servers

**Option 1: Run both servers together (recommended)**
```bash
npm run dev:all
```

**Option 2: Run servers separately**

Terminal 1 - Backend:
```bash
npm run dev:backend
```

Terminal 2 - Frontend:
```bash
npm run dev
```

The backend will run on `http://localhost:8000` and frontend on `http://localhost:3000`

### 4. Directory Permissions

The `backend-node/data/` directory will be created automatically. No special permissions needed on Windows.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── dashboard/         # Dashboard page (protected)
│   ├── components/        # React components
│   │   ├── StressCheck.tsx
│   │   ├── BreathingExercises.tsx
│   │   ├── DailyTips.tsx
│   │   └── InstantCalm.tsx
│   └── lib/               # Utilities
│       └── api.ts         # API endpoint configuration
├── backend-node/          # Node.js backend
│   ├── routes/           # Express routes
│   │   ├── auth.js      # Authentication routes
│   │   └── api.js       # API routes (Gemini)
│   ├── utils/           # Utilities
│   │   └── storage.js   # File-based storage helpers
│   └── data/            # Data storage (users.json auto-created)
├── server.js            # Express server entry point
├── public/               # Static assets
└── package.json
```

## Security Notes

- Passwords are hashed using bcrypt
- Inputs are sanitized
- Session-based authentication with express-session
- **Important**: 
  - Replace the example API key with a real one in production
  - Change SESSION_SECRET in .env for production
  - Enable HTTPS in production and set secure cookies

## License

MIT

