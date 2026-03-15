"use client"

import { LayoutWrapper } from "@/components/layout-wrapper"
import { IdeaCard } from "@/components/idea-card"
import { useIdeasStore } from "@/lib/ideas-store"
import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SavedIdeasPage() {
  const { savedIdeas, deleteIdea } = useIdeasStore()

  const handleDelete = (id: string) => {
    deleteIdea(id)
  }

  return (
    <LayoutWrapper title="Saved Ideas">
      <div className="space-y-6">
        {savedIdeas.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                {savedIdeas.length} saved idea{savedIdeas.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedIdeas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  onDelete={handleDelete}
                  showDelete
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Saved Ideas Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Start generating content ideas and save your favorites to access them here.
            </p>
            <Link href="/generate">
              <Button className="gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
                Generate Ideas
              </Button>
            </Link>
          </div>
        )}
      </div>
    </LayoutWrapper>
  )
}
