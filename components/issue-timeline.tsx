interface Update {
  status: string
  date: string
  note: string
  icon?: string
}

interface IssueTimelineProps {
  updates: Update[]
}

export default function IssueTimeline({ updates }: IssueTimelineProps) {
  const statusConfig: Record<string, { color: string; bgColor: string; icon: string }> = {
    Pending: { color: "text-gray-700", bgColor: "bg-gray-100", icon: "⏳" },
    "In Progress": { color: "text-blue-700", bgColor: "bg-blue-100", icon: "🔄" },
    Resolved: { color: "text-green-700", bgColor: "bg-green-100", icon: "✓" },
    Rejected: { color: "text-red-700", bgColor: "bg-red-100", icon: "✕" },
    "Under Review": { color: "text-purple-700", bgColor: "bg-purple-100", icon: "👁" },
  }

  return (
    <div className="card-base">
      <h3 className="text-xl font-bold text-foreground mb-6">Status Timeline</h3>
      <div className="space-y-6">
        {updates.map((update, index) => {
          const config = statusConfig[update.status] || statusConfig.Pending
          return (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center font-bold ${config.color}`}
                >
                  {config.icon}
                </div>
                {index < updates.length - 1 && <div className="w-1 h-16 bg-border mt-2" />}
              </div>
              <div className="pb-4 flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${config.bgColor} ${config.color}`}>
                    {update.status}
                  </span>
                  <span className="text-sm text-text-muted">{update.date}</span>
                </div>
                <p className="text-foreground text-sm leading-relaxed">{update.note}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
