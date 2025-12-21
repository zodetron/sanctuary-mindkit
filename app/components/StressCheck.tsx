'use client'

import { useState } from 'react'
import { API_ENDPOINTS } from '@/lib/api'

export default function StressCheck() {
  const [stressLevel, setStressLevel] = useState(5)
  const [concern, setConcern] = useState('')
  const [loading, setLoading] = useState(false)
  const [advice, setAdvice] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setAdvice('')
    setLoading(true)

    try {
      const response = await fetch(API_ENDPOINTS.gemini, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          stress_level: stressLevel,
          concern: concern || 'General stress and anxiety',
        }),
      })

      const data = await response.json()

      if (data.success) {
        setAdvice(data.advice)
      } else {
        setError(data.message || 'Failed to get advice. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How stressed do you feel right now? (1-10)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="1"
              max="10"
              value={stressLevel}
              onChange={(e) => setStressLevel(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-2xl font-bold text-primary-600 w-12 text-center">
              {stressLevel}
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        <div>
          <label htmlFor="concern" className="block text-sm font-medium text-gray-700 mb-2">
            What is bothering you?
          </label>
          <textarea
            id="concern"
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            placeholder="Describe what's causing you stress or anxiety..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Getting Advice...' : 'Get Personalized Advice'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {advice && (
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Personalized Advice:</h3>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {advice}
          </div>
        </div>
      )}
    </div>
  )
}

