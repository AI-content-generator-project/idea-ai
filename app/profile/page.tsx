"use client"

import { useState, useEffect } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { useProfileStore } from "@/lib/profile-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FieldGroup, Field, FieldLabel, FieldSet, FieldLegend } from "@/components/ui/field"
import { Save, User } from "lucide-react"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

const platforms = ["YouTube", "Instagram", "LinkedIn", "TikTok", "Twitter/X", "Blog"]
const contentTypes = [
  "Short-form Video",
  "Long-form Video",
  "Carousel Posts",
  "Text Posts",
  "Blogs/Articles",
  "Threads",
  "Stories",
  "Live Streams",
]

export default function ProfilePage() {
  const { profile, updateProfile } = useProfileStore()
  const [formData, setFormData] = useState(profile)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setFormData(profile)
  }, [profile])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleContentTypeToggle = (type: string) => {
    const current = formData.preferredContentTypes
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type]
    setFormData((prev) => ({ ...prev, preferredContentTypes: updated }))
  }

  const handleSave = () => {
    updateProfile(formData)
    toast.success("Profile saved successfully!")
  }

  if (!mounted) {
    return null
  }

  return (
    <LayoutWrapper title="Creator Profile">
      <Toaster />
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl bg-card border border-border p-6 md:p-8">
          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {formData.name || "Your Profile"}
              </h2>
              <p className="text-muted-foreground text-sm">
                Personalize your content generation experience
              </p>
            </div>
          </div>

          <FieldGroup className="space-y-6">
            <Field>
              <FieldLabel htmlFor="name">Creator Name</FieldLabel>
              <Input
                id="name"
                placeholder="Your name or brand name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="mt-2"
              />
            </Field>

            <Field>
              <FieldLabel>Primary Platform</FieldLabel>
              <Select
                value={formData.primaryPlatform}
                onValueChange={(value) => handleInputChange("primaryPlatform", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select your main platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="niche">Content Niche</FieldLabel>
              <Input
                id="niche"
                placeholder="e.g., Tech reviews, Fitness, Personal finance"
                value={formData.contentNiche}
                onChange={(e) => handleInputChange("contentNiche", e.target.value)}
                className="mt-2"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="audience">Target Audience</FieldLabel>
              <Textarea
                id="audience"
                placeholder="Describe your ideal viewer/reader..."
                value={formData.targetAudience}
                onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                className="mt-2 min-h-[100px]"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="goal">Content Goal</FieldLabel>
              <Textarea
                id="goal"
                placeholder="What do you want to achieve with your content?"
                value={formData.contentGoal}
                onChange={(e) => handleInputChange("contentGoal", e.target.value)}
                className="mt-2 min-h-[100px]"
              />
            </Field>

            <FieldSet className="space-y-4">
              <FieldLegend>Preferred Content Types</FieldLegend>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {contentTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border cursor-pointer transition-colors hover:bg-secondary/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary/30"
                  >
                    <Checkbox
                      checked={formData.preferredContentTypes.includes(type)}
                      onCheckedChange={() => handleContentTypeToggle(type)}
                    />
                    <span className="text-sm font-medium">{type}</span>
                  </label>
                ))}
              </div>
            </FieldSet>

            <div className="pt-4">
              <Button
                onClick={handleSave}
                className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
                size="lg"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Profile
              </Button>
            </div>
          </FieldGroup>
        </div>
      </div>
    </LayoutWrapper>
  )
}
