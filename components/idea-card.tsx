"use client"

import { Bookmark, BookmarkCheck, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface Idea {
  id: string
  title: string
  hook: string
  platform: string
  hashtags: string[]
  saved?: boolean
}

interface IdeaCardProps {
  idea: Idea
  onSave?: (id: string) => void
  onDelete?: (id: string) => void
  showDelete?: boolean
}

export function IdeaCard({ idea, onSave, onDelete, showDelete }: IdeaCardProps) {
  const platformColors: Record<string, string> = {
    YouTube: "bg-red-500/20 text-red-400",
    Instagram: "bg-pink-500/20 text-pink-400",
    LinkedIn: "bg-blue-500/20 text-blue-400",
    TikTok: "bg-cyan-500/20 text-cyan-400",
    Blog: "bg-green-500/20 text-green-400",
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card p-6 border border-border transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <span className={cn(
              "px-3 py-1 text-xs font-medium rounded-full",
              platformColors[idea.platform] || "bg-primary/20 text-primary"
            )}>
              {idea.platform}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
            {idea.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {idea.hook}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {idea.hashtags.map((tag, index) => (
              <span
                key={index}
                className="text-xs text-primary/80 bg-primary/10 px-2 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
        {onSave && (
          <Button
            variant={idea.saved ? "secondary" : "outline"}
            size="sm"
            onClick={() => onSave(idea.id)}
            className="flex-1"
          >
            {idea.saved ? (
              <>
                <BookmarkCheck className="w-4 h-4 mr-2" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 mr-2" />
                Save Idea
              </>
            )}
          </Button>
        )}
        {showDelete && onDelete && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(idea.id)}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
