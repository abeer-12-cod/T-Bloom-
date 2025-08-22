"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HomePage } from "@/components/home-page"
import { Dashboard } from "@/components/dashboard"
import { Analytics } from "@/components/analytics"
import { Guidance } from "@/components/guidance"
import { Community } from "@/components/community"

export default function App() {
  const [currentPage, setCurrentPage] = useState("home")

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />
      case "dashboard":
        return <Dashboard />
      case "analytics":
        return <Analytics />
      case "guidance":
        return <Guidance />
      case "community":
        return <Community />
      default:
        return <HomePage onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="transition-all duration-300">{renderPage()}</main>
    </div>
  )
}
