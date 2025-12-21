'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { API_ENDPOINTS } from '@/lib/api'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    fetch(API_ENDPOINTS.checkSession, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.logged_in || false)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Stress & Anxiety
          <span className="block text-primary-600 mt-2">Self-Help Toolkit</span>
        </h1>
        
        <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
          Your personal companion for managing stress and anxiety. 
          Get personalized advice, practice breathing exercises, and discover 
          daily tips for better mental health.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/signup"
                className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">🧘</div>
            <h3 className="text-xl font-semibold mb-2">Breathing Exercises</h3>
            <p className="text-gray-600">
              Guided breathing techniques to help you calm down and reduce anxiety.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Advice</h3>
            <p className="text-gray-600">
              Get personalized coping strategies based on your current stress level.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Daily Tips</h3>
            <p className="text-gray-600">
              Discover daily mental health tips and mindfulness practices.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

