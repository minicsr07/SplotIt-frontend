import Hero from "@/components/hero"
import RecentIssues from "@/components/recent-issues"
import IssuesDashboard from "@/components/issues-dashboard"

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="bg-surface py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-2">Community Dashboard</h2>
          <p className="text-text-muted mb-8">Real-time statistics on civic issues in your community</p>
          <IssuesDashboard />
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Recent Issues</h2>
          <RecentIssues />
        </div>
      </section>
    </div>
  )
}
