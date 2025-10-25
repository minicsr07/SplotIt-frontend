import Link from "next/link"

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary via-primary to-primary-dark text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">See it. Spot it. Solve it.</h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Report civic issues in your community and track their resolution in real-time
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/report"
            className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Report an Issue
          </Link>
          <Link
            href="/issues"
            className="bg-white text-primary hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </section>
  )
}
