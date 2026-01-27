"use client";

import Logo from "./components/atoms/Logo";
import Button from "./components/atoms/Button";
import { useAuth } from "@/lib/auth-provider";

export default function NotFound() {
  const { isAuthenticated, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gray-1 relative flex flex-col">
      <main className="flex-1 max-w-6xl mx-auto px-8 py-16 relative z-10 flex flex-col items-center justify-center">
        <div className="mb-8">
          <Logo size={50} />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-dark mb-4 font-inclusive">
            404
          </h1>
          <h2 className="text-2xl md:text-4xl font-inclusive w-full md:max-w-2xl mx-auto text-dark mb-6 font-bold leading-tight">
            Page non trouvée
          </h2>
          <p className="text-lg md:text-xl text-gray-4 max-w-xl mx-auto font-inclusive">
            Désolé, la page que vous recherchez n&apos;existe pas ou a été
            déplacée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button href="/" variant="outline" className="min-w-[200px]">
            Retour à l&apos;accueil
          </Button>

          {!loading && (
            <>
              {isAuthenticated ? (
                <Button
                  href="/dashboard"
                  variant="green"
                  className="min-w-[200px]"
                >
                  Aller au dashboard
                </Button>
              ) : (
                <Button
                  href="/connexion"
                  variant="green"
                  className="min-w-[200px]"
                >
                  Se connecter
                </Button>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
