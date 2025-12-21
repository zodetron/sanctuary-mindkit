'use client'

import { useState } from 'react'

const tips = [
  { title: 'PRACTICE GRATITUDE', content: 'Document three micro-wins. Shift focus from neural stressors to positive reinforcements.', icon: '🙏' },
  { title: 'OPTIMIZE HYDRATION', content: 'System dehydration mimics anxiety. Maintain a 3-liter baseline to stabilize cortisol.', icon: '💧' },
  { title: 'NEURAL BREAKS', content: 'Deploy the 20-20-20 protocol: every 20 mins, focus 20 feet away for 20 seconds.', icon: '⏰' },
  { title: 'BIOPHILIA EFFECT', content: '10 minutes of nature exposure reduces prefrontal cortex activity associated with rumination.', icon: '🌳' },
  { title: 'DIGITAL FASTING', content: 'Audit notification frequency. Constant dopamine spikes increase baseline anxiety.', icon: '📱' },
  { title: 'SELF-COMPASSION', content: 'Internal dialogue check: Communicate with yourself as you would a high-priority ally.', icon: '💝' },
  { title: 'SLEEP HYGIENE', content: 'Target 7-9 hours. Establish a pre-sleep "power down" routine to flush neural toxins.', icon: '😴' },
  { title: 'KINETIC ENERGY', content: 'A 600-second walk triggers endorphin release, acting as a natural stress antagonist.', icon: '🚶' },
  { title: 'DIAPHRAGMATIC BREATHING', content: 'Engage slow, controlled inhalations to force the Vagus nerve into a relaxation state.', icon: '🫁' },
  { title: 'SYSTEM BOUNDARIES', content: 'Strategic refusal of new tasks protects mental bandwidth. "No" is a complete sentence.', icon: '🛡️' },
]

export default function DailyTips() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const currentTip = tips[currentTipIndex]

  const nextTip = () => setCurrentTipIndex((prev) => (prev + 1) % tips.length)
  const prevTip = () => setCurrentTipIndex((prev) => (prev - 1 + tips.length) % tips.length)

  return (
    <div className="space-y-8">
      {/* Featured Tip Card */}
      <div className="bg-white rounded-[4rem] p-10 md:p-14 shadow-[30px_30px_60px_-15px_rgba(101,163,13,0.15)] border-4 border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
           <span className="text-[15rem] font-black">{currentTip.icon}</span>
        </div>

        <div className="relative z-10 text-center">
          <div className="text-8xl mb-8 filter drop-shadow-2xl animate-bounce-slow">
            {currentTip.icon}
          </div>
          <h3 className="text-4xl font-[1000] text-slate-900 mb-6 tracking-tighter uppercase italic leading-none">
            {currentTip.title}
          </h3>
          <p className="text-xl text-slate-500 font-bold leading-relaxed max-w-xl mx-auto italic">
            "{currentTip.content}"
          </p>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <button
          onClick={prevTip}
          className="w-full md:w-auto px-10 py-5 bg-white border-4 border-slate-900 rounded-3xl font-[1000] text-sm uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          ← Previous
        </button>
        
        <div className="bg-slate-900 px-8 py-3 rounded-full">
            <span className="text-lime-400 font-black tracking-widest text-sm uppercase">
              Tip {currentTipIndex + 1} <span className="text-slate-500 mx-2">//</span> {tips.length}
            </span>
        </div>

        <button
          onClick={nextTip}
          className="w-full md:w-auto px-10 py-5 bg-lime-500 text-slate-900 border-4 border-slate-900 rounded-3xl font-[1000] text-sm uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          Next Protocol →
        </button>
      </div>

      {/* All Tips Index */}
      <div className="mt-12">
        <h4 className="text-xs font-[1000] text-slate-400 uppercase tracking-[0.4em] mb-6 ml-2">Protocol Library Index:</h4>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {tips.map((tip, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentTipIndex(idx)}
              className={`p-4 text-left rounded-2xl font-black text-[10px] uppercase tracking-tighter transition-all flex items-center gap-3 border-2
                ${idx === currentTipIndex
                  ? 'bg-amber-400 border-amber-400 text-white shadow-lg scale-105'
                  : 'bg-white border-slate-100 text-slate-400 hover:border-lime-400 hover:text-slate-900'
                }`}
            >
              <span className="text-lg">{tip.icon}</span>
              <span className="truncate">{tip.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}