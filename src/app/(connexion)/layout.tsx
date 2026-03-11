"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function ConnexionLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isConnexionPage = pathname?.startsWith("/connexion");

  return (
    <div
      className="min-h-screen flex flex-col justify-center p-4 text-dark relative"
      style={{
        backgroundColor: "var(--color-gray-1)",
        ...(isConnexionPage && {
          backgroundImage: "url('/images/bg/bg-with-cross-fullwidth.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }),
      }}
    >
      <main className="flex items-center justify-center pb-32 sm:pb-24 md:pb-20 relative z-10">
        {children}
      </main>

      <footer className="absolute bottom-0 left-0 right-0 px-2 sm:px-4 pb-3 sm:pb-5 z-10">
        <ul className="flex flex-row flex-wrap justify-center items-center gap-2 sm:gap-2 md:gap-3 lg:gap-4 text-[10px] sm:text-xs md:text-sm lg:text-base font-inclusive text-gray-4">
          <li className="text-center">
            <Link
              href="/particuliers"
              className="hover:underline whitespace-nowrap text-gray-4 hover:text-dark transition-colors"
            >
              Tout savoir sur mon espace santé
            </Link>
          </li>
          <li className="hidden sm:inline text-gray-3">•</li>
          <li className="text-center">
            <Link
              href="/accessibilite"
              className="hover:underline text-gray-4 hover:text-dark transition-colors"
            >
              Accessibilité
            </Link>
          </li>
          <li className="hidden sm:inline text-gray-3">•</li>
          <li className="text-center">
            <Link
              href="/mentions-legales"
              className="hover:underline whitespace-nowrap text-gray-4 hover:text-dark transition-colors"
            >
              Mentions légales et CGU
            </Link>
          </li>
          <li className="hidden sm:inline text-gray-3">•</li>
          <li className="text-center">
            <Link
              href="/politique-de-confidentialite"
              className="hover:underline whitespace-nowrap text-gray-4 hover:text-dark transition-colors"
            >
              Protection des données personnelles
            </Link>
          </li>
          <li className="hidden sm:inline text-gray-3">•</li>
          <li className="text-center">
            <Link
              href="/gestion-des-cookies"
              className="hover:underline text-gray-4 hover:text-dark transition-colors"
            >
              Gestion des cookies
            </Link>
          </li>
          <li className="hidden sm:inline text-gray-3">•</li>
          <li className="text-center">
            <Link
              href="/aide-contact"
              className="hover:underline text-gray-4 hover:text-dark transition-colors"
            >
              Aide et Contact
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
