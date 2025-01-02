"use client";

import * as React from "react";
import { Send, RefreshCw, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import useChat, { Message } from "@/hooks/use-chat";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { TypingIndicator } from "./typing-indicator";

// interface Message {
//   role: "user" | "assistant"
//   content: string
// }

interface ChatInterfaceProps {
  apiKey: string;
  botName?: string;
  theme?: "light" | "dark";
  suggestions?: string[];
}

export function ChatInterface({
  apiKey,
  botName = "AI Assistant",
  theme = "light",
  suggestions = ["What can you help me with?", "How do I get started?"],
}: ChatInterfaceProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    isLoading,
  } = useChat({
    chatBotID: apiKey,
    initialMessages: [
      {
        id: uuidv4(),
        role: "assistant",
        content: `👋 Hi! I am ${botName}, how can I help you today?`,
      },
    ],
  });
  // const [messages, setMessages] = React.useState<Message[]>([
  //   { id: uuidv4(), role: "assistant", content: `👋 Hi! I am ${botName}, how can I help you today?` }
  // ])
  // const [input, setInput] = React.useState("")
  // const [isLoading, setIsLoading] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // const handleSend = async (content: string) => {
  //   if (!content.trim()) return

  //   setIsLoading(true)
  //   const newMessages = [...messages, { role: "user", content }]
  //   setMessages(newMessages)
  //   setInput("")

  //   try {
  //     const response = await fetch("/api/chat", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${apiKey}`
  //       },
  //       body: JSON.stringify({
  //         messages: newMessages
  //       })
  //     })

  //     if (!response.ok) throw new Error("Failed to get response")

  //     const data = await response.json()
  //     setMessages([...newMessages, { role: "assistant", content: data.message }])
  //   } catch (error) {
  //     console.error("Error:", error)
  //     setMessages([...newMessages, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }])
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <div
      className={cn(
        "flex h-[600px] w-full max-w-md flex-col rounded-lg border shadow-lg",
        theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center justify-between border-b p-4",
          theme === "dark" ? "border-gray-800" : "border-gray-200"
        )}
      >
        <div className="flex items-center gap-2">
          <Avatar>
            <div
              className={cn(
                "h-full w-full rounded-full",
                theme === "dark" ? "bg-gray-800" : "bg-gray-100"
              )}
            >
              {botName[0]}
            </div>
          </Avatar>
          <span
            className={cn(
              "font-semibold",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}
          >
            {botName}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          // onClick={() => setMessages([{ id: "1", role: "assistant", content: `👋 Hi! I am ${botName}, how can I help you today?` }])}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div
            key={i}
            className={cn(
              "flex w-full",
              message.role === "user" && "justify-end"
            )}
          >
            <div
              className={cn(
                "rounded-lg px-4 py-2 max-w-[80%]",
                message.role === "assistant"
                  ? theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100"
                  : theme === "dark"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-500 text-white"
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-4 pb-4 flex gap-2 flex-wrap">
          {suggestions.map((suggestion, i) => (
            <Button
              key={i}
              variant="secondary"
              className="text-sm"
              // onClick={() => handleSend(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}

      {isLoading && (
        <div className={cn("flex w-full")}>
          <div
            className={cn(
              "rounded-lg m-4 px-4 py-2 max-w-[80%]",
              theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100"
            )}
          >
            <div className="flex -space-x-2.5">
              <Dot className="h-5 w-5 animate-typing-dot-bounce" />
              <Dot className="h-5 w-5 animate-typing-dot-bounce [animation-delay:90ms]" />
              <Dot className="h-5 w-5 animate-typing-dot-bounce [animation-delay:180ms]" />
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            disabled={isLoading}
            className={cn(
              theme === "dark" && "bg-gray-800 border-gray-700 text-white"
            )}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <div className="mt-2 text-center text-sm text-gray-500">
          By chatting, you agree to our{" "}
          <a href="/privacy" className="underline hover:text-gray-700">
            privacy policy
          </a>
          .
        </div>
      </div>
    </div>
  );
}
