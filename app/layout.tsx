import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import ChatbotWidget from "@/components/chatbot-widget"
import { AuthProvider } from "@/lib/auth-context"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "SpotIt - Citizen Issue Tracker",
  description: "Report, track, and solve civic issues in your community",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-background text-foreground`}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <ChatbotWidget />
        </AuthProvider>
      </body>
    </html>
  )
}
