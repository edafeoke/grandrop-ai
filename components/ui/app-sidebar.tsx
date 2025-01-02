"use client"

import * as React from "react"
import { AudioWaveform, BookOpen, Bot, Command, Frame, GalleryVerticalEnd, Map, PieChart, Settings2, SquareTerminal } from 'lucide-react'
import { NavMain } from "@/components/ui/nav-main"
import { NavUser } from "@/components/ui/nav-user"
import { TeamSwitcher } from "@/components/ui/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar> & { session: any, chatbots: any }) {
  const { session, chatbots } = props
  const pathname = usePathname()
  
  // Check if a chatbot is currently selected
  const isChatbotSelected = pathname.match(/\/dashboard\/chatbots\/([a-fA-F0-9]+)/);
  const selectedChatbotId = isChatbotSelected ? isChatbotSelected[1] : null

  const data = {
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      // {
      //   name: "Acme Corp.",
      //   logo: AudioWaveform,
      //   plan: "Startup",
      // },
      // {
      //   name: "Evil Corp.",
      //   logo: Command,
      //   plan: "Free",
      // },
    ],
    navMain: [
      {
        title: "Chatbot",
        url: "/dashboard",
        icon: Bot,
        isActive: pathname === "/dashboard/chatbots",
        items: [
          {
            title: "Chatbots",
            url: "/dashboard/chatbots",
          },
          {
            title: "Settings",
            url: `/dashboard/chatbots/${selectedChatbotId}/settings`,
          },
          // {
          //   title: "Usage",
          //   url: "#",
          // },
        ],
      },
      // Only show Playground when a chatbot is selected
      // ...(selectedChatbotId ? [
      {
        title: "Playground",
        url: `/dashboard/chatbots/${selectedChatbotId}/playground`,
        icon: SquareTerminal,
        isDisabled: !selectedChatbotId,
        isActive: pathname === `/dashboard/chatbots/${selectedChatbotId}`,
        items: [
          {
            title: "Playground",
            url: `/dashboard/chatbots/${selectedChatbotId}/`,
          },
          // {
          //   title: "Starred",
          //   url: `/dashboard/chatbots/${selectedChatbotId}/playground/starred`,
          // },
          {
            title: "Settings",
            url: `/dashboard/chatbots/${selectedChatbotId}/settings`,
          },
        ],
      },
      {
        title: "Data",
        url: `/dashboard/chatbots/${selectedChatbotId}/sources`,
        icon: Frame,
        isDisabled: !selectedChatbotId,
        isActive: pathname === `/dashboard/chatbots/${selectedChatbotId}/sources`,
        items: [
          {
            title: "Sources",
            url: `/dashboard/chatbots/${selectedChatbotId}/sources`,
          }
        ],
      },
    // ] : []),
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "/dashboard/docs/introduction",
          },
          {
            title: "Get Started",
            url: "/dashboard/docs/get-started",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        // isDisabled: !selectedChatbotId,
        isActive: pathname.includes("/dashboard/settings"),
        items: [
          {
            title: "Plans",
            url: "/dashboard/settings/plans",
          },
          // {
          //   title: "Team",
          //   url: "#",
          // },
          // {
          //   title: "Billing",
          //   url: "#",
          // },
          // {
          //   title: "Limits",
          //   url: "#",
          // },
        ],
      },
    ],
  }
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          ...session?.user as any,
          email: session?.user?.email as string,
          name: session?.user?.name as string,
          avatar: session?.user?.image as string,
        }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

