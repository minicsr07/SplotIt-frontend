"use client"

import { useState } from "react"

interface DashboardStats {
  totalIssues: number
  resolvedIssues: number
  inProgressIssues: number
  pendingIssues: number
  resolutionRate: number
}

export default function IssuesDashboard() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month")

  // Mock data
  const stats: DashboardStats = {
    totalIssues: 1247,
    resolvedIssues: 892,
    inProgressIssues: 245,
    pendingIssues: 110,
    resolutionRate: 71.5,
  }

  const categoryStats = [
    { name: "Road", count: 342, percentage: 27 },
    { name: "Lighting", count: 198, percentage: 16 },
    { name: "Water", count: 287, percentage: 23 },
    { name: "Sanitation", count: 156, percentage: 13 },
    { name: "Traffic", count: 134, percentage: 11 },
    { name: "Other", count: 130, percentage: 10 },
  ]

  const statusBreakdown = [
    { status: "Resolved", count: stats.resolvedIssues, color: "bg-green-500" },
    { status: "In Progress", count: stats.inProgressIssues, color: "bg-blue-500" },
    { status: "Pending", count: stats.pendingIssues, color: "bg-yellow-500" },
  ]

  const maxCount = Math.max(...statusBreakdown.map((s) => s.count))

  return (
    <div className="space-y-8">
      {/* Time Range Selector */}
      <div className="flex gap-2">
        {(["week", "month", "year"] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors capitalize ${
              timeRange === range ? "bg-primary text-white" : "bg-surface text-foreground hover:bg-border"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Key Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="card-base bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-blue-600 font-semibold mb-2">Total Issues</p>
          <p className="text-3xl font-bold text-blue-900">{stats.totalIssues}</p>
          <p className="text-xs text-blue-600 mt-2">+12% from last month</p>
        </div>

        <div className="card-base bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-sm text-green-600 font-semibold mb-2">Resolved</p>
          <p className="text-3xl font-bold text-green-900">{stats.resolvedIssues}</p>
          <p className="text-xs text-green-600 mt-2">{stats.resolutionRate}% resolution rate</p>
        </div>

        <div className="card-base bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <p className="text-sm text-yellow-600 font-semibold mb-2">In Progress</p>
          <p className="text-3xl font-bold text-yellow-900">{stats.inProgressIssues}</p>
          <p className="text-xs text-yellow-600 mt-2">Being worked on</p>
        </div>

        <div className="card-base bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <p className="text-sm text-orange-600 font-semibold mb-2">Pending</p>
          <p className="text-3xl font-bold text-orange-900">{stats.pendingIssues}</p>
          <p className="text-xs text-orange-600 mt-2">Awaiting review</p>
        </div>

        <div className="card-base bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <p className="text-sm text-purple-600 font-semibold mb-2">Avg Resolution</p>
          <p className="text-3xl font-bold text-purple-900">4.2d</p>
          <p className="text-xs text-purple-600 mt-2">days</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Status Breakdown */}
        <div className="card-base">
          <h3 className="text-lg font-bold text-foreground mb-6">Status Breakdown</h3>
          <div className="space-y-4">
            {statusBreakdown.map((item) => (
              <div key={item.status}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-foreground">{item.status}</span>
                  <span className="text-sm font-bold text-primary">{item.count}</span>
                </div>
                <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${item.color} transition-all`}
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="card-base">
          <h3 className="text-lg font-bold text-foreground mb-6">Issues by Category</h3>
          <div className="space-y-3">
            {categoryStats.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium text-foreground">{category.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-border rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${category.percentage}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-foreground w-12 text-right">{category.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card-base">
        <h3 className="text-lg font-bold text-foreground mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: "Issue Resolved", issue: "Pothole on Main Street", time: "2 hours ago", icon: "✓" },
            { action: "Issue Reported", issue: "Water leakage from pipe", time: "4 hours ago", icon: "+" },
            { action: "Status Updated", issue: "Street light not working", time: "6 hours ago", icon: "→" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 pb-4 border-b border-border last:border-0">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{activity.action}</p>
                <p className="text-sm text-text-muted">{activity.issue}</p>
              </div>
              <span className="text-sm text-text-muted">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
