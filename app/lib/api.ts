/**
 * API Configuration
 * Centralized API endpoint configuration
 */

// Get API base URL from environment or use default
// Node.js backend runs on port 8000
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  signup: `${API_BASE_URL}/auth/signup`,
  login: `${API_BASE_URL}/auth/login`,
  logout: `${API_BASE_URL}/auth/logout`,
  checkSession: `${API_BASE_URL}/auth/check_session`,
  gemini: `${API_BASE_URL}/api/gemini`,
};

