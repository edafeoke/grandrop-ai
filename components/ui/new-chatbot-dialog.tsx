"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, {
  useActionState,
  useEffect,
} from "react";

import { toast, Toaster } from "sonner";
import { Textarea } from "./textarea";
import SubmitButton from "./submit-button";
import { createChatbot } from "@/actions/chatbot";

type NewChatbotDialogProps = {
  userID: string;
};

export function NewChatbotDialog({ userID }: NewChatbotDialogProps) {
  const [state, formAction, isPending] = useActionState(createChatbot, null);

  useEffect(() => {
    if (state && state.success) {
      toast.success("Chatbot created successfully");
    }
    if (state && !state.success){
      toast.error(state?.message)
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-gray-900 text-white hover:bg-gray-800"
        >
          New Chatbot
        </Button>
      </DialogTrigger>
      {/* <DialogContent className="flex flex-col min-w-[94%] h-[96vh]"> */}
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle>Create new chatbot</DialogTitle>
          {/* <DialogDescription>Create a new chatbot.</DialogDescription> */}
        </DialogHeader>
        <form action={formAction} className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid gap-6">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="userID">UserID</Label>
                <Input
                  id="userID"
                  name="userID"
                  type="text"
                  // placeholder="m@example.com"
                  value={userID}
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="My Chatbot"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="My awesome chatbot... (100 characters max)"
                  maxLength={100}
                />
              </div>
            </div>
          </div>
          <SubmitButton>Save chatbot</SubmitButton>
        </form>
        <Toaster richColors />
      </DialogContent>
    </Dialog>
  );
}
