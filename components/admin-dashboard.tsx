"use client"

import { useState } from "react"
import { ProtectedRoute } from "./protected-route"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

interface Issue {
  id: string
  title: string
  category: string
  status: "Pending" | "In Progress" | "Resolved" | "Rejected"
  priority: "Low" | "Medium" | "High"
  authority: string
  date: string
  reporter: string
  description: string
}

interface User {
  id: string
  name: string
  email: string
  role: "citizen" | "admin"
  reportsCount: number
  joinDate: string
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"overview" | "issues" | "users" | "settings">("overview")
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null)
  const [issueStatusFilter, setIssueStatusFilter] = useState<string>("All")

  // Mock data
  const issues: Issue[] = [
    {
      id: "SPOT-20250115-0001",
      title: "Pothole on Main Street",
      category: "Road",
      status: "Pending",
      priority: "High",
      authority: "GHMC",
      date: "2025-01-15",
      reporter: "John Doe",
      description: "Large pothole causing traffic hazard",
    },
    {
      id: "SPOT-20250114-0002",
      title: "Broken Street Light",
      category: "Lighting",
      status: "In Progress",
      priority: "Medium",
      authority: "Traffic Dept",
      date: "2025-01-14",
      reporter: "Jane Smith",
      description: "Street light not functioning",
    },
    {
      id: "SPOT-20250113-0003",
      title: "Water Leakage",
      category: "Water",
      status: "Resolved",
      priority: "High",
      authority: "Water Board",
      date: "2025-01-13",
      reporter: "Mike Johnson",
      description: "Water pipe leaking from main line",
    },
  ]

  const users: User[] = [
    {
      id: "user_1",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      role: "citizen",
      reportsCount: 42,
      joinDate: "2024-06-15",
    },
    {
      id: "user_2",
      name: "Priya Singh",
      email: "priya@example.com",
      role: "citizen",
      reportsCount: 35,
      joinDate: "2024-07-20",
    },
    {
      id: "user_3",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      reportsCount: 0,
      joinDate: "2024-01-01",
    },
  ]

  const stats = {
    totalIssues: issues.length,
    pending: issues.filter((i) => i.status === "Pending").length,
    inProgress: issues.filter((i) => i.status === "In Progress").length,
    resolved: issues.filter((i) => i.status === "Resolved").length,
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.reportsCount > 0).length,
  }

  const filteredIssues = issueStatusFilter === "All" ? issues : issues.filter((i) => i.status === issueStatusFilter)

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

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* Header */}
        <div className="card-base flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-text-muted">Welcome, {user?.name}</p>
          </div>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          {(["overview", "issues", "users", "settings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold capitalize transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-text-muted hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="card-base bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <p className="text-sm text-blue-600 font-semibold mb-2">Total Issues</p>
                <p className="text-3xl font-bold text-blue-900">{stats.totalIssues}</p>
              </div>
              <div className="card-base bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                <p className="text-sm text-gray-600 font-semibold mb-2">Pending</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
              </div>
              <div className="card-base bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <p className="text-sm text-yellow-600 font-semibold mb-2">In Progress</p>
                <p className="text-3xl font-bold text-yellow-900">{stats.inProgress}</p>
              </div>
              <div className="card-base bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <p className="text-sm text-green-600 font-semibold mb-2">Resolved</p>
                <p className="text-3xl font-bold text-green-900">{stats.resolved}</p>
              </div>
              <div className="card-base bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <p className="text-sm text-purple-600 font-semibold mb-2">Total Users</p>
                <p className="text-3xl font-bold text-purple-900">{stats.totalUsers}</p>
              </div>
              <div className="card-base bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
                <p className="text-sm text-pink-600 font-semibold mb-2">Active Users</p>
                <p className="text-3xl font-bold text-pink-900">{stats.activeUsers}</p>
              </div>
            </div>

            {/* Recent Issues */}
            <div className="card-base">
              <h2 className="text-xl font-bold text-foreground mb-4">Recent Issues</h2>
              <div className="space-y-3">
                {issues.slice(0, 5).map((issue) => (
                  <div
                    key={issue.id}
                    className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{issue.title}</p>
                      <p className="text-sm text-text-muted">{issue.id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </span>
                      <span className={`text-sm font-semibold ${getPriorityColor(issue.priority)}`}>
                        {issue.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Issues Tab */}
        {activeTab === "issues" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="card-base">
                <label className="block text-sm font-semibold text-foreground mb-2">Filter by Status</label>
                <select
                  value={issueStatusFilter}
                  onChange={(e) => setIssueStatusFilter(e.target.value)}
                  className="input-base"
                >
                  <option>All</option>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Rejected</option>
                </select>
              </div>

              <div className="card-base">
                <h2 className="text-xl font-bold text-foreground mb-4">Issues List</h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredIssues.map((issue) => (
                    <button
                      key={issue.id}
                      onClick={() => setSelectedIssue(issue)}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        selectedIssue?.id === issue.id
                          ? "bg-blue-50 border-primary"
                          : "bg-surface border-border hover:bg-blue-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{issue.title}</p>
                          <p className="text-sm text-text-muted">{issue.id}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(issue.status)}`}>
                          {issue.status}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Issue Details */}
            {selectedIssue && (
              <div className="card-base">
                <h2 className="text-xl font-bold text-foreground mb-4">Issue Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-text-muted font-semibold">Title</p>
                    <p className="font-semibold text-foreground">{selectedIssue.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted font-semibold">Description</p>
                    <p className="text-foreground text-sm">{selectedIssue.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted font-semibold">Category</p>
                    <p className="font-semibold text-foreground">{selectedIssue.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted font-semibold">Reporter</p>
                    <p className="font-semibold text-foreground">{selectedIssue.reporter}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted font-semibold">Authority</p>
                    <select className="input-base text-sm">
                      <option>{selectedIssue.authority}</option>
                      <option>GHMC</option>
                      <option>IRCTC</option>
                      <option>Traffic Dept</option>
                      <option>Water Board</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted font-semibold">Status</p>
                    <select className="input-base text-sm">
                      <option>{selectedIssue.status}</option>
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                  <button className="btn-primary w-full">Update Issue</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="card-base">
            <h2 className="text-xl font-bold text-foreground mb-4">User Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Reports</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Joined</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-border hover:bg-surface transition-colors">
                      <td className="py-3 px-4 text-foreground">{u.name}</td>
                      <td className="py-3 px-4 text-text-muted text-sm">{u.email}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            u.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-foreground">{u.reportsCount}</td>
                      <td className="py-3 px-4 text-text-muted text-sm">{u.joinDate}</td>
                      <td className="py-3 px-4">
                        <button className="text-primary hover:underline text-sm font-semibold">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="card-base">
            <h2 className="text-xl font-bold text-foreground mb-6">System Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">System Name</label>
                <input type="text" className="input-base" defaultValue="SpotIt Citizen Tracker" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Support Email</label>
                <input type="email" className="input-base" defaultValue="support@spotit.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Max Issues Per User</label>
                <input type="number" className="input-base" defaultValue="100" />
              </div>
              <div>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                  <span className="text-sm font-semibold text-foreground">Enable Email Notifications</span>
                </label>
              </div>
              <button className="btn-primary">Save Settings</button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
