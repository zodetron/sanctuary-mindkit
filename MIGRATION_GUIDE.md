# Migration from PHP to Node.js Backend

This project has been migrated from PHP to Node.js/Express for better compatibility and easier setup.

## What Changed

### Backend
- **Before**: PHP backend with `.txt` file storage
- **After**: Node.js/Express backend with JSON file storage

### Storage Format
- **Before**: `users.txt` (pipe-separated: `username|hashed_password`)
- **After**: `users.json` (JSON array of user objects)

### API Endpoints
- **Before**: `/auth/signup.php`, `/auth/login.php`, etc.
- **After**: `/auth/signup`, `/auth/login`, etc. (no `.php` extension)

## Migration Steps

### 1. Install New Dependencies

```bash
npm install
```

This will install Express, bcryptjs, express-session, cors, and dotenv.

### 2. Update Environment Variables

Your `.env` file should now include:
```env
GEMINI_API_KEY=your_api_key_here
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
BACKEND_PORT=8000
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=your-secret-key-here
```

### 3. Migrate Existing Users (Optional)

If you have existing users in `backend/data/users.txt`, you can migrate them:

1. The new system will create `backend-node/data/users.json` automatically
2. Existing users will need to sign up again, OR
3. You can manually convert the data format (see below)

### 4. Start the New Backend

```bash
npm run dev:backend
```

Or run both frontend and backend together:
```bash
npm run dev:all
```

## Manual User Migration (if needed)

If you want to migrate existing users from `users.txt` to `users.json`:

1. Read `backend/data/users.txt`
2. Convert each line `username|hashed_password` to JSON format:
```json
[
  {
    "username": "user1",
    "password": "$2y$10$...",
    "createdAt": "2025-12-21T12:00:00.000Z"
  }
]
```
3. Save as `backend-node/data/users.json`

**Note**: The password hashes from PHP (`password_hash`) are compatible with bcryptjs, so they should work directly.

## Old PHP Files

The old PHP backend files are still in the `backend/` directory but are no longer used. You can delete them if you want, or keep them for reference.

## Benefits of Node.js Backend

1. ✅ No PHP configuration needed
2. ✅ No cURL extension issues
3. ✅ Better integration with Next.js
4. ✅ Easier debugging
5. ✅ JSON storage is more readable than pipe-separated text
6. ✅ Single language stack (JavaScript/TypeScript)

## Troubleshooting

### Port Already in Use
If port 8000 is already in use, change `BACKEND_PORT` in `.env` or stop the old PHP server.

### Session Issues
Make sure `SESSION_SECRET` is set in `.env`. In production, use a strong random secret.

### CORS Errors
Ensure `FRONTEND_URL` in `.env` matches your frontend URL exactly.

