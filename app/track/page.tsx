import TrackForm from "@/components/track-form"

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-surface py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2">Track Your Issue</h1>
        <p className="text-text-muted mb-8">Enter your complaint ID or email to track the status</p>
        <TrackForm />
      </div>
    </div>
  )
}
