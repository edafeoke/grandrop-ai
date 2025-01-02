export default function SettingsLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="container mx-auto py-6">
        <div className="mx-auto max-w-2xl space-y-6">
          {children}
        </div>
      </div>
    )
  }
  
  