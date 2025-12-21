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
    fetch(API_ENDPOINTS.checkSession, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.logged_in) {
          setUsername(data.username)
          setLoading(false)
        } else { router.push('/login') }
      })
      .catch(() => { router.push('/login') })
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch(API_ENDPOINTS.logout, { method: 'POST', credentials: 'include' })
      router.push('/')
    } catch (err) { router.push('/') }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 border-[12px] border-slate-800 border-t-amber-400 rounded-full animate-spin"></div>
          <h2 className="mt-8 text-white font-black text-2xl tracking-tighter uppercase">Initializing...</h2>
        </div>
      </div>
    )
  }

  const sections = [
    { id: 'stress', title: 'STRESS CHECK', desc: 'Advanced AI analysis of your neural state.', component: <StressCheck /> },
    { id: 'breathing', title: 'BREATH WORK', desc: 'Rhythmic patterns to reset your nervous system.', component: <BreathingExercises /> },
    { id: 'calm', title: 'INSTANT CALM', desc: 'Emergency protocols for immediate tranquility.', component: <InstantCalm /> },
    { id: 'tips', title: 'DAILY GROWTH', desc: 'High-impact habits for mental elite performance.', component: <DailyTips /> },
  ]

  return (
    <div className="min-h-screen bg-[#cbd5e1] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-300 via-slate-200 to-slate-400 text-slate-900 px-8 py-20 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Massive 3D Header */}
        <header className="bg-white rounded-[3rem] p-12 mb-20 flex flex-col lg:flex-row justify-between items-center gap-8 shadow-[40px_40px_80px_-20px_rgba(101,163,13,0.2),-20px_-20px_60px_rgba(255,255,255,0.8)] border-b-8 border-r-8 border-slate-100">
          <div className="text-center lg:text-left">
            <p className="text-lime-600 font-black tracking-[0.4em] text-sm mb-4 uppercase">System Status: Active</p>
            <h1 className="text-6xl md:text-7xl font-[900] tracking-tight text-slate-900 leading-none">
              Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-lime-500">{username}.</span>
            </h1>
          </div>
          <button 
            onClick={handleLogout} 
            className="group relative px-12 py-5 bg-slate-900 text-white overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-slate-400"
          >
            <span className="relative z-10 font-black text-lg tracking-widest uppercase">Logout</span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </header>

        {/* Dashboard Grid with Thick Typography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {sections.map((sec) => (
            <div 
              key={sec.id} 
              className={`bg-white rounded-[4rem] p-12 flex flex-col transition-all duration-500 
                ${activeSection === sec.id 
                  ? 'shadow-[60px_60px_100px_-20px_rgba(163,230,53,0.3)] scale-[1.03] border-t-4 border-lime-400' 
                  : 'shadow-[30px_30px_70px_-10px_rgba(101,163,13,0.2),-10px_-10px_50px_rgba(255,255,255,0.5)] hover:shadow-[50px_50px_90px_-10px_rgba(234,179,8,0.25)] hover:-translate-y-4'
                }`}
            >
              <div className="mb-10">
                <h2 className="text-4xl font-[1000] text-slate-900 mb-4 tracking-tighter uppercase leading-none">
                  {sec.title}
                </h2>
                <div className="h-3 w-24 bg-gradient-to-r from-lime-400 to-amber-400 rounded-full mb-6"></div>
                <p className="text-xl text-slate-500 font-bold leading-snug italic">
                  "{sec.desc}"
                </p>
              </div>
              
              <button
                onClick={() => setActiveSection(activeSection === sec.id ? null : sec.id)}
                className={`mt-auto w-full py-6 rounded-3xl font-[900] text-xl tracking-tighter uppercase transition-all duration-500 border-4
                  ${activeSection === sec.id 
                    ? 'bg-amber-400 border-amber-400 text-white shadow-inner scale-95' 
                    : 'bg-white border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1'
                  }`}
              >
                {activeSection === sec.id ? 'Exit Module' : 'Open Module'}
              </button>

              {/* Heavyweight Expansion Content */}
              <div className={`transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) overflow-hidden ${
                activeSection === sec.id ? 'max-h-[1200px] mt-12 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="bg-slate-100/80 rounded-[3rem] p-10 border-4 border-white shadow-inner">
                  <div className="font-bold text-slate-800">
                    {sec.component}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}