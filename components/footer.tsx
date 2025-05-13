'use client'

import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="relative mt-32 w-full bg-slate-950 border-t border-white/10 px-6 py-10 text-sm text-white">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0">
        <div className="text-center sm:text-left text-white/60">
          © {new Date().getFullYear()} AegisAI. Built for safer code.
        </div>
        <div className="flex space-x-6 text-white/80">
          <Link href="/about">About</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      {/* Optional glow */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-px w-[60%] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30 blur-sm" />
    </footer>
  )
}
