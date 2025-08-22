"use client"

import { Button } from "@/components/ui/button"
import { Home, BarChart3, Settings, BookOpen, Users } from "lucide-react"

interface NavigationProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: "home", label: "الرئيسية", icon: Home },
    { id: "dashboard", label: "لوحة التحكم", icon: Settings },
    { id: "analytics", label: "التحليلات", icon: BarChart3 },
    { id: "guidance", label: "الإرشاد الزراعي", icon: BookOpen },
    { id: "community", label: "المجتمع", icon: Users },
  ]

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-xl text-primary">T-Bloom</span>
            </div>
          </div>

          <div className="flex space-x-1 space-x-reverse">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate(item.id)}
                  className="flex items-center space-x-2 space-x-reverse"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
