import { retrieveData } from '@/actions/retrieval'
import { useState, useCallback } from 'react'

// Define the types for our messages and props
export type Message = {
  id: string
  content: string
  role: 'user' | 'assistant'
}

export type ChatProps = {
  // Add any props you want to pass to the hook
  initialMessages?: Message[]
  chatBotID: string
}

const useChat = (props: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>(props.initialMessages || [])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }, [])

  const handleSubmit = useCallback(async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: input,
        role: 'user'
      }
      setMessages(prev => [...prev, newMessage])
      setInput('')
      setIsLoading(true)
      const response = await retrieveData(newMessage, props.chatBotID)
      .then(d=>{
        console.log(" the response is >>>",d)
        return d
      })
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant'
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
      // setTimeout(() => {
        //   const assistantMessage: Message = {
          //     id: (Date.now() + 1).toString(),
          //     content: `This is a dummy response to: "${input}"`,
      //     role: 'assistant'
      //   }
      //   setMessages(prev => [...prev, assistantMessage])
      //   setIsLoading(false)
      // }, 1000)
    }
  }, [input])

  const append = useCallback((message: Message | Message[]) => {
    setMessages(prev => [...prev, ...(Array.isArray(message) ? message : [message])])
  }, [])

  const stop = useCallback(() => {
    // In a real implementation, this would stop the ongoing request
    setIsLoading(false)
  }, [])

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    isLoading,
  }
}

export default useChat

