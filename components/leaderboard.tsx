"use client"

import { useState } from "react"

interface User {
  rank: number
  name: string
  points: number
  badges: string[]
  reportsCount: number
  resolvedCount: number
  city: string
  avatar: string
}

export default function Leaderboard() {
  const [scope, setScope] = useState<"global" | "city">("global")

  const users: User[] = [
    {
      rank: 1,
      name: "Rajesh Kumar",
      points: 850,
      badges: ["Top Reporter", "Community Hero"],
      reportsCount: 42,
      resolvedCount: 38,
      city: "Hyderabad",
      avatar: "RK",
    },
    {
      rank: 2,
      name: "Priya Singh",
      points: 720,
      badges: ["Active Citizen"],
      reportsCount: 35,
      resolvedCount: 31,
      city: "Bangalore",
      avatar: "PS",
    },
    {
      rank: 3,
      name: "Amit Patel",
      points: 650,
      badges: ["First Responder"],
      reportsCount: 28,
      resolvedCount: 25,
      city: "Mumbai",
      avatar: "AP",
    },
    {
      rank: 4,
      name: "Neha Sharma",
      points: 580,
      badges: ["Rising Star"],
      reportsCount: 22,
      resolvedCount: 19,
      city: "Delhi",
      avatar: "NS",
    },
    {
      rank: 5,
      name: "Vikram Desai",
      points: 520,
      badges: [],
      reportsCount: 18,
      resolvedCount: 16,
      city: "Pune",
      avatar: "VD",
    },
  ]

  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-100 text-yellow-700 border-yellow-300"
    if (rank === 2) return "bg-gray-100 text-gray-700 border-gray-300"
    if (rank === 3) return "bg-orange-100 text-orange-700 border-orange-300"
    return "bg-blue-50 text-blue-700 border-blue-200"
  }

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return ""
  }

  return (
    <div className="space-y-6">
      {/* Scope Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setScope("global")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            scope === "global" ? "bg-primary text-white" : "bg-surface text-foreground hover:bg-border"
          }`}
        >
          Global Leaderboard
        </button>
        <button
          onClick={() => setScope("city")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            scope === "city" ? "bg-primary text-white" : "bg-surface text-foreground hover:bg-border"
          }`}
        >
          By City
        </button>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.rank}
            className={`card-base flex items-center gap-4 border-2 transition-all hover:shadow-md ${getRankColor(user.rank)}`}
          >
            {/* Rank */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white font-bold text-lg flex-shrink-0">
              {getMedalEmoji(user.rank) || user.rank}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-foreground">{user.name}</h3>
              </div>
              <p className="text-sm text-text-muted">{user.city}</p>
            </div>

            {/* Stats */}
            <div className="hidden sm:flex gap-6 text-center">
              <div>
                <p className="text-xs text-text-muted font-semibold">Reports</p>
                <p className="font-bold text-foreground">{user.reportsCount}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted font-semibold">Resolved</p>
                <p className="font-bold text-foreground">{user.resolvedCount}</p>
              </div>
            </div>

            {/* Points */}
            <div className="text-right flex-shrink-0">
              <p className="text-2xl font-bold text-primary">{user.points}</p>
              <p className="text-xs text-text-muted">points</p>
            </div>
          </div>
        ))}
      </div>

      {/* Badges Legend */}
      <div className="card-base bg-blue-50 border-blue-200">
        <h4 className="font-semibold text-foreground mb-3">Available Badges</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            "Top Reporter",
            "Community Hero",
            "Active Citizen",
            "First Responder",
            "Rising Star",
            "Verified Expert",
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <span className="text-lg">⭐</span>
              <span className="text-sm text-foreground">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
