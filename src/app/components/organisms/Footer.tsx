import Link from "next/link";
import Logo from "../atoms/Logo";

export default function Footer() {
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
                  href="/aide-contact"
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
                <a
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
                </a>
              </li>
              <li>
                <a
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
                </a>
              </li>
              <li>
                <a
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
                </a>
              </li>
              <li>
                <a
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
                </a>
              </li>
              <li>
                <a
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
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-3 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Media Icons */}
          <div className="flex items-center space-x-5">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light hover:text-greenMain transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light hover:text-greenMain transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="/rss"
              className="text-light hover:text-greenMain transition-colors"
              aria-label="RSS"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div
            className="text-gray-2 text-sm"
            style={{ fontFamily: "var(--font-inclusive)" }}
          >
            © 2025 Remindr. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}
