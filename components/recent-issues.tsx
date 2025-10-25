"use client"

import { useState, useEffect } from "react"

interface Issue {
  id: string
  title: string
  category: string
  status: string
  location: string
  resolvedAt?: string
}

export default function RecentIssues() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with API call
    const mockIssues: Issue[] = [
      {
        id: "SPOT-20250101-0001",
        title: "Pothole on Main Street",
        category: "Road",
        status: "Resolved",
        location: "Downtown",
        resolvedAt: "2025-01-15",
      },
      {
        id: "SPOT-20250102-0002",
        title: "Broken Street Light",
        category: "Lighting",
        status: "Resolved",
        location: "Park Avenue",
        resolvedAt: "2025-01-14",
      },
      {
        id: "SPOT-20250103-0003",
        title: "Water Leak",
        category: "Water",
        status: "Resolved",
        location: "Residential Area",
        resolvedAt: "2025-01-13",
      },
    ]
    setIssues(mockIssues)
    setLoading(false)
  }, [])

  if (loading) return <div className="text-center py-12">Loading...</div>

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-12">Recently Resolved Issues</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <div key={issue.id} className="card-base hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full">
                  {issue.category}
                </span>
                <span className="text-sm font-semibold text-success bg-green-50 px-3 py-1 rounded-full">
                  {issue.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{issue.title}</h3>
              <p className="text-text-muted text-sm mb-4">{issue.location}</p>
              <p className="text-xs text-text-muted">ID: {issue.id}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
