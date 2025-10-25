"use client"

import { useState } from "react"

export default function UserProfile() {
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    points: 450,
    rank: 15,
    badges: ["Active Citizen", "Community Helper"],
    reportsCount: 18,
    resolvedCount: 12,
    city: "Hyderabad",
  })

  return (
    <div className="space-y-6">
      <div className="card-base">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
            <p className="text-text-muted">{user.email}</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-surface rounded-lg p-4">
            <p className="text-text-muted text-sm">Points</p>
            <p className="text-3xl font-bold text-primary">{user.points}</p>
          </div>
          <div className="bg-surface rounded-lg p-4">
            <p className="text-text-muted text-sm">Rank</p>
            <p className="text-3xl font-bold text-primary">#{user.rank}</p>
          </div>
          <div className="bg-surface rounded-lg p-4">
            <p className="text-text-muted text-sm">Reports</p>
            <p className="text-3xl font-bold text-primary">{user.reportsCount}</p>
          </div>
          <div className="bg-surface rounded-lg p-4">
            <p className="text-text-muted text-sm">Resolved</p>
            <p className="text-3xl font-bold text-primary">{user.resolvedCount}</p>
          </div>
        </div>
      </div>

      <div className="card-base">
        <h2 className="text-2xl font-bold text-foreground mb-4">Badges & Achievements</h2>
        <div className="flex flex-wrap gap-3">
          {user.badges.map((badge) => (
            <div key={badge} className="bg-accent-light text-accent px-4 py-2 rounded-lg font-semibold">
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
