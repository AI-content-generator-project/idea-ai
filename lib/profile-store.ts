import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CreatorProfile {
  name: string
  primaryPlatform: string
  contentNiche: string
  targetAudience: string
  contentGoal: string
  preferredContentTypes: string[]
}

interface ProfileStore {
  profile: CreatorProfile
  updateProfile: (profile: Partial<CreatorProfile>) => void
  resetProfile: () => void
}

const defaultProfile: CreatorProfile = {
  name: "",
  primaryPlatform: "",
  contentNiche: "",
  targetAudience: "",
  contentGoal: "",
  preferredContentTypes: [],
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      profile: defaultProfile,
      updateProfile: (updates) => {
        set({ profile: { ...get().profile, ...updates } })
      },
      resetProfile: () => {
        set({ profile: defaultProfile })
      },
    }),
    {
      name: 'profile-storage',
    }
  )
)
