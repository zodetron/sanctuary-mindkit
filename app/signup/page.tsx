'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { API_ENDPOINTS } from '@/lib/api'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(API_ENDPOINTS.signup, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/login?signup=success')
      } else {
        setError(data.message || 'Signup failed. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#cbd5e1] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-200 via-slate-300 to-slate-400 flex items-center justify-center px-6 py-12 font-sans">
      <div className="max-w-xl w-full bg-white rounded-[4rem] p-12 md:p-16 shadow-[60px_60px_100px_-20px_rgba(101,163,13,0.25),-20px_-20px_60px_rgba(255,255,255,0.8)] border-b-[16px] border-r-[16px] border-slate-100 transition-transform duration-500 hover:scale-[1.01]">
        
        {/* Editorial Heading */}
        <header className="mb-12">
          <p className="text-lime-600 font-black tracking-[0.3em] text-xs uppercase mb-4">New Operator Registration</p>
          <h1 className="text-5xl font-[1000] text-slate-900 mb-4 tracking-tighter leading-none uppercase">
            Create <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-lime-500">Account.</span>
          </h1>
          <div className="h-2 w-20 bg-slate-900 rounded-full"></div>
        </header>

        {error && (
          <div className="mb-8 p-6 bg-rose-50 border-l-8 border-rose-500 text-rose-700 font-bold italic shadow-sm">
            &gt; ERROR: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label htmlFor="username" className="block text-sm font-black text-slate-400 uppercase tracking-widest ml-2">
              Identity / Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              minLength={3}
              className="w-full px-6 py-5 bg-slate-50 border-4 border-slate-100 rounded-3xl font-bold text-slate-800 focus:border-lime-400 focus:bg-white outline-none transition-all placeholder:text-slate-300 text-lg shadow-inner"
              placeholder="Choose your handle"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="password" className="block text-sm font-black text-slate-400 uppercase tracking-widest ml-2">
              Security Protocol / Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
              className="w-full px-6 py-5 bg-slate-50 border-4 border-slate-100 rounded-3xl font-bold text-slate-800 focus:border-amber-400 focus:bg-white outline-none transition-all placeholder:text-slate-300 text-lg shadow-inner"
              placeholder="Min. 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-6 rounded-3xl font-[1000] text-xl tracking-widest uppercase transition-all duration-300 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 
              ${loading 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-slate-900 text-white hover:bg-lime-500 hover:text-slate-900'
              }`}
          >
            {loading ? 'Initializing...' : 'Confirm Registration'}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t-4 border-slate-50 flex flex-col gap-4 text-center">
          <p className="text-slate-500 font-bold">
            Already registered?{' '}
            <Link href="/login" className="text-amber-600 hover:text-lime-600 underline decoration-4 underline-offset-4 transition-colors">
              Login Here
            </Link>
          </p>

          <Link
            href="/"
            className="text-slate-400 hover:text-slate-900 font-black text-xs uppercase tracking-[0.3em] transition-colors"
          >
            ← System Home
          </Link>
        </div>
      </div>
    </div>
  )
}