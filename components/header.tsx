"use client"

import Link from "next/link"
import { useState } from "react"
import LanguageSwitcher from "./language-switcher"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="font-bold text-xl text-foreground hidden sm:inline">SpotIt</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/report" className="text-foreground hover:text-primary transition-colors">
            Report Issue
          </Link>
          <Link href="/track" className="text-foreground hover:text-primary transition-colors">
            Track
          </Link>
          <Link href="/issues" className="text-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/leaderboard" className="text-foreground hover:text-primary transition-colors">
            Leaderboard
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/auth/login" className="btn-primary text-sm">
            Sign In
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-surface rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-surface border-t border-border p-4 flex flex-col gap-4">
          <Link href="/report" className="text-foreground hover:text-primary">
            Report Issue
          </Link>
          <Link href="/track" className="text-foreground hover:text-primary">
            Track
          </Link>
          <Link href="/issues" className="text-foreground hover:text-primary">
            Dashboard
          </Link>
          <Link href="/leaderboard" className="text-foreground hover:text-primary">
            Leaderboard
          </Link>
        </nav>
      )}
    </header>
  )
}
