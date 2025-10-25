"use client"

import { useState, useEffect, useRef } from "react"

interface Location {
  lat: number
  lng: number
  address: string
}

interface MapPickerProps {
  onLocationSelect: (location: Location) => void
}

export default function MapPicker({ onLocationSelect }: MapPickerProps) {
  const [location, setLocation] = useState<Location>({
    lat: 40.7128,
    lng: -74.006,
    address: "New York, NY",
  })
  const [mapLoaded, setMapLoaded] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const marker = useRef<any>(null)

  // Initialize map with Leaflet
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainer.current) return

    // Load Leaflet CSS and JS
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
    document.head.appendChild(link)

    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"
    script.onload = () => {
      const L = (window as any).L
      if (!L) return

      map.current = L.map(mapContainer.current).setView([location.lat, location.lng], 13)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map.current)

      // Add marker
      marker.current = L.marker([location.lat, location.lng]).addTo(map.current).bindPopup(location.address)

      // Handle map clicks
      map.current.on("click", (e: any) => {
        const { lat, lng } = e.latlng
        updateLocation(lat, lng)
      })

      setMapLoaded(true)
    }
    document.body.appendChild(script)

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  const updateLocation = (lat: number, lng: number) => {
    const newLocation = {
      lat,
      lng,
      address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    }
    setLocation(newLocation)
    onLocationSelect(newLocation)

    if (mapLoaded && map.current && marker.current) {
      const L = (window as any).L
      map.current.setView([lat, lng], 13)
      marker.current.setLatLng([lat, lng]).setPopupContent(newLocation.address)
    }
  }

  const handleUseCurrentLocation = () => {
    setIsLoadingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          updateLocation(latitude, longitude)
          setIsLoadingLocation(false)
        },
        () => {
          alert("Unable to get your location. Please enable location services.")
          setIsLoadingLocation(false)
        },
      )
    }
  }

  return (
    <div className="space-y-4">
      <div
        ref={mapContainer}
        className="bg-surface rounded-lg border-2 border-border overflow-hidden"
        style={{ height: "300px" }}
      />

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-sm text-blue-800">Click on the map to select a location or use your GPS location below</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={handleUseCurrentLocation} disabled={isLoadingLocation} className="btn-secondary">
          {isLoadingLocation ? "Getting location..." : "Use GPS Location"}
        </button>
        <div className="bg-surface rounded-lg p-3 border border-border">
          <p className="text-xs text-text-muted">Selected Location</p>
          <p className="text-sm font-semibold text-foreground truncate">{location.address}</p>
        </div>
      </div>
    </div>
  )
}
