"use client"
 
// import { useChat, type UseChatOptions } from "ai/react"
 
import { Chat } from "@/components/ui/chat"
import useChat, { Message } from "@/hooks/use-chat"
 
type ChatPageProps = {
  initialMessages?: Message[]
  chatBotID: string
}
 
export function ChatPage(props: ChatPageProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    isLoading,
  } = useChat(props)
 
  return (
    <div className="flex w-2/3 h-[80vh]">
      <Chat
        className="shadow-lg p-4"
        messages={messages}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        isGenerating={isLoading}
        stop={stop}
        append={append}
        suggestions={[
          "Generate a tasty vegan lasagna recipe for 3 people.",
          "Generate a list of 5 questions for a job interview for a software engineer.",
          "Who won the 2022 FIFA World Cup?",
        ]}
      />
    </div>
  )
}