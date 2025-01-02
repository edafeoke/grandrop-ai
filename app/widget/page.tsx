"use client"

import { getChatbots } from "@/actions/chatbot";
import { ChatInterface } from "@/components/ui/online-chat-interface";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChatPage } from "@/components/pages/chat-page";

export default function WidgetPage() {
  const searchParams = useSearchParams()
  const apiKey = searchParams.get('apiKey') || ''
  const theme = (searchParams.get('theme') || 'dark') as 'light' | 'dark'
  const botName = searchParams.get('botName') || 'AI Assistant'
  console.log(apiKey, theme, botName)
  if (!apiKey) {
    return (
      <p className="p-4 h-screen flex items-center justify-center bg-transparent">
        Missing API key
      </p>
    )
  }

  return (
    <div className="p-0 h-screen flex items-center justify-center bg-transparent">
      <ChatInterface 
        apiKey={apiKey}
        theme={theme}
        botName={botName}
      />
    </div>
  )
}

