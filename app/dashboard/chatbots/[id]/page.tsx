import { ChatPage } from "@/components/pages/chat-page";
import { Chat } from "@/components/ui/chat";
import React from "react";

type Props = {
    params: Promise<{ id: string }>
};

const Page = async (props: Props) => {
  const { id } = await props.params
  return(
    <div className="flex flex-col h-full w-full items-center justify-center">
      <ChatPage chatbotId={id}/>
    </div>
    );
};

export default Page;
