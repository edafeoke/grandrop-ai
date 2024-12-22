"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useTheme } from "next-themes"

export function Hero() {
  const { theme } = useTheme();
  return (
    <div className="container pt-24 pb-12 md:pt-32 md:pb-16 px-4">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Custom ChatGPT for your business
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-[600px]">
            Build a custom GPT, embed it on your website and let it handle customer support, lead generation, engage with your users, and more.
          </p>
          <div className="flex flex-col gap-2">
            <Button size="lg" className="px-8">
              Build your Chatbot →
            </Button>
            <span className="text-sm text-muted-foreground">No credit card required</span>
          </div>
        </div>
        <div className="lg:ml-auto">
          <Card className="w-full max-w-[500px] mx-auto">
            <Image
              src={theme !== "light" ? "/placeholder-dark.svg" : "/placeholder.svg"}
              width={500}
              height={600}
              alt="Chat Interface Demo"
              className="rounded-lg"
              priority
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

