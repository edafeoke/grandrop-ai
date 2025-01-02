"use client";

import { MoreVertical, Pen, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./button";
import { deleteChatbot } from "@/actions/chatbot";
import { revalidatePath } from "next/cache";

type Props = {
  chatbot: {
    id: string;
    title: string;
    description: string;
    userID: string;
  };
};

const Chatbot = ({ chatbot }: Props) => {
  return (
    <Link
      key={chatbot.id}
      href={`/dashboard/chatbots/${chatbot.id}`}
      className="flex flex-col rounded-lg border p-6 shadow transition-colors hover:bg-muted/50"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{chatbot.title}</h2>
        <Sparkles className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {chatbot.description}
      </p>
    </Link>
  );
};

export default Chatbot;
