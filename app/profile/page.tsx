"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-surface py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-border p-8">
            <h1 className="text-4xl font-bold text-foreground mb-8">My Profile</h1>

            {user && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2">Name</label>
                  <p className="text-lg text-foreground">{user.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2">Email</label>
                  <p className="text-lg text-foreground">{user.email}</p>
                </div>

                {user.phone && (
                  <div>
                    <label className="block text-sm font-semibold text-text-muted mb-2">Phone</label>
                    <p className="text-lg text-foreground">{user.phone}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2">Role</label>
                  <p className="text-lg text-foreground capitalize">{user.role}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2">Member Since</label>
                  <p className="text-lg text-foreground">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>

                <button onClick={handleLogout} className="btn-primary w-full mt-8">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
