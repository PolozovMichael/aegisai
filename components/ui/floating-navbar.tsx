'use client'

import React, { useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface NavItem {
  name: string
  link: string
  icon?: React.ReactNode
}

interface FloatingNavProps {
  navItems: NavItem[]
  className?: string
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  navItems,
  className,
}) => {
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current === 'number') {
      const previous = scrollYProgress.getPrevious()
      const direction = current - (previous ?? 0)

      if (scrollYProgress.get() < 0.05) {
        setVisible(false)
      } else {
        setVisible(direction < 0)
      }
    }
  })

  return (
    <AnimatePresence mode="sync">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'fixed top-10 inset-x-0 z-[5000] mx-auto flex max-w-fit items-center space-x-3 rounded-full p-px text-white shadow-2xl',
          className,
        )}
      >
        {/* Glowing background wrapper */}
        <span className="absolute inset-0 overflow-hidden rounded-full z-[-1]">
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.35)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>

        {/* Inner container with ring and background */}
        <div className="relative z-10 flex items-center space-x-4 rounded-full bg-zinc-950/50 py-2 px-6 ring-1 ring-white/10 backdrop-blur-md">
          {navItems.map((navItem, idx) => (
            <a
              key={`nav-item-${idx}`}
              href={navItem.link}
              className="flex items-center space-x-1 text-sm text-white "
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block">{navItem.name}</span>
            </a>
          ))}
          <Link
            href=""
            className="relative rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white "
          >
            <span>Login</span>
            <span className="absolute inset-x-0 bottom-0 mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
