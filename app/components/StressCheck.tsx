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
        headers: { 'Content-Type': 'application/json' },
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
        setError(data.message || 'Analysis failed. Re-attempt required.')
      }
    } catch (err) {
      setError('Connection interrupted. Verify network status.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-10">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Stress Intensity Dial */}
        <div>
          <label className="block text-xs font-[1000] text-slate-400 uppercase tracking-[0.3em] mb-4">
            Stress Intensity Level
          </label>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <input
              type="range"
              min="1"
              max="10"
              value={stressLevel}
              onChange={(e) => setStressLevel(parseInt(e.target.value))}
              className="flex-1 w-full h-4 bg-slate-200 rounded-full appearance-none cursor-pointer accent-lime-500 hover:accent-amber-500 transition-all"
            />
            <div className="bg-slate-900 text-white w-16 h-16 flex items-center justify-center rounded-2xl shadow-[6px_6px_0px_0px_rgba(163,230,53,1)]">
              <span className="text-3xl font-black">{stressLevel}</span>
            </div>
          </div>
          <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">
            <span>&gt; Baseline</span>
            <span>&gt; Critical</span>
          </div>
        </div>

        {/* Narrative Input */}
        <div className="space-y-3">
          <label htmlFor="concern" className="block text-xs font-[1000] text-slate-400 uppercase tracking-[0.3em]">
            Detailed Narratives / Concerns
          </label>
          <textarea
            id="concern"
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            rows={4}
            className="w-full px-6 py-5 bg-white border-4 border-slate-200 rounded-[2.5rem] font-bold text-slate-800 focus:border-lime-400 focus:ring-0 outline-none transition-all placeholder:text-slate-200 text-lg shadow-inner"
            placeholder="Document your current mental state..."
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-5 rounded-[2rem] font-[1000] text-lg tracking-widest uppercase transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1
            ${loading 
              ? 'bg-slate-100 text-slate-300' 
              : 'bg-slate-900 text-white hover:bg-amber-400 hover:text-slate-900'
            }`}
        >
          {loading ? 'Analyzing Data...' : 'Execute Neural Analysis'}
        </button>
      </form>

      {/* Error Feedback */}
      {error && (
        <div className="p-6 bg-rose-50 border-l-8 border-rose-500 text-rose-700 font-bold italic animate-pulse">
          &gt;&gt; SYSTEM_ALERT: {error}
        </div>
      )}

      {/* AI Advice Output */}
      {advice && (
        <div className="relative p-10 bg-white rounded-[3.5rem] border-4 border-slate-100 shadow-[20px_20px_40px_-10px_rgba(101,163,13,0.15)] overflow-hidden">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 h-16 w-16 bg-lime-400 rounded-bl-[4rem] flex items-center justify-center pl-4 pb-4">
            <span className="text-white text-2xl font-black">AI</span>
          </div>

          <h3 className="text-sm font-black text-lime-600 uppercase tracking-[0.4em] mb-6">
            Recommended Protocol:
          </h3>
          <div className="text-slate-700 text-xl font-bold leading-relaxed whitespace-pre-wrap">
            {advice}
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-300 font-black uppercase tracking-widest">
            <span>Scan Complete</span>
            <span>Ref: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </div>
        </div>
      )}
    </div>
  )
}