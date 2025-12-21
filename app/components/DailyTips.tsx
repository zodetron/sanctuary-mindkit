'use client'

import { useState } from 'react'

const tips = [
  {
    title: 'Practice Gratitude',
    content: 'Start or end your day by writing down three things you\'re grateful for. This simple practice can shift your focus from stress to positivity.',
    icon: '🙏',
  },
  {
    title: 'Stay Hydrated',
    content: 'Dehydration can increase stress and anxiety. Aim to drink at least 8 glasses of water throughout the day.',
    icon: '💧',
  },
  {
    title: 'Take Regular Breaks',
    content: 'Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds. This helps reduce eye strain and mental fatigue.',
    icon: '⏰',
  },
  {
    title: 'Connect with Nature',
    content: 'Spend at least 10 minutes outside in nature. Fresh air and natural surroundings can significantly reduce stress levels.',
    icon: '🌳',
  },
  {
    title: 'Limit Social Media',
    content: 'Set specific times for checking social media. Constant notifications and comparisons can increase anxiety.',
    icon: '📱',
  },
  {
    title: 'Practice Self-Compassion',
    content: 'Treat yourself with the same kindness you would show a friend. Remember that it\'s okay to have difficult days.',
    icon: '💝',
  },
  {
    title: 'Get Quality Sleep',
    content: 'Aim for 7-9 hours of sleep per night. Create a bedtime routine that helps you wind down and relax.',
    icon: '😴',
  },
  {
    title: 'Move Your Body',
    content: 'Even a 10-minute walk can boost your mood and reduce stress. Find an activity you enjoy and make it a regular habit.',
    icon: '🚶',
  },
  {
    title: 'Practice Deep Breathing',
    content: 'Take 5 deep breaths whenever you feel overwhelmed. Focus on slow, controlled breathing to activate your body\'s relaxation response.',
    icon: '🫁',
  },
  {
    title: 'Set Boundaries',
    content: 'Learn to say "no" when you\'re feeling overwhelmed. Setting healthy boundaries protects your mental health.',
    icon: '🛡️',
  },
]

export default function DailyTips() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)

  const currentTip = tips[currentTipIndex]

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length)
  }

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + tips.length) % tips.length)
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-primary-50 to-purple-50 p-6 rounded-lg border-2 border-primary-200">
        <div className="text-center mb-4">
          <div className="text-5xl mb-3">{currentTip.icon}</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {currentTip.title}
          </h3>
        </div>
        <p className="text-gray-700 text-center leading-relaxed">
          {currentTip.content}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={prevTip}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
        >
          ← Previous
        </button>
        
        <span className="text-sm text-gray-600">
          {currentTipIndex + 1} of {tips.length}
        </span>

        <button
          onClick={nextTip}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
        >
          Next →
        </button>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">All Tips:</h4>
        <div className="grid grid-cols-2 gap-2">
          {tips.map((tip, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentTipIndex(idx)}
              className={`p-2 text-left rounded-lg text-sm transition-colors ${
                idx === currentTipIndex
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tip.icon} {tip.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

