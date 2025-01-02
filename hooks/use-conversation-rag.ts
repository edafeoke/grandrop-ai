import { useState, useCallback } from 'react'
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts"
import { RunnableSequence } from "@langchain/core/runnables"
import { StringOutputParser } from "@langchain/core/output_parsers"
import { Document } from "@langchain/core/documents"
import { BaseMessage, HumanMessage, AIMessage } from "@langchain/core/messages"
import { BufferMemory } from "langchain/memory"

type Message = {
  id: string
  content: string
  role: 'user' | 'assistant'
}

type ConversationalRAGProps = {
  initialMessages?: Message[]
  systemPrompt?: string
  apiKey?: string
}

const CONDENSE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question that captures all relevant context from the conversation.

Chat History:
{chat_history}

Follow Up Input: {question}

Standalone question:`

const QA_TEMPLATE = `You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.

{context}

Question: {question}

Helpful Answer:`

const useConversationalRAG = (props: ConversationalRAGProps = {}) => {
  const [messages, setMessages] = useState<Message[]>(props.initialMessages || [])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [memory] = useState(() => new BufferMemory({ returnMessages: true }))

  const model = new ChatOpenAI({
    openAIApiKey: props.apiKey,
    modelName: 'gpt-4o',
    temperature: 0.2,
    streaming: true,
    // apiKey: process.env.OPENAI_API_KEY,
  })

  const questionGeneratorTemplate = ChatPromptTemplate.fromTemplate(
    CONDENSE_QUESTION_TEMPLATE
  )
  
  const answerTemplate = ChatPromptTemplate.fromTemplate(QA_TEMPLATE)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }, [])

  const makeChain = useCallback(() => {
    const standaloneQuestionChain = RunnableSequence.from([
      questionGeneratorTemplate,
      model,
      new StringOutputParser()
    ])

    const answerChain = RunnableSequence.from([
      answerTemplate,
      model,
      new StringOutputParser()
    ])

    return { standaloneQuestionChain, answerChain }
  }, [model])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user'
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const { standaloneQuestionChain, answerChain } = makeChain()

      // Convert messages to LangChain format
      const chatHistory = messages.map(msg => 
        msg.role === 'user' 
          ? new HumanMessage(msg.content)
          : new AIMessage(msg.content)
      )

      // Get standalone question
      const standaloneQuestion = await standaloneQuestionChain.invoke({
        chat_history: chatHistory.map(m => m.content).join('\n'),
        question: input
      })

      // For this example, we'll use a dummy retriever
      // In a real application, you would implement proper vector storage and retrieval
      const dummyDocs = [
        new Document({ pageContent: "This is some relevant context for the question." })
      ]

      // Generate answer
      const answer = await answerChain.invoke({
        context: dummyDocs.map(doc => doc.pageContent).join('\n'),
        question: standaloneQuestion
      })

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: answer,
        role: 'assistant'
      }

      setMessages(prev => [...prev, assistantMessage])

      // Update memory
      await memory.saveContext(
        { input: input },
        { output: answer }
      )

    } catch (error) {
      console.error('Error in chat:', error)
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try again.'
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, messages, makeChain, memory])

  const append = useCallback((message: Message | Message[]) => {
    setMessages(prev => [...prev, ...(Array.isArray(message) ? message : [message])])
  }, [])

  const stop = useCallback(() => {
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

export default useConversationalRAG

