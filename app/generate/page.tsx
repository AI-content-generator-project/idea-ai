"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { IdeaCard, type Idea } from "@/components/idea-card"
import { useIdeasStore } from "@/lib/ideas-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sparkles, Loader2 } from "lucide-react"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

const platforms = ["YouTube", "Instagram", "LinkedIn", "TikTok", "Blog"]
const contentFormats = ["Post", "Blog", "Video", "Thread"]

const sampleIdeas: Record<string, Idea[]> = {
  default: [
    {
      id: "1",
      title: "The Hidden Truth About Morning Routines",
      hook: "Everyone talks about 5 AM routines, but here's what actually works for busy professionals who hate waking up early...",
      platform: "YouTube",
      hashtags: ["productivity", "morningroutine", "lifehacks"],
    },
    {
      id: "2",
      title: "3 Tools That Changed My Workflow",
      hook: "Stop scrolling through endless app recommendations. These 3 tools actually deliver results and here's exactly how I use them...",
      platform: "Instagram",
      hashtags: ["tools", "productivity", "workflow"],
    },
    {
      id: "3",
      title: "Why Your Content Strategy Fails",
      hook: "Most creators focus on the wrong metrics. After analyzing 100+ accounts, I discovered the real reason content doesn't convert...",
      platform: "LinkedIn",
      hashtags: ["contentstrategy", "marketing", "growth"],
    },
    {
      id: "4",
      title: "This Trend is About to Explode",
      hook: "I've been tracking this pattern for 3 months. The data shows it's about to go mainstream. Here's how to get ahead...",
      platform: "TikTok",
      hashtags: ["trending", "viral", "contentcreator"],
    },
  ],
}

export default function GeneratePage() {
  const [topic, setTopic] = useState("")
  const [platform, setPlatform] = useState("")
  const [format, setFormat] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [ideas, setIdeas] = useState<Idea[]>([])

  const { savedIdeas, saveIdea, unsaveIdea } = useIdeasStore()

  const handleGenerate = async () => {
    if (!topic) return

    setIsGenerating(true)
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate ideas based on input
    const generatedIdeas = sampleIdeas.default.map((idea, index) => ({
      ...idea,
      id: `${Date.now()}-${index}`,
      platform: platform || idea.platform,
      title: idea.title.includes(topic) ? idea.title : `${topic}: ${idea.title}`,
      saved: savedIdeas.some(saved => saved.title === idea.title),
    }))

    setIdeas(generatedIdeas)
    setIsGenerating(false)
  }

  const handleSave = (id: string) => {
    const idea = ideas.find(i => i.id === id)
    if (!idea) return

    if (idea.saved) {
      unsaveIdea(id)
      setIdeas(ideas.map(i => i.id === id ? { ...i, saved: false } : i))
    } else {
      saveIdea(idea)
      setIdeas(ideas.map(i => i.id === id ? { ...i, saved: true } : i))
    }
  }

  return (
    <LayoutWrapper title="Generate Ideas">
      <div className="space-y-8">
        {/* Input Form */}
        <div className="rounded-2xl bg-card border border-border p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-6">Create Content Ideas</h2>
          
          <FieldGroup className="space-y-6">
            <Field>
              <FieldLabel htmlFor="topic">Topic or Keyword</FieldLabel>
              <Input
                id="topic"
                placeholder="e.g., AI productivity tools, fitness tips, startup growth..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-2"
              />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field>
                <FieldLabel>Platform</FieldLabel>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select platform" />
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
                <FieldLabel>Content Format</FieldLabel>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {contentFormats.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!topic || isGenerating}
              className="w-full md:w-auto gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Ideas
                </>
              )}
            </Button>
          </FieldGroup>
        </div>

        {/* Generated Ideas */}
        {ideas.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Generated Ideas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ideas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  onSave={handleSave}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {ideas.length === 0 && !isGenerating && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Ready to Generate</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter a topic and select your preferred platform to generate creative content ideas powered by AI.
            </p>
          </div>
        )}
      </div>
    </LayoutWrapper>
  )
}
