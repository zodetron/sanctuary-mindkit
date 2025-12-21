'use client'

import { useState } from 'react'

const calmStrategies = [
  {
    title: '5-4-3-2-1 Grounding Technique',
    steps: [
      'Name 5 things you can see around you',
      'Name 4 things you can touch',
      'Name 3 things you can hear',
      'Name 2 things you can smell',
      'Name 1 thing you can taste',
    ],
    description: 'This technique helps bring your attention to the present moment and away from anxious thoughts.',
  },
  {
    title: 'Progressive Muscle Relaxation',
    steps: [
      'Tense the muscles in your toes for 5 seconds, then relax',
      'Move to your calves, tense for 5 seconds, then relax',
      'Continue up your body: thighs, stomach, hands, arms, shoulders, neck, face',
      'Feel the tension release from each muscle group',
    ],
    description: 'Systematically tense and relax muscle groups to release physical tension.',
  },
  {
    title: 'Mindful Observation',
    steps: [
      'Choose an object nearby (a pen, plant, or anything)',
      'Observe it for 2 minutes without judgment',
      'Notice its color, texture, shape, and details',
      'If your mind wanders, gently bring it back to the object',
    ],
    description: 'Focus your attention on a single object to quiet your mind.',
  },
  {
    title: 'Quick Body Scan',
    steps: [
      'Close your eyes and take 3 deep breaths',
      'Scan your body from head to toe',
      'Notice any areas of tension without judgment',
      'Breathe into those areas and imagine them relaxing',
    ],
    description: 'A quick way to check in with your body and release tension.',
  },
  {
    title: 'Positive Affirmation',
    steps: [
      'Take a deep breath',
      'Repeat to yourself: "I am safe. I am calm. This feeling will pass."',
      'Say it 3-5 times, breathing deeply each time',
      'Feel the words settle into your body',
    ],
    description: 'Use positive self-talk to shift your mindset and calm your nervous system.',
  },
]

export default function InstantCalm() {
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <p className="text-gray-600 mb-4">
        Choose a quick technique to help you feel calmer right now:
      </p>

      {selectedStrategy === null ? (
        <div className="space-y-3">
          {calmStrategies.map((strategy, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedStrategy(idx)}
              className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                {strategy.title}
              </h3>
              <p className="text-sm text-gray-600">{strategy.description}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">
              {calmStrategies[selectedStrategy].title}
            </h3>
            <button
              onClick={() => setSelectedStrategy(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ← Back
            </button>
          </div>

          <p className="text-gray-600">
            {calmStrategies[selectedStrategy].description}
          </p>

          <div className="bg-primary-50 p-6 rounded-lg border-2 border-primary-200">
            <h4 className="font-semibold text-gray-900 mb-4">Steps:</h4>
            <ol className="space-y-3">
              {calmStrategies[selectedStrategy].steps.map((step, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold mr-3">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-green-800 text-sm">
              💡 <strong>Tip:</strong> Practice this technique regularly so it becomes easier to use when you need it most.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

