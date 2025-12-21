# Quick Start Guide - Node.js Backend

## 🚀 Getting Started (3 Steps)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment

Your `.env` file should have:
```env
GEMINI_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
BACKEND_PORT=8000
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=change-this-to-a-random-secret-in-production
```

### Step 3: Start Servers

**Option A: Run both together (easiest)**
```bash
npm run dev:all
```

**Option B: Run separately**

Terminal 1:
```bash
npm run dev:backend
```

Terminal 2:
```bash
npm run dev
```

## ✅ That's It!

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Health Check: http://localhost:8000/health

## 📝 Notes

- **No PHP needed** - Everything runs on Node.js
- **No cURL issues** - Uses Node.js built-in fetch
- **JSON storage** - Users stored in `backend-node/data/users.json`
- **Automatic setup** - Data directory created automatically

## 🐛 Troubleshooting

### Port Already in Use
Change `BACKEND_PORT` in `.env` or stop the old server.

### Module Not Found
Run `npm install` again.

### CORS Errors
Make sure `FRONTEND_URL` in `.env` matches exactly: `http://localhost:3000`

