import ReportForm from "@/components/report-form"

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-surface py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2">Report an Issue</h1>
        <p className="text-text-muted mb-8">Help us improve your community by reporting civic issues</p>
        <ReportForm />
      </div>
    </div>
  )
}
