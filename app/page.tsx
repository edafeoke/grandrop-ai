import { Header } from "@/components/ui/header"
import { Hero } from "@/components/ui/hero"
import { TrustedBy } from "@/components/ui/trusted-by"
import { auth } from "@/auth";
import { use } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  const session = use(auth());

  if (session) {
    redirect('/dashboard')
  }
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

