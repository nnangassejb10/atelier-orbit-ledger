import { createFileRoute } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/use-auth";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Mon compte | E-shop" },
      { name: "description", content: "Connectez-vous à votre compte E-shop, créez-en un et suivez vos achats." },
      { property: "og:title", content: "Mon compte | E-shop" },
      { property: "og:description", content: "Connectez-vous à votre compte E-shop." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Connexion,
});

const field = "w-full rounded-sm border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

type Order = { id: string; total: number; status: string; created_at: string; items: { name: string; qty: number }[] };

function Account({ email }: { email: string }) {
  const [orders, setOrders] = useState<Order[] | null>(null);
  useEffect(() => {
    supabase.from("orders").select("*").order("created_at", { ascending: false }).then(({ data }) => setOrders((data as unknown as Order[]) ?? []));
  }, []);
  return (
    <section className="mx-auto max-w-4xl px-5 py-16">
      <p className="spec text-primary">06 / Compte</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-4xl font-bold">Mon compte</h1>
          <p className="mt-1 text-muted-foreground">{email}</p>
        </div>
        <button onClick={() => supabase.auth.signOut()} className="spec rounded-sm border px-4 py-2.5 hover:border-primary hover:text-primary">Se déconnecter</button>
      </div>
      <h2 className="mt-10 text-2xl font-bold">Mes achats</h2>
      <div className="mt-4 divide-y border">
        {orders === null && <p className="p-6 text-muted-foreground">Chargement…</p>}
        {orders?.length === 0 && <p className="p-6 text-muted-foreground">Aucun achat pour le moment.</p>}
        {orders?.map((o) => (
          <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="spec text-muted-foreground">{new Date(o.created_at).toLocaleDateString("fr-FR")} · {o.status}</p>
              <p className="mt-1 text-sm">{o.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}</p>
            </div>
            <p className="font-display text-lg font-bold">{formatPrice(o.total)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Connexion() {
  const { user, loading } = useAuth();
  const [show, setShow] = useState(false);
  const [signup, setSignup] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  if (loading) return <section className="min-h-[60vh]" />;
  if (user) return <Account email={user.email ?? ""} />;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email"));
    const password = String(f.get("password"));
    setBusy(true);
    setMsg(null);
    if (signup) {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: window.location.origin + "/connexion", data: { full_name: String(f.get("name") ?? "") } },
      });
      setMsg(error ? { ok: false, text: error.message } : { ok: true, text: "Compte créé ! Vérifiez votre e-mail pour confirmer, puis connectez-vous." });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg({ ok: false, text: error.message === "Invalid login credentials" ? "E-mail ou mot de passe incorrect." : error.message });
    }
    setBusy(false);
  };

  const google = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/connexion" });
    if (r.error) setMsg({ ok: false, text: "Connexion Google impossible." });
  };

  return (
    <section className="blueprint grid min-h-[calc(100vh-4rem)] place-items-center px-5 py-16">
      <form onSubmit={submit} className="brackets reveal w-full max-w-sm space-y-5 border bg-card p-8">
        <div>
          <p className="spec text-primary">06 / Compte</p>
          <h1 className="mt-2 text-3xl font-bold">{signup ? "Créer un compte" : "Connexion"}</h1>
        </div>
        <button type="button" onClick={google} className="flex w-full items-center justify-center gap-2.5 rounded-sm border bg-background py-3 text-sm font-medium hover:border-primary">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
          Continuer avec Google
        </button>
        <div className="spec flex items-center gap-3 text-muted-foreground"><span className="h-px flex-1 bg-border" />ou<span className="h-px flex-1 bg-border" /></div>
        {signup && <input name="name" required className={field} placeholder="Nom complet" />}
        <input name="email" required type="email" className={field} placeholder="Adresse e-mail" />
        <div className="relative">
          <input name="password" required minLength={6} type={show ? "text" : "password"} className={field} placeholder="Mot de passe" />
          <button type="button" aria-label="Afficher le mot de passe" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <button disabled={busy} className="spec w-full rounded-sm bg-primary py-3.5 text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50">
          {busy ? "…" : signup ? "Créer mon compte" : "Se connecter"}
        </button>
        {msg && <p className={`text-sm ${msg.ok ? "text-accent" : "text-destructive"}`}>{msg.text}</p>}
        <p className="text-center text-sm text-muted-foreground">
          {signup ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
          <button type="button" onClick={() => { setSignup((s) => !s); setMsg(null); }} className="text-primary hover:underline">
            {signup ? "Se connecter" : "Créer un compte"}
          </button>
        </p>
      </form>
    </section>
  );
}
