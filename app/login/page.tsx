'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { API_ENDPOINTS } from '@/lib/api'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchParams.get('signup') === 'success') {
      setSuccess('Identity Verified. Account active.')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch(API_ENDPOINTS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server error' }))
        setError(errorData.message || `Login failed (${response.status})`)
        setLoading(false)
        return
      }

      const data = await response.json()
      if (data.success) {
        router.push('/dashboard')
      } else {
        setError(data.message || 'Access Denied. Check credentials.')
      }
    } catch (err) {
      setError('Network error. Check terminal connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#cbd5e1] bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-slate-200 via-slate-300 to-slate-400 flex items-center justify-center px-6 py-12 font-sans overflow-hidden">
      <div className="max-w-xl w-full bg-white rounded-[4rem] p-12 md:p-16 shadow-[60px_60px_100px_-20px_rgba(234,179,8,0.2),-20px_-20px_60px_rgba(255,255,255,0.8)] border-b-[16px] border-r-[16px] border-slate-100 transition-all duration-500">
        
        {/* Header Section */}
        <header className="mb-12">
          <p className="text-amber-500 font-black tracking-[0.3em] text-xs uppercase mb-4">Secure Gateway</p>
          <h1 className="text-5xl font-[1000] text-slate-900 mb-4 tracking-tighter leading-none uppercase italic">
            Welcome <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">Back.</span>
          </h1>
          <div className="h-3 w-32 bg-lime-500 rounded-full"></div>
        </header>

        {/* Status Messages */}
        {success && (
          <div className="mb-8 p-6 bg-lime-50 border-l-8 border-lime-500 text-lime-700 font-bold tracking-tight shadow-sm animate-bounce">
            ✓ SUCCESS: {success}
          </div>
        )}

        {error && (
          <div className="mb-8 p-6 bg-rose-50 border-l-8 border-rose-500 text-rose-700 font-bold italic shadow-sm">
            × ERROR: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label htmlFor="username" className="block text-sm font-black text-slate-400 uppercase tracking-widest ml-2">
              Operator ID
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              className="w-full px-6 py-5 bg-slate-50 border-4 border-slate-100 rounded-3xl font-bold text-slate-800 focus:border-amber-400 focus:bg-white outline-none transition-all placeholder:text-slate-300 text-lg shadow-inner"
              placeholder="Username"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="password" className="block text-sm font-black text-slate-400 uppercase tracking-widest ml-2">
              Access Key
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full px-6 py-5 bg-slate-50 border-4 border-slate-100 rounded-3xl font-bold text-slate-800 focus:border-lime-400 focus:bg-white outline-none transition-all placeholder:text-slate-300 text-lg shadow-inner"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-6 rounded-3xl font-[1000] text-xl tracking-widest uppercase transition-all duration-300 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 
              ${loading 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-slate-900 text-white hover:bg-amber-400 hover:text-slate-900'
              }`}
          >
            {loading ? 'Authenticating...' : 'Enter Sanctuary'}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t-4 border-slate-50 text-center space-y-4">
          <p className="text-slate-500 font-bold">
            New to the system?{' '}
            <Link href="/signup" className="text-lime-600 hover:text-amber-600 underline decoration-4 underline-offset-8 transition-all font-[900]">
              Register Now
            </Link>
          </p>

          <Link
            href="/"
            className="inline-block text-slate-400 hover:text-slate-900 font-black text-xs uppercase tracking-[0.4em] transition-colors pt-4"
          >
            ← System Home
          </Link>
        </div>
      </div>
    </div>
  )
}