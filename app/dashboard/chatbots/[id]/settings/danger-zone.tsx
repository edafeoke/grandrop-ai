"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface DangerZoneProps {
  chatbotId: string
}

export function DangerZone({ chatbotId }: DangerZoneProps) {
  const [isDeletingConversations, setIsDeletingConversations] = useState(false)
  const [isDeletingChatbot, setIsDeletingChatbot] = useState(false)

  const handleDeleteConversations = async () => {
    setIsDeletingConversations(true)
    try {
      // Replace with actual delete API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success("All conversations deleted successfully")
    } catch (error) {
      toast.error("Failed to delete conversations")
    } finally {
      setIsDeletingConversations(false)
    }
  }

  const handleDeleteChatbot = async () => {
    setIsDeletingChatbot(true)
    try {
      // Replace with actual delete API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success("Chatbot deleted successfully")
      // Redirect to chatbots list
    } catch (error) {
      toast.error("Failed to delete chatbot")
    } finally {
      setIsDeletingChatbot(false)
    }
  }

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-medium text-destructive uppercase">Danger Zone</h4>
      
      <div className="space-y-4">
        <div className="rounded-lg border border-destructive/20 p-4">
          <h3 className="text-lg font-medium text-destructive">Delete All Conversations</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Once you delete all your conversations, there is no going back. Please be certain.
            All the conversations on this chatbot will be deleted. This action is not reversible
          </p>
          <div className="mt-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  Delete All Conversations
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. All conversations will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteConversations}
                    disabled={isDeletingConversations}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeletingConversations ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="rounded-lg border border-destructive/20 p-4">
          <h3 className="text-lg font-medium text-destructive">Delete Chatbot</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Once you delete your chatbot, there is no going back. Please be certain.
            All your uploaded data will be deleted. This action is not reversible
          </p>
          <div className="mt-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  Delete Chatbot
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your chatbot
                    and remove all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteChatbot}
                    disabled={isDeletingChatbot}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeletingChatbot ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  )
}

