import { createFileRoute } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Connexion | E-shop" },
      { name: "description", content: "Connectez-vous à votre compte E-shop ou créez-en un." },
      { property: "og:title", content: "Connexion | E-shop" },
      { property: "og:description", content: "Connectez-vous à votre compte E-shop." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Connexion,
});

const field = "w-full rounded-sm border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

function Connexion() {
  const [show, setShow] = useState(false);
  const [signup, setSignup] = useState(false);
  return (
    <section className="blueprint grid min-h-[calc(100vh-4rem)] place-items-center px-5 py-16">
      <form onSubmit={(e) => e.preventDefault()} className="brackets reveal w-full max-w-sm space-y-5 border bg-card p-8">
        <div>
          <p className="spec text-primary">06 / Compte</p>
          <h1 className="mt-2 text-3xl font-bold">{signup ? "Créer un compte" : "Connexion"}</h1>
        </div>
        {signup && <input required className={field} placeholder="Nom complet" />}
        <input required type="email" className={field} placeholder="Adresse e-mail" />
        <div className="relative">
          <input required type={show ? "text" : "password"} className={field} placeholder="Mot de passe" />
          <button type="button" aria-label="Afficher le mot de passe" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <button className="spec w-full rounded-sm bg-primary py-3.5 text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          {signup ? "Créer mon compte" : "Se connecter"}
        </button>
        <p className="text-center text-sm text-muted-foreground">
          {signup ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
          <button type="button" onClick={() => setSignup((s) => !s)} className="text-primary hover:underline">
            {signup ? "Se connecter" : "Créer un compte"}
          </button>
        </p>
      </form>
    </section>
  );
}
