"use client"

import { useState } from "react"

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState("en")

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="px-3 py-2 rounded-lg border border-border bg-white text-foreground text-sm font-semibold hover:bg-surface transition-colors"
    >
      <option value="en">English</option>
      <option value="te">తెలుగు</option>
    </select>
  )
}
