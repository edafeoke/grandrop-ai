"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

type Props = {
  id: string
}

const ChatbotNav = ({id}: Props) => {
    const pathname = usePathname();
  return (
    <nav className="flex gap-4 mx-4 mb-4">
        {/* <Link href={`/dashboard/chatbots/${id}`}>Back</Link> */}
        <Link className={pathname === `/dashboard/chatbots/${id}/playground` ? "text-primary" : ""} href={`/dashboard/chatbots/${id}/playground`}>Playground</Link>
        <Link className={pathname === `/dashboard/chatbots/${id}/sources` ? "text-primary" : ""} href={`/dashboard/chatbots/${id}/sources`}>Sources</Link>
      </nav>
  )
}

export default ChatbotNav