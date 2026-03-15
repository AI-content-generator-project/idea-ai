"use client"

import { LayoutWrapper } from "@/components/layout-wrapper"
import { StatsCard } from "@/components/stats-card"
import { ActivityItem } from "@/components/activity-item"
import { Lightbulb, Bookmark, TrendingUp, Clock, Sparkles, Video, FileText } from "lucide-react"

const recentActivity = [
  {
    title: "10 Hook Ideas for Tech Reviews",
    description: "Generated viral hooks for your upcoming smartphone review video",
    time: "2 hours ago",
    icon: Lightbulb,
    platform: "YouTube",
  },
  {
    title: "Instagram Carousel: AI Tips",
    description: "5 engaging slides about using AI in daily life",
    time: "5 hours ago",
    icon: FileText,
    platform: "Instagram",
  },
  {
    title: "LinkedIn Thought Leadership",
    description: "Professional post about the future of content creation",
    time: "1 day ago",
    icon: FileText,
    platform: "LinkedIn",
  },
  {
    title: "TikTok Trend Analysis",
    description: "Trending sounds and formats for tech niche",
    time: "2 days ago",
    icon: Video,
    platform: "TikTok",
  },
]

export default function DashboardPage() {
  return (
    <LayoutWrapper title="Dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-2xl gradient-primary p-8 text-primary-foreground">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold">Welcome back, Creator!</h2>
            <p className="text-primary-foreground/80 mt-2 max-w-lg">
              Ready to generate some amazing content ideas? Your AI assistant is here to help you create engaging content for any platform.
            </p>
          </div>
          <Sparkles className="absolute right-8 top-1/2 -translate-y-1/2 w-32 h-32 opacity-20" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Ideas Generated"
            value="247"
            icon={Lightbulb}
            trend="+12% this week"
          />
          <StatsCard
            title="Saved Ideas"
            value="64"
            icon={Bookmark}
            trend="+5 today"
          />
          <StatsCard
            title="Platforms Used"
            value="5"
            icon={TrendingUp}
          />
          <StatsCard
            title="Time Saved"
            value="18h"
            icon={Clock}
            trend="This month"
          />
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="grid gap-3">
            {recentActivity.map((activity, index) => (
              <ActivityItem
                key={index}
                title={activity.title}
                description={activity.description}
                time={activity.time}
                icon={activity.icon}
                platform={activity.platform}
              />
            ))}
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
