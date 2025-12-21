'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_ENDPOINTS } from '@/lib/api'
import StressCheck from '../components/StressCheck'
import BreathingExercises from '../components/BreathingExercises'
import DailyTips from '../components/DailyTips'
import InstantCalm from '../components/InstantCalm'

export default function DashboardPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is logged in
    fetch(API_ENDPOINTS.checkSession, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.logged_in) {
          setUsername(data.username)
          setLoading(false)
        } else {
          router.push('/login')
        }
      })
      .catch(() => {
        router.push('/login')
      })
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch(API_ENDPOINTS.logout, {
        method: 'POST',
        credentials: 'include',
      })
      router.push('/')
    } catch (err) {
      console.error('Logout error:', err)
      router.push('/')
    }
  }

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
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {username}! 👋
              </h1>
              <p className="text-gray-600 mt-2">
                Your personal stress and anxiety management toolkit
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stress Check Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Check Your Stress Level
            </h2>
            <p className="text-gray-600 mb-4">
              Assess your current stress level and get personalized AI-powered advice.
            </p>
            <button
              onClick={() => setActiveSection(activeSection === 'stress' ? null : 'stress')}
              className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              {activeSection === 'stress' ? 'Close' : 'Start Assessment'}
            </button>
            {activeSection === 'stress' && (
              <div className="mt-6">
                <StressCheck />
              </div>
            )}
          </div>

          {/* Breathing Exercises Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Breathing Exercises
            </h2>
            <p className="text-gray-600 mb-4">
              Practice guided breathing techniques to calm your mind and body.
            </p>
            <button
              onClick={() => setActiveSection(activeSection === 'breathing' ? null : 'breathing')}
              className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              {activeSection === 'breathing' ? 'Close' : 'Start Exercise'}
            </button>
            {activeSection === 'breathing' && (
              <div className="mt-6">
                <BreathingExercises />
              </div>
            )}
          </div>

          {/* Instant Calm Advice Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Instant Calm Advice
            </h2>
            <p className="text-gray-600 mb-4">
              Get quick, actionable advice for immediate relief.
            </p>
            <button
              onClick={() => setActiveSection(activeSection === 'calm' ? null : 'calm')}
              className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              {activeSection === 'calm' ? 'Close' : 'Get Advice'}
            </button>
            {activeSection === 'calm' && (
              <div className="mt-6">
                <InstantCalm />
              </div>
            )}
          </div>

          {/* Daily Tips Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Daily Mental Health Tips
            </h2>
            <p className="text-gray-600 mb-4">
              Discover daily tips and practices for better mental health.
            </p>
            <button
              onClick={() => setActiveSection(activeSection === 'tips' ? null : 'tips')}
              className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              {activeSection === 'tips' ? 'Close' : 'View Tips'}
            </button>
            {activeSection === 'tips' && (
              <div className="mt-6">
                <DailyTips />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

