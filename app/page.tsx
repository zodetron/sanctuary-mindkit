'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { API_ENDPOINTS } from '@/lib/api'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
      <div className="min-h-screen flex items-center justify-center bg-slate-200">
        <div className="h-20 w-20 border-[10px] border-white border-t-lime-500 rounded-full animate-spin shadow-2xl"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#cbd5e1] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-300 via-slate-200 to-slate-400 text-slate-900 px-6 py-20 font-sans overflow-x-hidden">
      <div className="max-w-6xl w-full mx-auto text-center">
        
        {/* Main Hero Card */}
        <div className="bg-white rounded-[4rem] p-12 md:p-20 mb-16 shadow-[50px_50px_100px_-20px_rgba(101,163,13,0.2),-20px_-20px_60px_rgba(255,255,255,0.7)] border-b-[12px] border-r-[12px] border-slate-100/50">
          <h1 className="text-6xl md:text-8xl font-[1000] tracking-[ -0.05em] text-slate-900 mb-8 leading-[0.9]">
            STRESS & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-amber-500">
              ANXIETY
            </span>
            <span className="block text-3xl md:text-4xl mt-6 font-black uppercase tracking-[0.2em] text-slate-400">
              Self-Help Toolkit
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 mb-14 max-w-3xl mx-auto font-bold leading-relaxed italic">
            "Your personal companion for managing the weight of the world. 
            Precision tools designed for mental elite performance."
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="group relative px-12 py-6 bg-slate-900 text-white rounded-3xl font-[900] text-xl tracking-tighter uppercase transition-all duration-300 hover:scale-105 shadow-[10px_10px_0px_0px_rgba(163,230,53,1)]"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="w-full sm:w-auto px-12 py-6 bg-lime-500 text-white rounded-3xl font-[900] text-xl tracking-tighter uppercase transition-all duration-300 hover:scale-105 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto px-12 py-6 bg-white border-4 border-slate-900 text-slate-900 rounded-3xl font-[900] text-xl tracking-tighter uppercase transition-all duration-300 hover:bg-slate-900 hover:text-white"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          {[
            { icon: "🧘", title: "BREATHING", desc: "Guided rhythmic resets to override your nervous system.", glow: "rgba(101,163,13,0.15)" },
            { icon: "💡", title: "AI ADVICE", desc: "High-fidelity strategies based on your current biometric state.", glow: "rgba(245,158,11,0.15)" },
            { icon: "📚", title: "DAILY TIPS", desc: "Curated habits for long-term psychological resilience.", glow: "rgba(101,163,13,0.15)" }
          ].map((feature, i) => (
            <div 
              key={i} 
              className="bg-white p-10 rounded-[3rem] border-b-8 border-slate-100 transition-all duration-500 hover:-translate-y-4 shadow-[20px_20px_50px_-10px_rgba(0,0,0,0.1)] hover:shadow-[30px_30px_60px_-10px_var(--glow)]"
              style={{ '--glow': feature.glow } as React.CSSProperties}
            >
              <div className="text-6xl mb-6 filter drop-shadow-lg">{feature.icon}</div>
              <h3 className="text-2xl font-[1000] mb-4 tracking-tighter uppercase text-slate-900">{feature.title}</h3>
              <p className="text-slate-500 font-bold leading-snug">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* System Footer */}
        <div className="mt-20 opacity-30 font-black tracking-[0.5em] text-xs uppercase">
          Ver 4.0.2 // Neural Interface Enabled
        </div>
      </div>
    </main>
  )
}