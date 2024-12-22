import { Header } from "@/components/ui/header"
import { Hero } from "@/components/ui/hero"
import { TrustedBy } from "@/components/ui/trusted-by"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustedBy />
      </main>
    </div>
  )
}

