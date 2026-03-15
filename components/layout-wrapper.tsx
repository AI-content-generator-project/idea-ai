"use client"

import { useState } from "react"
import { AppSidebar } from "./app-sidebar"
import { AppHeader } from "./app-header"

interface LayoutWrapperProps {
  children: React.ReactNode
  title: string
}

export function LayoutWrapper({ children, title }: LayoutWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <AppHeader onMenuClick={() => setSidebarOpen(true)} title={title} />
      <main className="px-4 md:px-6 py-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  )
}
