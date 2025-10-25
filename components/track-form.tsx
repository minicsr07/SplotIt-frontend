"use client"

import type React from "react"

import { useState } from "react"
import IssueTimeline from "./issue-timeline"

interface IssueData {
  id: string
  title: string
  description: string
  status: string
  category: string
  location: string
  createdAt: string
  priority: "Low" | "Medium" | "High"
  assignedTo?: string
  updates: Array<{
    status: string
    date: string
    note: string
  }>
}

export default function TrackForm() {
  const [searchInput, setSearchInput] = useState("")
  const [issue, setIssue] = useState<IssueData | null>(null)
  const [searched, setSearched] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock API response
      if (searchInput.startsWith("SPOT-")) {
        setIssue({
          id: searchInput,
          title: "Pothole on Main Street",
          description: "Large pothole causing traffic hazard and vehicle damage",
          status: "In Progress",
          category: "Road",
          location: "Main Street, Downtown",
          createdAt: "2025-01-10",
          priority: "High",
          assignedTo: "GHMC - Road Maintenance",
          updates: [
            { status: "Pending", date: "2025-01-10", note: "Issue reported by citizen" },
            { status: "Under Review", date: "2025-01-11", note: "Authority verified the issue location" },
            { status: "In Progress", date: "2025-01-12", note: "GHMC assigned - Repair work scheduled" },
          ],
        })
      } else {
        setIssue(null)
      }
      setSearched(true)
    } finally {
      setIsSearching(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700"
      case "Medium":
        return "bg-yellow-100 text-yellow-700"
      case "Low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

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

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="card-base">
        <label className="block text-sm font-semibold text-foreground mb-4">Search by Complaint ID or Email</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="input-base flex-1"
            placeholder="e.g., SPOT-20250110-0001 or your@email.com"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            disabled={isSearching}
          />
          <button type="submit" className="btn-primary" disabled={isSearching}>
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {searched && issue && (
        <div className="space-y-6">
          <div className="card-base">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-2">{issue.title}</h3>
                <p className="text-text-muted text-sm">ID: {issue.id}</p>
              </div>
              <div className="flex gap-2">
                <span className={`text-sm font-semibold px-4 py-2 rounded-full ${getStatusColor(issue.status)}`}>
                  {issue.status}
                </span>
                <span className={`text-sm font-semibold px-4 py-2 rounded-full ${getPriorityColor(issue.priority)}`}>
                  {issue.priority} Priority
                </span>
              </div>
            </div>

            <p className="text-foreground mb-6 leading-relaxed">{issue.description}</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-surface rounded-lg p-4 border border-border">
                <p className="text-xs text-text-muted font-semibold uppercase mb-1">Category</p>
                <p className="font-semibold text-foreground">{issue.category}</p>
              </div>
              <div className="bg-surface rounded-lg p-4 border border-border">
                <p className="text-xs text-text-muted font-semibold uppercase mb-1">Location</p>
                <p className="font-semibold text-foreground text-sm">{issue.location}</p>
              </div>
              <div className="bg-surface rounded-lg p-4 border border-border">
                <p className="text-xs text-text-muted font-semibold uppercase mb-1">Reported On</p>
                <p className="font-semibold text-foreground">{issue.createdAt}</p>
              </div>
              <div className="bg-surface rounded-lg p-4 border border-border">
                <p className="text-xs text-text-muted font-semibold uppercase mb-1">Assigned To</p>
                <p className="font-semibold text-foreground text-sm">{issue.assignedTo || "Pending"}</p>
              </div>
            </div>
          </div>

          <IssueTimeline updates={issue.updates} />

          <div className="card-base bg-blue-50 border border-blue-200">
            <h4 className="font-semibold text-foreground mb-4">Need Help?</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <button className="btn-secondary">Add Comment</button>
              <button className="btn-secondary">Report Issue</button>
            </div>
          </div>
        </div>
      )}

      {searched && !issue && (
        <div className="card-base bg-yellow-50 border-2 border-warning text-center py-8">
          <svg className="w-12 h-12 text-yellow-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-text-muted font-semibold">No issue found with that ID or email</p>
          <p className="text-sm text-text-muted mt-2">Please check your complaint ID and try again</p>
        </div>
      )}
    </div>
  )
}
