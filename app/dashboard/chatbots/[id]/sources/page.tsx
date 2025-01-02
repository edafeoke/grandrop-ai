import Sources from '@/components/ui/sources'
import React from 'react'

type Props = {
    params: {
        id: string
    }
}

const Page = async ({ params }: Props) => {
    const {id: chatBotID} = await params
  return (
    <Sources chatBotID={chatBotID}/>
  )
}

export default Page