'use client'

import { motion } from 'framer-motion'

const conceptPoints = [
  {
    title: 'Analyze',
    description:
      'AegisAI understands your code’s structure and behavior, detecting hidden security flaws.',
  },
  {
    title: 'Explain',
    description:
      'We break down vulnerabilities in plain language — no more cryptic security jargon.',
  },
  {
    title: 'Fix',
    description:
      'Context-aware code transformations eliminate risks while preserving logic.',
  },
  {
    title: 'Educate',
    description:
      'We highlight what was fixed and why — helping you write safer code in the future.',
  },
]

export const ConceptShowcase = () => {
  return (
    <section className="relative z-50 w-full bg-slate-950 py-28 flex flex-col items-center overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="text-center text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text mb-16"
      >
        How AegisAI Works
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl px-6 z-10">
        {conceptPoints.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.7, ease: 'easeOut' }}
            className="relative p-6 rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm shadow-lg"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-cyan-400 mb-2">
              {point.title}
            </h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {point.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
