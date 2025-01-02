
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { authConfig } from "./auth.config"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    authorized: ({auth})=>{
      return !!auth
    }
  },
  providers: [Google, Github],
})