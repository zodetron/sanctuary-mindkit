'use client'

import { useState, useEffect } from 'react'

type ExerciseType = '478' | 'box' | 'calm' | null

interface Exercise {
  name: string
  description: string
  steps: string[]
  inhale: number
  hold: number
  exhale: number
  holdAfter: number
}

const exercises: Record<string, Exercise> = {
  '478': {
    name: '4-7-8 Breathing',
    description: 'A calming technique that helps reduce anxiety and promote sleep.',
    steps: [
      'Exhale completely through your mouth',
      'Inhale through your nose for 4 counts',
      'Hold your breath for 7 counts',
      'Exhale through your mouth for 8 counts',
      'Repeat 4-8 times'
    ],
    inhale: 4,
    hold: 7,
    exhale: 8,
    holdAfter: 0,
  },
  box: {
    name: 'Box Breathing',
    description: 'A simple technique used by Navy SEALs to stay calm under pressure.',
    steps: [
      'Inhale through your nose for 4 counts',
      'Hold your breath for 4 counts',
      'Exhale through your mouth for 4 counts',
      'Hold your breath for 4 counts',
      'Repeat 4-6 times'
    ],
    inhale: 4,
    hold: 4,
    exhale: 4,
    holdAfter: 4,
  },
  calm: {
    name: 'Calm Breathing',
    description: 'A gentle breathing exercise for everyday stress relief.',
    steps: [
      'Inhale slowly through your nose for 5 counts',
      'Exhale slowly through your mouth for 5 counts',
      'Focus on the rhythm of your breath',
      'Repeat 5-10 times'
    ],
    inhale: 5,
    hold: 0,
    exhale: 5,
    holdAfter: 0,
  },
}

export default function BreathingExercises() {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType>(null)
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'holdAfter'>('inhale')
  const [countdown, setCountdown] = useState(0)
  const [cycle, setCycle] = useState(0)

  const exercise = selectedExercise ? exercises[selectedExercise] : null

  useEffect(() => {
    if (!isActive || !exercise) return

    let timer: NodeJS.Timeout

    const runCycle = () => {
      // Inhale phase
      setCurrentPhase('inhale')
      setCountdown(exercise.inhale)
      let timeLeft = exercise.inhale

      timer = setInterval(() => {
        timeLeft--
        setCountdown(timeLeft)
        if (timeLeft <= 0) {
          clearInterval(timer)
          
          // Hold phase (if applicable)
          if (exercise.hold > 0) {
            setCurrentPhase('hold')
            setCountdown(exercise.hold)
            timeLeft = exercise.hold
            
            timer = setInterval(() => {
              timeLeft--
              setCountdown(timeLeft)
              if (timeLeft <= 0) {
                clearInterval(timer)
                
                // Exhale phase
                setCurrentPhase('exhale')
                setCountdown(exercise.exhale)
                timeLeft = exercise.exhale
                
                timer = setInterval(() => {
                  timeLeft--
                  setCountdown(timeLeft)
                  if (timeLeft <= 0) {
                    clearInterval(timer)
                    
                    // Hold after exhale (if applicable)
                    if (exercise.holdAfter > 0) {
                      setCurrentPhase('holdAfter')
                      setCountdown(exercise.holdAfter)
                      timeLeft = exercise.holdAfter
                      
                      timer = setInterval(() => {
                        timeLeft--
                        setCountdown(timeLeft)
                        if (timeLeft <= 0) {
                          clearInterval(timer)
                          setCycle(prev => prev + 1)
                          runCycle()
                        }
                      }, 1000)
                    } else {
                      setCycle(prev => prev + 1)
                      runCycle()
                    }
                  }
                }, 1000)
              }
            }, 1000)
          } else {
            // No hold, go straight to exhale
            setCurrentPhase('exhale')
            setCountdown(exercise.exhale)
            timeLeft = exercise.exhale
            
            timer = setInterval(() => {
              timeLeft--
              setCountdown(timeLeft)
              if (timeLeft <= 0) {
                clearInterval(timer)
                setCycle(prev => prev + 1)
                runCycle()
              }
            }, 1000)
          }
        }
      }, 1000)
    }

    runCycle()

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isActive, exercise])

  const handleStart = () => {
    if (!selectedExercise) return
    setIsActive(true)
    setCycle(0)
  }

  const handleStop = () => {
    setIsActive(false)
    setCurrentPhase('inhale')
    setCountdown(0)
    setCycle(0)
  }

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'Breathe In'
      case 'hold':
        return 'Hold'
      case 'exhale':
        return 'Breathe Out'
      case 'holdAfter':
        return 'Hold'
      default:
        return ''
    }
  }

  const getCircleSize = () => {
    if (currentPhase === 'inhale') return 'scale-110'
    if (currentPhase === 'exhale') return 'scale-90'
    return 'scale-100'
  }

  if (!selectedExercise) {
    return (
      <div className="space-y-4">
        <p className="text-gray-600 mb-4">Choose a breathing exercise to begin:</p>
        <div className="space-y-3">
          {Object.entries(exercises).map(([key, ex]) => (
            <button
              key={key}
              onClick={() => setSelectedExercise(key as ExerciseType)}
              className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900">{ex.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{ex.description}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{exercise.name}</h3>
          <p className="text-sm text-gray-600">{exercise.description}</p>
        </div>
        <button
          onClick={() => {
            handleStop()
            setSelectedExercise(null)
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          ← Back
        </button>
      </div>

      {!isActive ? (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Instructions:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {exercise.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleStart}
            className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Start Exercise
          </button>
        </div>
      ) : (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div
              className={`w-48 h-48 rounded-full bg-primary-200 flex items-center justify-center transition-transform duration-1000 ${getCircleSize()}`}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-700 mb-2">
                  {countdown}
                </div>
                <div className="text-lg text-primary-600 font-semibold">
                  {getPhaseText()}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-gray-600">
            Cycle: {cycle + 1}
          </div>

          <button
            onClick={handleStop}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
          >
            Stop Exercise
          </button>
        </div>
      )}
    </div>
  )
}

