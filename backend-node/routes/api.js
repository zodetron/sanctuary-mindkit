/**
 * API Routes
 * Handles Gemini API integration and other API endpoints
 */

const express = require('express');
const router = express.Router();

// Middleware to check if user is logged in
const requireAuth = (req, res, next) => {
  if (!req.session.logged_in || !req.session.user_id) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Please log in.'
    });
  }
  next();
};

/**
 * Gemini API endpoint
 */
router.post('/gemini', requireAuth, async (req, res) => {
  try {
    const { stress_level, concern } = req.body;

    // Validate input
    if (stress_level === undefined || !concern) {
      return res.status(400).json({
        success: false,
        message: 'Stress level and concern are required'
      });
    }

    const stressLevel = parseInt(stress_level);
    if (stressLevel < 1 || stressLevel > 10) {
      return res.status(400).json({
        success: false,
        message: 'Stress level must be between 1 and 10'
      });
    }

    // Sanitize concern
    const sanitizedConcern = concern.trim().substring(0, 1000); // Limit length

    // Get API key from environment
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'EXAMPLE_KEY_123') {
      return res.status(500).json({
        success: false,
        message: 'API key not configured. Please set GEMINI_API_KEY in .env file.'
      });
    }

    // Prepare prompt
    const prompt = `You are a compassionate mental health assistant. A user is experiencing stress level ${stressLevel} out of 10. Their concern is: "${sanitizedConcern}"

Please provide:
1. Personalized, empathetic advice
2. 2-3 specific coping techniques they can use right now
3. A mindfulness suggestion
4. Simple actionable steps they can take

Keep the response concise, warm, and practical. Format it in a friendly, supportive tone.`;

    // Prepare API request
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
    
    const requestData = {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    };

    // Make request to Gemini API (using Node.js built-in fetch in Node 18+)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        success: false,
        message: errorData.error?.message || 'AI service error',
        http_code: response.status
      });
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      return res.status(500).json({
        success: false,
        message: 'Invalid response from AI service'
      });
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    res.json({
      success: true,
      advice: aiResponse
    });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to connect to AI service. Please check your internet connection and API key.'
    });
  }
});

module.exports = router;

