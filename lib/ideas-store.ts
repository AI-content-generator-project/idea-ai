import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Idea } from '@/components/idea-card'

interface IdeasStore {
  savedIdeas: Idea[]
  generatedIdeas: Idea[]
  saveIdea: (idea: Idea) => void
  unsaveIdea: (id: string) => void
  deleteIdea: (id: string) => void
  setGeneratedIdeas: (ideas: Idea[]) => void
  clearGeneratedIdeas: () => void
}

export const useIdeasStore = create<IdeasStore>()(
  persist(
    (set, get) => ({
      savedIdeas: [],
      generatedIdeas: [],
      saveIdea: (idea) => {
        const { savedIdeas } = get()
        if (!savedIdeas.find(i => i.id === idea.id)) {
          set({ savedIdeas: [...savedIdeas, { ...idea, saved: true }] })
        }
      },
      unsaveIdea: (id) => {
        set({ savedIdeas: get().savedIdeas.filter(i => i.id !== id) })
      },
      deleteIdea: (id) => {
        set({ savedIdeas: get().savedIdeas.filter(i => i.id !== id) })
      },
      setGeneratedIdeas: (ideas) => {
        set({ generatedIdeas: ideas })
      },
      clearGeneratedIdeas: () => {
        set({ generatedIdeas: [] })
      },
    }),
    {
      name: 'ideas-storage',
    }
  )
)
