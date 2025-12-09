import Link from "next/link";
import { ReactNode } from "react";

export default function ConnexionLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-center p-4 bg-red-1 text-light relative">
      <main className="flex items-center justify-center pb-32 sm:pb-24 md:pb-20">
        {children}
      </main>

      <footer className="absolute bottom-0 left-0 right-0 px-2 sm:px-4 pb-3 sm:pb-5">
        <ul className="flex flex-row flex-wrap justify-center items-center gap-2 sm:gap-2 md:gap-3 lg:gap-4 text-[10px] sm:text-xs md:text-sm lg:text-base font-inclusive">
          <li className="text-center">
            <Link href="/" className="hover:underline whitespace-nowrap">
              Tout savoir sur mon espace santé
            </Link>
          </li>
          <li className="hidden sm:inline text-gray-400">•</li>
          <li className="text-center">
            <Link href="/" className="hover:underline">
              Accessibilité
            </Link>
          </li>
          <li className="hidden sm:inline text-gray-400">•</li>
          <li className="text-center">
            <Link href="/" className="hover:underline whitespace-nowrap">
              Mentions légales et CGU
            </Link>
          </li>
          <li className="hidden sm:inline text-gray-400">•</li>
          <li className="text-center">
            <Link href="/" className="hover:underline whitespace-nowrap">
              Protection des données personnelles
            </Link>
          </li>
          <li className="hidden sm:inline text-gray-400">•</li>
          <li className="text-center">
            <Link href="/" className="hover:underline">
              Gestion des cookies
            </Link>
          </li>
          <li className="hidden sm:inline text-gray-400">•</li>
          <li className="text-center">
            <Link href="/" className="hover:underline">
              Aide et Contact
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
