import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageTitle } from "@/components/SiteChrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | E-shop Libreville" },
      { name: "description", content: "Une question ? Écrivez-nous ou passez à la boutique de Nzeng-Ayong, Libreville." },
      { property: "og:title", content: "Contact | E-shop Libreville" },
      { property: "og:description", content: "Écrivez-nous ou passez à la boutique de Nzeng-Ayong." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const field = "w-full rounded-sm border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageTitle code="04 / Contact" title="Parlons de votre projet">
        Une question ? Un besoin particulier ? Laissez-nous un message, nous vous répondrons rapidement.
      </PageTitle>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pt-14 lg:grid-cols-2">
        <form
          className="brackets reveal space-y-5 border bg-card p-6 md:p-8"
          onSubmit={(e) => { e.preventDefault(); setSent(true); e.currentTarget.reset(); }}
        >
          <label className="block space-y-2"><span className="spec text-muted-foreground">Nom complet</span><input required className={field} placeholder="Votre nom" /></label>
          <label className="block space-y-2"><span className="spec text-muted-foreground">Adresse e-mail</span><input required type="email" className={field} placeholder="exemple@mail.com" /></label>
          <label className="block space-y-2"><span className="spec text-muted-foreground">Message</span><textarea required rows={5} className={field} placeholder="Votre message..." /></label>
          <button className="spec w-full rounded-sm bg-primary py-3.5 text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground">Envoyer</button>
          {sent && <p className="spec text-accent">✓ Message envoyé — merci !</p>}
        </form>
        <div className="reveal space-y-6" style={{ animationDelay: "120ms" }}>
          <div className="grid gap-px overflow-hidden border bg-border sm:grid-cols-2">
            {[
              ["Adresse", "Nzeng-Ayong, Libreville, Gabon"],
              ["Téléphone", "+241 06 00 00 00"],
              ["E-mail", "contact@eshop-gabon.com"],
              ["Horaires", "Lun–Ven 08h–18h · Sam 09h–13h"],
            ].map(([k, v]) => (
              <div key={k} className="bg-card p-5">
                <p className="spec text-primary">{k}</p>
                <p className="mt-2 text-sm">{v}</p>
              </div>
            ))}
          </div>
          <div className="overflow-hidden border">
            <iframe
              title="Carte E-shop"
              src="https://www.google.com/maps?q=Nzeng-Ayong,Libreville,Gabon&output=embed"
              className="h-72 w-full grayscale invert-[0.9] hue-rotate-180"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
