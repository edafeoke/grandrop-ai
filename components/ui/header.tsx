import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ThemeSwitch } from "./theme-switch";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm mx-4">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg">
              <Image src="/logo.svg" alt="GrandAI" width={32} height={32} />
            </div>
            <span className="text-xl font-semibold">
              Grand<span className="text-primary">AI</span>
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Affiliates
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Resources
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeSwitch />
          <Link
            href="/login"
            className="text-sm font-medium hover:text-primary hidden sm:block"
          >
            Sign in
          </Link>
          <Button>Try for Free →</Button>
        </div>
      </div>
    </header>
  );
}
