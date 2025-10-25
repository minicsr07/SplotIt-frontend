import Leaderboard from "@/components/leaderboard"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-surface py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2">Leaderboard</h1>
        <p className="text-text-muted mb-8">Top contributors making a difference in their communities</p>
        <Leaderboard />
      </div>
    </div>
  )
}
