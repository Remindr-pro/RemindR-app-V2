"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { IconArrowLeft } from "@tabler/icons-react";

export default function ConnexionLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center p-4 bg-gray-1 text-dark relative">
      {/* Background pattern */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('/images/bg/bg-with-cross.png')",
        }}
      />

      <div className="absolute top-8 left-8 z-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 font-inclusive text-dark hover:underline bg-transparent border-none cursor-pointer text-sm md:text-base"
          aria-label="Retour à la page précédente"
        >
          <IconArrowLeft size={20} stroke={2} className="shrink-0" />
          <span>Retour</span>
        </button>
      </div>

      <main className="flex items-center justify-center pb-32 sm:pb-24 md:pb-20 relative z-10">
        {children}
      </main>

      <footer className="absolute bottom-0 left-0 right-0 px-2 sm:px-4 pb-3 sm:pb-5 z-10">
        <ul className="flex flex-row flex-wrap justify-center items-center gap-2 sm:gap-2 md:gap-3 lg:gap-4 text-[10px] sm:text-xs md:text-sm lg:text-base font-inclusive text-gray-4">
          <li className="text-center">
            <Link
              href="/"
              className="hover:underline whitespace-nowrap text-gray-4 hover:text-dark transition-colors"
            >
              Tout savoir sur mon espace santé
            </Link>
          </li>
          <li className="hidden sm:inline text-gray-3">•</li>
          <li className="text-center">
            <Link
              href="/"
              className="hover:underline text-gray-4 hover:text-dark transition-colors"
            >
              Accessibilité
            </Link>
          </li>
          <li className="hidden sm:inline text-gray-3">•</li>
          <li className="text-center">
            <Link
              href="/"
              className="hover:underline whitespace-nowrap text-gray-4 hover:text-dark transition-colors"
            >
              Mentions légales et CGU
            </Link>
          </li>
          <li className="hidden sm:inline text-gray-3">•</li>
          <li className="text-center">
            <Link
              href="/"
              className="hover:underline whitespace-nowrap text-gray-4 hover:text-dark transition-colors"
            >
              Protection des données personnelles
            </Link>
          </li>
          <li className="hidden sm:inline text-gray-3">•</li>
          <li className="text-center">
            <Link
              href="/"
              className="hover:underline text-gray-4 hover:text-dark transition-colors"
            >
              Gestion des cookies
            </Link>
          </li>
          <li className="hidden sm:inline text-gray-3">•</li>
          <li className="text-center">
            <Link
              href="/"
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
