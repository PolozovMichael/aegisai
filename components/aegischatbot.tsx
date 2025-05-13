'use client'

import { useState } from 'react'
import { generateSecureCode } from '@/app/actions'
import { IconLoader2 } from '@tabler/icons-react'

export default function AegisChatBot() {
  const [prompt, setPrompt] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [codeSnippet, setCodeSnippet] = useState<string>('')

  async function onSubmit() {
    try {
      setIsLoading(true)
      const result = await generateSecureCode(prompt)
      setCodeSnippet(result)
    } catch (error) {
      console.error('Error generating secure code:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl w-full mx-auto relative z-10 flex items-center space-x-4 rounded-sm flex-col bg-zinc-950/50 p-10 ring-1 ring-white/10 backdrop-blur-md">
      <h2 className="text-2xl font-medium text-zinc-800 dark:text-zinc-100 mb-6">
        AegisAI – Secure Code Generator
      </h2>

      <div className="w-full flex flex-col items-center gap-4 mb-6 ">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the code you want securely generated..."
          className="min-h-[400px] w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none "
        />
        <button
          onClick={onSubmit}
          disabled={isLoading || !prompt}
          className="no-underline w-lg group cursor-pointer relative shadow-2x rounded-full p-px text-xs font-semibold leading-6  text-white inline-block"
        >
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center justify-center z-10 rounded-full bg-zinc-950/50 py-2 px-7 ring-1 ring-white/10 ">
            <span className="text-[16px] font-medium text-center">
              {isLoading && <IconLoader2 className="w-5 h-5 animate-spin" />}
              {!isLoading && 'Generate Secure Code'}
            </span>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </button>
      </div>

      {codeSnippet && (
        <div className="mt-6 w-full max-h-[400px] overflow-auto">
          <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-2">
            Generated Secure Code:
          </h3>
          <pre className="bg-zinc-100 dark:bg-slate-950 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 overflow-x-auto text-sm text-left text-zinc-800 dark:text-zinc-100">
            <code>{codeSnippet}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
