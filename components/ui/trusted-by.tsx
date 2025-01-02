export function TrustedBy() {
    return (
      <section className="w-full border-t bg-muted/40">
        <div className="container py-12">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by 5000+ businesses
          </p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5 items-center justify-items-center opacity-75">
            {['Opal', 'Siemens', 'Postman', 'Alpian', 'alBaraka'].map((company) => (
              <div
                key={company}
                className="h-12 w-24 flex items-center justify-center grayscale"
              >
                <span className="text-muted-foreground font-semibold">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  