"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { signup } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }

      if (!formData.name || !formData.email || !formData.password) {
        setError("Please fill in all required fields")
        return
      }

      await signup(formData.name, formData.email, formData.password, formData.phone)
      router.push("/profile")
    } catch (err) {
      setError("Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-50 border border-error text-error px-4 py-3 rounded-lg text-sm">{error}</div>}

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
        <input
          type="text"
          required
          className="input-base"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
        <input
          type="email"
          required
          className="input-base"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Phone (Optional)</label>
        <input
          type="tel"
          className="input-base"
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
        <input
          type="password"
          required
          className="input-base"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Confirm Password</label>
        <input
          type="password"
          required
          className="input-base"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          disabled={isLoading}
        />
      </div>

      <button type="submit" className="btn-primary w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  )
}
