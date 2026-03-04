"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/app/components/atoms/Logo";
import IconInstagram from "@/app/components/atoms/icons/Instagram";
import IconLinkedIn from "@/app/components/atoms/icons/LinkedIn";
import IconRss from "@/app/components/atoms/icons/Rss";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const contactHref = pathname?.startsWith("/professionnels")
    ? "/professionnels/contact"
    : "/particuliers/contact";
  return (
    <footer className="w-full bg-dark text-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Logo */}
          <div className="lg:col-span-1">
            <Logo size={50} />
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="font-semibold mb-6 text-light text-base"
              style={{ fontFamily: "var(--font-inclusive)" }}
            >
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-2 hover:text-light transition-colors text-sm block"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/professionnels"
                  className="text-gray-2 hover:text-light transition-colors text-sm block"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  Je suis une mutuelle/assurance santé
                </Link>
              </li>
              <li>
                <Link
                  href="/particuliers"
                  className="text-gray-2 hover:text-light transition-colors text-sm block"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  Je crée mon tableau de bord santé
                </Link>
              </li>
              <li>
                <Link
                  href="/particuliers/magazine"
                  className="text-gray-2 hover:text-light transition-colors text-sm block"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  Le magazine Prévention Santé
                </Link>
              </li>
              <li>
                <Link
                  href={contactHref}
                  className="text-gray-2 hover:text-light transition-colors text-sm block"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  Aide et Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Notre entreprise */}
          <div>
            <h3
              className="font-semibold mb-6 text-light text-base"
              style={{ fontFamily: "var(--font-inclusive)" }}
            >
              Notre entreprise
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/mission"
                  className="text-gray-2 hover:text-light transition-colors text-sm block"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  Notre mission
                </Link>
              </li>
              <li>
                <Link
                  href="/presse"
                  className="text-gray-2 hover:text-light transition-colors text-sm block"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  Espace presse
                </Link>
              </li>
              <li>
                <Link
                  href="/carrieres"
                  className="text-gray-2 hover:text-light transition-colors text-sm block"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  Rejoindre l&apos;aventure
                </Link>
              </li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3
              className="font-semibold mb-6 text-light text-base"
              style={{ fontFamily: "var(--font-inclusive)" }}
            >
              Ressources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-gray-2 hover:text-light transition-colors text-sm block"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/conditions-generales-utilisation"
                  className="text-gray-2 hover:text-light transition-colors text-sm block"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  Conditions générales d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-de-confidentialite"
                  className="text-gray-2 hover:text-light transition-colors text-sm block"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibilite"
                  className="text-gray-2 hover:text-light transition-colors text-sm block"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  Accessibilité
                </Link>
              </li>
              <li>
                <Link
                  href="/gestion-des-cookies"
                  className="text-gray-2 hover:text-light transition-colors text-sm block"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  Gestion des cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/particuliers#faq"
                  className="text-gray-2 hover:text-light transition-colors text-sm block"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Liens santé et prévention */}
          <div>
            <h3
              className="font-semibold mb-6 text-light text-base"
              style={{ fontFamily: "var(--font-inclusive)" }}
            >
              Liens santé et prévention
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://www.ameli.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-2 hover:text-light transition-colors text-sm inline-flex items-center gap-1.5"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  ameli.fr
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.service-public.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-2 hover:text-light transition-colors text-sm inline-flex items-center gap-1.5"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  service-public.fr
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.sante.gouv.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-2 hover:text-light transition-colors text-sm inline-flex items-center gap-1.5"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  sante.gouv.fr
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.mangerbouger.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-2 hover:text-light transition-colors text-sm inline-flex items-center gap-1.5"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  mangerbouger.fr
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.vaccination-info-service.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-2 hover:text-light transition-colors text-sm inline-flex items-center gap-1.5"
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  vaccination-info-service.fr
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-3 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Media Icons */}
          <div className="flex items-center space-x-5">
            <Link
              href="https://www.instagram.com/remindr.sante/?igsh=MWV4ZmNvMnpreHJ0NA%3D%3D#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light hover:text-greenMain transition-colors"
              aria-label="Instagram"
            >
              <IconInstagram size={24} className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/remindr-sant%C3%A9-85b86734a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light hover:text-greenMain transition-colors"
              aria-label="LinkedIn"
            >
              <IconLinkedIn size={24} className="w-6 h-6" />
            </Link>
            <Link
              href="/rss"
              className="text-light hover:text-greenMain transition-colors"
              aria-label="RSS"
            >
              <IconRss size={24} className="w-6 h-6" />
            </Link>
          </div>

          {/* Copyright */}
          <div
            className="text-gray-2 text-sm"
            style={{ fontFamily: "var(--font-inclusive)" }}
          >
            © {currentYear} Remindr. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}
