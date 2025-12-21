#!/bin/bash

# Development startup script
# Starts both PHP and Next.js servers

echo "Starting Stress & Anxiety Toolkit Development Servers..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed or not in PATH"
    exit 1


# Start Next.js server
echo "Starting Next.js frontend server on port 3000..."
echo ""
echo "=========================================="
echo "Servers are running:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "=========================================="
echo ""


# Start Next.js (this will block)
npm run dev


