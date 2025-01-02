import { Separator } from "@/components/ui/separator"
import { GeneralForm } from "@/components/ui/general-form"
import { DangerZone } from "@/components/ui/danger-zone"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General</h3>
        <p className="text-sm text-muted-foreground">
          Manage your team settings and preferences.
        </p>
      </div>
      <Separator />
      <GeneralForm />
      <Separator />
      <DangerZone />
    </div>
  )
}

