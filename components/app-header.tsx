"use client"

import { Menu, Sparkles } from "lucide-react"

interface AppHeaderProps {
  onMenuClick: () => void
  title: string
}

export function AppHeader({ onMenuClick, title }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center gap-4 px-4 md:px-6 h-16">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center md:hidden">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        </div>
      </div>
    </header>
  )
}
