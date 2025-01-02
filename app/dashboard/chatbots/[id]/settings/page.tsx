import { Separator } from "@/components/ui/separator"
import { GeneralForm } from "./general-form"
import { DangerZone } from "./danger-zone"

interface SettingsPageProps {
  params: {
    id: string
  }
}

export default function SettingsPage({ params }: SettingsPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General</h3>
        <p className="text-sm text-muted-foreground">
          Manage your chatbot settings and preferences.
        </p>
      </div>
      <Separator />
      <GeneralForm chatbotId={params.id} />
      <Separator className="my-6" />
      <DangerZone chatbotId={params.id} />
    </div>
  )
}

