import { auth } from "@/auth";
import { LoginForm } from "@/components/ui/login-form"
import { redirect } from "next/navigation";
import { use } from "react";

export default function Page() {
  const session = use(auth());

  if (!!session && !!session.user) {
    redirect('/dashboard')
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
