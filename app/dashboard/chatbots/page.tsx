import { auth } from "@/auth";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { NewChatbotDialog } from "@/components/ui/new-chatbot-dialog";
import { getChatbotsByUserID } from "@/actions/chatbot";
import { use } from "react";
import Chatbot from "@/components/ui/chatbot";

type Props = {};

const Page = (props: Props) => {
  const session = use(auth());
  const chatbots = use(getChatbotsByUserID(session?.user?.id || session?.user?.email || ""));

  return (
    <main className="container px-4 py-8">
      <div className="flex items-center justify-end">
        <NewChatbotDialog
          userID={session?.user?.id || session?.user?.email || ""}
        />
      </div>

      {chatbots.length === 0 ? (
        <EmptyChatbots />
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {chatbots.map((chatbot) => (
            <Chatbot chatbot={chatbot} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Page;

const EmptyChatbots = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <svg
      className="h-48 w-48 text-muted-foreground/20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" />
      <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" />
      <path
        d="M7.5 16.5c.82 1 2.47 2.5 4.5 2.5s3.68-1.5 4.5-2.5"
        strokeWidth="0.75"
      />
      <path d="M4.5 10.5c-.82-1-2-2.5-2-4s1.18-3 2-4" strokeWidth="0.75" />
      <path d="M19.5 10.5c.82-1 2-2.5 2-4s-1.18-3-2-4" strokeWidth="0.75" />
      <path d="M4.5 13.5c-.82 1-2 2.5-2 4s1.18 3 2 4" strokeWidth="0.75" />
      <path d="M19.5 13.5c.82 1 2 2.5 2 4s-1.18 3-2 4" strokeWidth="0.75" />
    </svg>
    <h3 className="mt-4 text-xl font-semibold text-muted-foreground">
      No Chatbots Yet
    </h3>
    <p className="mt-2 text-center text-sm text-muted-foreground">
      Create your first chatbot to get started with AI-powered conversations.
    </p>
  </div>
);
