"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface ActivityItemProps {
  title: string
  description: string
  time: string
  icon: LucideIcon
  platform?: string
}

export function ActivityItem({ title, description, time, icon: Icon, platform }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50 transition-all duration-200 hover:bg-card hover:border-border">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-foreground truncate">{title}</p>
          {platform && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/20 text-accent">
              {platform}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
        <p className="text-xs text-muted-foreground/70 mt-2">{time}</p>
      </div>
    </div>
  )
}
