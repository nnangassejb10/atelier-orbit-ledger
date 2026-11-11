import { lazy, Suspense, useEffect, useState } from "react";

const Hero3D = lazy(() => import("./Hero3D"));

export function ClientHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className="absolute inset-0">
      {mounted && (
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
      )}
    </div>
  );
}
