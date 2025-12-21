'use client'

import { useState } from 'react'

const calmStrategies = [
  {
    id: 'GRND',
    title: '5-4-3-2-1 GROUNDING',
    steps: [
      'Identify 5 visual objects in your field of view',
      'Identify 4 physical sensations you can touch',
      'Identify 3 distinct sounds in your environment',
      'Identify 2 aromas or scents currently present',
      'Identify 1 flavor or lingering taste',
    ],
    description: 'Bypasses internal anxiety loops by forcing the brain to process external sensory data.',
  },
  {
    id: 'PMR',
    title: 'MUSCLE RELAXATION',
    steps: [
      'Tense the muscles in your toes for 5 seconds, then release',
      'Tense your calves for 5 seconds, then release',
      'Proceed through thighs, core, hands, and shoulders',
      'Finally, tense and release your neck and facial muscles',
    ],
    description: 'Systematic physiological reset to discharge accumulated somatic tension.',
  },
  {
    id: 'OBSV',
    title: 'MINDFUL OBSERVATION',
    steps: [
      'Select a single physical object nearby',
      'Observe it for 120 seconds with absolute focus',
      'Map its texture, light refraction, and geometric shape',
      'Gently redirect your focus if the mind drifts',
    ],
    description: 'Quiets the "Default Mode Network" by narrowing focus to a single point of reality.',
  },
  {
    id: 'SCAN',
    title: 'RAPID BODY SCAN',
    steps: [
      'Close eyes and execute 3 controlled deep breaths',
      'Mentally scan from the crown of the head to the soles',
      'Locate pockets of tension without emotional judgment',
      'Direct your breath into those specific zones',
    ],
    description: 'Quick internal check-in to identify and neutralize physical stress markers.',
  },
  {
    id: 'AFFM',
    title: 'POSITIVE AFFIRMATION',
    steps: [
      'Inhale deeply for 4 seconds',
      'State clearly: "I am safe. I am calm. This is temporary."',
      'Repeat the sequence 5 times with rhythmic breathing',
      'Internalize the weight and truth of the words',
    ],
    description: 'Recovers cognitive control by replacing fear-based scripts with safe reality.',
  },
]

export default function InstantCalm() {
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null)

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-10 w-2 bg-amber-500 rounded-full"></div>
        <p className="text-sm font-[1000] text-slate-400 uppercase tracking-[0.3em]">
          Emergency Override Protocols
        </p>
      </div>

      {selectedStrategy === null ? (
        <div className="grid grid-cols-1 gap-6">
          {calmStrategies.map((strategy, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedStrategy(idx)}
              className="group w-full p-8 text-left bg-white border-4 border-slate-100 rounded-[2.5rem] transition-all duration-300 hover:border-lime-400 shadow-[10px_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[15px_15px_40px_-10px_rgba(101,163,13,0.2)] hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-[1000] text-slate-900 tracking-tighter uppercase">
                  {strategy.title}
                </h3>
                <span className="text-[10px] font-black text-slate-300 tracking-widest">{strategy.id}</span>
              </div>
              <p className="text-slate-500 font-bold italic text-sm group-hover:text-slate-700 transition-colors">
                "{strategy.description}"
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center bg-slate-50 p-6 rounded-[2rem] border-4 border-white shadow-inner">
            <div>
              <h3 className="text-3xl font-[1000] text-slate-900 tracking-tighter uppercase leading-none">
                {calmStrategies[selectedStrategy].title}
              </h3>
              <p className="mt-2 text-[10px] font-black text-lime-600 uppercase tracking-widest">Active Protocol</p>
            </div>
            <button
              onClick={() => setSelectedStrategy(null)}
              className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-500 transition-all shadow-lg active:scale-95"
            >
              ← Back
            </button>
          </div>

          <div className="bg-white p-10 rounded-[3.5rem] border-4 border-slate-100 shadow-[30px_30px_60px_-15px_rgba(101,163,13,0.15)] relative overflow-hidden">
             {/* Decorative numeric guide */}
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <span className="text-9xl font-black italic">{selectedStrategy + 1}</span>
             </div>

            <h4 className="text-xs font-[1000] text-slate-400 uppercase tracking-[0.4em] mb-10 border-b border-slate-100 pb-4">
              Execution Steps:
            </h4>
            
            <ol className="space-y-6 relative z-10">
              {calmStrategies[selectedStrategy].steps.map((step, idx) => (
                <li key={idx} className="flex items-center group">
                  <span className="flex-shrink-0 w-12 h-12 bg-slate-900 text-lime-400 rounded-2xl flex items-center justify-center text-xl font-black mr-6 shadow-[5px_5px_0px_0px_rgba(163,230,53,0.3)] group-hover:bg-lime-500 group-hover:text-slate-900 transition-all">
                    {idx + 1}
                  </span>
                  <span className="text-lg font-bold text-slate-700 tracking-tight leading-snug">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-amber-50 p-8 rounded-[2.5rem] border-4 border-white shadow-lg flex gap-6 items-center">
            <div className="text-4xl">💡</div>
            <p className="text-amber-900 text-sm font-bold italic leading-relaxed">
              <strong>OPERATOR TIP:</strong> Frequent repetition of this protocol builds neural familiarity, making it 40% more effective during high-stress triggers.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}