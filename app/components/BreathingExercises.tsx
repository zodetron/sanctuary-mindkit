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
    name: '4-7-8 METHOD',
    description: 'Neural override for deep relaxation and sleep readiness.',
    steps: ['Exhale through mouth', 'Inhale nose (4s)', 'Hold (7s)', 'Exhale mouth (8s)', 'Repeat 4 cycles'],
    inhale: 4, hold: 7, exhale: 8, holdAfter: 0,
  },
  box: {
    name: 'BOX BREATHING',
    description: 'Tactical composure protocol used by elite operators.',
    steps: ['Inhale (4s)', 'Hold (4s)', 'Exhale (4s)', 'Hold (4s)', 'Repeat 6 cycles'],
    inhale: 4, hold: 4, exhale: 4, holdAfter: 4,
  },
  calm: {
    name: 'CALM RHYTHM',
    description: 'General baseline stabilization for daily stress.',
    steps: ['Slow Inhale (5s)', 'Slow Exhale (5s)', 'Maintain focus', 'Repeat 10 cycles'],
    inhale: 5, hold: 0, exhale: 5, holdAfter: 0,
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
      const phases: { phase: typeof currentPhase; duration: number }[] = [
        { phase: 'inhale', duration: exercise.inhale },
        { phase: 'hold', duration: exercise.hold },
        { phase: 'exhale', duration: exercise.exhale },
        { phase: 'holdAfter', duration: exercise.holdAfter },
      ].filter(p => p.duration > 0)

      let phaseIndex = 0

      const startPhase = () => {
        if (!isActive) return
        const current = phases[phaseIndex]
        setCurrentPhase(current.phase)
        setCountdown(current.duration)
        
        let timeLeft = current.duration
        timer = setInterval(() => {
          timeLeft--
          setCountdown(timeLeft)
          if (timeLeft <= 0) {
            clearInterval(timer)
            phaseIndex++
            if (phaseIndex >= phases.length) {
              setCycle(prev => prev + 1)
              runCycle()
            } else {
              startPhase()
            }
          }
        }, 1000)
      }
      startPhase()
    }

    runCycle()
    return () => clearInterval(timer)
  }, [isActive, exercise])

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'inhale': return 'INHALING'
      case 'hold': return 'HOLDING'
      case 'exhale': return 'EXHALING'
      case 'holdAfter': return 'SUSPEND'
      default: return ''
    }
  }

  const getVisualState = () => {
    if (currentPhase === 'inhale') return 'scale-[1.3] shadow-[0_0_80px_rgba(163,230,53,0.4)] bg-lime-400'
    if (currentPhase === 'exhale') return 'scale-[0.8] shadow-none bg-amber-400'
    return 'scale-100 shadow-[0_0_40px_rgba(0,0,0,0.1)] bg-slate-900'
  }

  if (!selectedExercise) {
    return (
      <div className="space-y-6">
        <p className="text-xs font-[1000] text-slate-400 uppercase tracking-[0.3em] mb-4">Select Respiratory Protocol</p>
        <div className="space-y-4">
          {Object.entries(exercises).map(([key, ex]) => (
            <button
              key={key}
              onClick={() => setSelectedExercise(key as ExerciseType)}
              className="w-full p-8 text-left bg-white border-4 border-slate-100 rounded-[2.5rem] hover:border-lime-400 transition-all shadow-xl group"
            >
              <h3 className="text-2xl font-[1000] text-slate-900 uppercase tracking-tighter">{ex.name}</h3>
              <p className="text-sm text-slate-500 font-bold italic mt-2 group-hover:text-slate-800 transition-colors">{ex.description}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-start">
        <header>
          <h3 className="text-3xl font-[1000] text-slate-900 uppercase tracking-tighter italic">{exercise.name}</h3>
          <div className="h-2 w-16 bg-lime-500 rounded-full mt-2"></div>
        </header>
        <button
          onClick={() => { setIsActive(false); setSelectedExercise(null); }}
          className="text-xs font-black text-slate-400 hover:text-rose-500 uppercase tracking-widest transition-colors"
        >
          ← Abort Session
        </button>
      </div>

      {!isActive ? (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-50 p-8 rounded-[3rem] border-4 border-white shadow-inner">
            <h4 className="text-xs font-[1000] text-slate-400 uppercase tracking-[0.4em] mb-6">Sequence Steps:</h4>
            <ul className="space-y-3">
              {exercise.steps.map((step, idx) => (
                <li key={idx} className="text-lg font-bold text-slate-700 flex items-center gap-4">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span> {step}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => { setIsActive(true); setCycle(0); }}
            className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-[1000] text-xl uppercase tracking-widest shadow-[10px_10px_0px_0px_rgba(163,230,53,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Initiate Sequence
          </button>
        </div>
      ) : (
        <div className="text-center space-y-12 py-10">
          <div className="flex justify-center items-center h-64">
            <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-[3000ms] ease-in-out relative ${getVisualState()}`}>
              <div className="text-center z-10">
                <div className="text-6xl font-[1000] text-white drop-shadow-md">
                  {countdown}
                </div>
                <div className="text-[10px] text-white font-black tracking-[0.3em] uppercase opacity-80">
                  {getPhaseText()}
                </div>
              </div>
              {/* Pulsing ring */}
              <div className="absolute inset-0 rounded-full border-8 border-white/20 animate-ping"></div>
            </div>
          </div>
          
          <div className="inline-block bg-slate-900 text-lime-400 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-lg">
            Current Cycle: {cycle + 1}
          </div>

          <div>
            <button
              onClick={() => { setIsActive(false); setCycle(0); }}
              className="px-10 py-4 bg-white border-4 border-rose-500 text-rose-500 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-rose-500 hover:text-white transition-all"
            >
              Terminate Session
            </button>
          </div>
        </div>
      )}
    </div>
  )
}