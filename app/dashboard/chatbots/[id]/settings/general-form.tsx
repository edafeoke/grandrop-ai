"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { CopyButton } from "@/components/ui/copy-button"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  creditLimit: z.boolean().default(false),
})

interface GeneralFormProps {
  chatbotId: string
}

export function GeneralForm({ chatbotId }: GeneralFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Chatbot 30/12/2024, 22:08:42",
      creditLimit: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)), // Replace with actual API call
      {
        loading: "Saving changes...",
        success: "Settings saved successfully",
        error: "Failed to save settings",
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormItem>
            <FormLabel>Chatbot ID</FormLabel>
            <div className="flex items-center space-x-2">
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {chatbotId}
              </code>
              <CopyButton content={chatbotId} copyMessage="Chatbot ID copied!" />
            </div>
          </FormItem>

          <FormItem>
            <FormLabel>Number of characters</FormLabel>
            <div className="text-sm">198,996</div>
          </FormItem>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="creditLimit"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Credit Limit</FormLabel>
                  <FormDescription>
                    Enable or disable credit limit for this chatbot.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}

