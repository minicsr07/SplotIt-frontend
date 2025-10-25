"use client"

import { useState } from "react"

interface Issue {
  id: string
  title: string
  category: string
  status: "Pending" | "In Progress" | "Resolved" | "Rejected"
  priority: "Low" | "Medium" | "High"
  createdAt: string
  location: string
}

export default function IssuesPage() {
  const [filterStatus, setFilterStatus] = useState<string>("All")
  const [filterCategory, setFilterCategory] = useState<string>("All")

  // Mock data
  const mockIssues: Issue[] = [
    {
      id: "SPOT-20250110-0001",
      title: "Pothole on Main Street",
      category: "Road",
      status: "In Progress",
      priority: "High",
      createdAt: "2025-01-10",
      location: "Main Street, Downtown",
    },
    {
      id: "SPOT-20250109-0002",
      title: "Street light not working",
      category: "Lighting",
      status: "Resolved",
      priority: "Medium",
      createdAt: "2025-01-09",
      location: "Park Avenue",
    },
    {
      id: "SPOT-20250108-0003",
      title: "Water leakage from pipe",
      category: "Water",
      status: "Pending",
      priority: "High",
      createdAt: "2025-01-08",
      location: "Oak Street",
    },
  ]

  const filteredIssues = mockIssues.filter((issue) => {
    const statusMatch = filterStatus === "All" || issue.status === filterStatus
    const categoryMatch = filterCategory === "All" || issue.category === filterCategory
    return statusMatch && categoryMatch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-gray-100 text-gray-700"
      case "In Progress":
        return "bg-blue-100 text-blue-700"
      case "Resolved":
        return "bg-green-100 text-green-700"
      case "Rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-surface py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2">All Issues</h1>
        <p className="text-text-muted mb-8">Browse and track all reported civic issues in your community</p>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Filter by Status</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input-base">
                <option>All</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Filter by Category</label>
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="input-base">
                <option>All</option>
                <option>Road</option>
                <option>Lighting</option>
                <option>Water</option>
                <option>Sanitation</option>
                <option>Train</option>
                <option>Traffic</option>
              </select>
            </div>
          </div>
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1">{issue.title}</h3>
                    <p className="text-sm text-text-muted">ID: {issue.id}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                    <span className={`text-sm font-semibold px-3 py-1 ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-text-muted">Category</p>
                    <p className="font-semibold text-foreground">{issue.category}</p>
                  </div>
                  <div>
                    <p className="text-text-muted">Location</p>
                    <p className="font-semibold text-foreground">{issue.location}</p>
                  </div>
                  <div>
                    <p className="text-text-muted">Reported</p>
                    <p className="font-semibold text-foreground">{issue.createdAt}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-border p-12 text-center">
              <p className="text-text-muted">No issues found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
