"use client"

import type React from "react"

import { useState } from "react"
import MapPicker from "./map-picker"
import { useAuth } from "@/lib/auth-context"

export default function ReportForm() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Road",
    location: { lat: 0, lng: 0, address: "" },
    email: user?.email || "",
    phone: user?.phone || "",
    trainNumber: "",
    images: [] as File[],
  })
  const [submitted, setSubmitted] = useState(false)
  const [complaintId, setComplaintId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData({
      ...formData,
      images: [...formData.images, ...files].slice(0, 5), // Max 5 images
    })
  }

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.location.address) {
        alert("Please fill in all required fields")
        return
      }

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockId = `SPOT-${new Date().toISOString().split("T")[0].replace(/-/g, "")}-${Math.random().toString().slice(2, 6)}`
      setComplaintId(mockId)
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="card-base bg-green-50 border-2 border-success text-center">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Issue Reported Successfully!</h3>
        <p className="text-text-muted mb-4">Your complaint has been registered and is being reviewed</p>
        <div className="bg-white rounded-lg p-4 mb-6">
          <p className="text-sm text-text-muted">Your Complaint ID</p>
          <p className="text-2xl font-bold text-primary">{complaintId}</p>
        </div>
        <p className="text-sm text-text-muted mb-6">Save this ID to track your issue status</p>
        <button
          onClick={() => {
            setSubmitted(false)
            setFormData({
              title: "",
              description: "",
              category: "Road",
              location: { lat: 0, lng: 0, address: "" },
              email: user?.email || "",
              phone: user?.phone || "",
              trainNumber: "",
              images: [],
            })
          }}
          className="btn-primary"
        >
          Report Another Issue
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card-base space-y-6">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Issue Title *</label>
        <input
          type="text"
          required
          className="input-base"
          placeholder="e.g., Pothole on Main Street"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Description *</label>
        <textarea
          required
          className="input-base min-h-24"
          placeholder="Describe the issue in detail"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Category *</label>
        <select
          required
          className="input-base"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          disabled={isSubmitting}
        >
          <option>Road</option>
          <option>Lighting</option>
          <option>Water</option>
          <option>Sanitation</option>
          <option>Train</option>
          <option>Traffic</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Location *</label>
        <MapPicker onLocationSelect={(location) => setFormData({ ...formData, location })} />
      </div>

      {formData.category === "Train" && (
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Train Number (Optional)</label>
          <input
            type="text"
            className="input-base"
            placeholder="e.g., 12345"
            value={formData.trainNumber}
            onChange={(e) => setFormData({ ...formData, trainNumber: e.target.value })}
            disabled={isSubmitting}
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Upload Photos (Optional)</label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
          <svg className="w-12 h-12 text-text-muted mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L10 8.586l4.293-4.293a1 1 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-text-muted mb-2">Click to upload or drag and drop</p>
          <p className="text-xs text-text-muted mb-4">PNG, JPG, GIF up to 5MB (Max 5 images)</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isSubmitting || formData.images.length >= 5}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="btn-secondary inline-block cursor-pointer">
            Choose Files
          </label>
        </div>
        {formData.images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.images.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file) || "/placeholder.svg"}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Email (Optional)</label>
          <input
            type="email"
            className="input-base"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
        </div>
      </div>

      <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  )
}
