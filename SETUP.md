# Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Google Gemini API Key
# Get your API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_actual_api_key_here

# Node.js Server Base URL (for frontend to connect to backend)
# Default: http://localhost:8000
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### 3. Start Next.js Development Server

Open another terminal and run:

```bash
npm run dev
```

This starts the Next.js frontend on port 3000.

### 4. Access the Application

Open your browser and navigate to:
- Frontend: http://localhost:3000
- Node.js Backend: http://localhost:8000
