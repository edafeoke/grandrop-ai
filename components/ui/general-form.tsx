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
import { toast } from "sonner"

const formSchema = z.object({
  teamName: z.string().min(2, {
    message: "Team name must be at least 2 characters.",
  }),
  teamUrl: z.string().min(2, {
    message: "Team URL must be at least 2 characters.",
  }),
})

export function GeneralForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "EDAFE OKE's team",
      teamUrl: "edafe-oke-team-0c5548f2",
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
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teamUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Updating Team URL will cause a redirect to the new url.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}

