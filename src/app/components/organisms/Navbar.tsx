"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Button from "../atoms/Button";

export default function Navbar() {
  const pathname = usePathname();
  const isProfessionnal = pathname?.includes("/professionnels");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isProfessionnal) {
    return (
      <nav className="w-full bg-light border-b border-gray-2 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              href="/professionnels"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/logos/logo.svg"
                alt="RemindR Logo"
                width={100}
                height={38}
                priority
                className="h-6 w-auto"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-10">
              <Link
                href="/professionnels#pourquoi-remindr"
                className="text-dark hover:text-greenMain transition-colors text-base font-medium"
                style={{ fontFamily: "var(--font-inclusive)" }}
              >
                Pourquoi Remindr ?
              </Link>
              <Link
                href="/professionnels#nos-fonctionnalites"
                className="text-dark hover:text-greenMain transition-colors text-base font-medium"
                style={{ fontFamily: "var(--font-inclusive)" }}
              >
                Nos fonctionnalités
              </Link>
              <Link
                href="/professionnels#nos-sources"
                className="text-dark hover:text-greenMain transition-colors text-base font-medium"
                style={{ fontFamily: "var(--font-inclusive)" }}
              >
                Nos sources
              </Link>
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button href="/particuliers/demo" variant="green">
                Demander une démo
              </Button>
              <Button href="/particuliers/inscription" variant="dark">
                Contacter un commercial
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-dark transition-all ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-dark transition-all ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-dark transition-all ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-2">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/professionnels#pourquoi-remindr"
                  className="text-dark hover:text-greenMain transition-colors text-base font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  Pourquoi Remindr ?
                </Link>
                <Link
                  href="/professionnels#nos-fonctionnalites"
                  className="text-dark hover:text-greenMain transition-colors text-base font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  Nos fonctionnalités
                </Link>
                <Link
                  href="/professionnels#nos-sources"
                  className="text-dark hover:text-greenMain transition-colors text-base font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ fontFamily: "var(--font-inclusive)" }}
                >
                  Nos sources
                </Link>
              </div>

              <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-2">
                <Button
                  href="/professionnels/demo"
                  variant="green"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Demander une démo
                </Button>
                <Button
                  href="/professionnels/contact"
                  variant="dark"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contacter un commercial
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }

  // Version Particuliers
  return (
    <nav className="w-full bg-light border-b border-gray-2 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/particuliers"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/logos/logo.svg"
              alt="RemindR Logo"
              width={120}
              height={40}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/particuliers#fonctionnalites"
              className="text-dark hover:text-greenMain transition-colors text-base font-medium"
              style={{ fontFamily: "var(--font-inclusive)" }}
            >
              Fonctionnalités
            </Link>
            <Link
              href="/particuliers#prevention-sante"
              className="text-dark hover:text-greenMain transition-colors text-base font-medium"
              style={{ fontFamily: "var(--font-inclusive)" }}
            >
              Prévention santé
            </Link>
            <Link
              href="/particuliers#faq"
              className="text-dark hover:text-greenMain transition-colors text-base font-medium"
              style={{ fontFamily: "var(--font-inclusive)" }}
            >
              FAQ
            </Link>
            <Link
              href="/particuliers/magazine"
              className="text-dark hover:text-greenMain transition-colors text-base font-medium"
              style={{ fontFamily: "var(--font-inclusive)" }}
            >
              Le magazine Prévention Santé
            </Link>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button href="/particuliers/connexion" variant="green">
              Se connecter
            </Button>
            <Button href="/particuliers/inscription" variant="dark">
              S&apos;inscrire
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-dark transition-all ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-dark transition-all ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-dark transition-all ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-2">
            <div className="flex flex-col space-y-4">
              <Link
                href="/particuliers#fonctionnalites"
                className="text-dark hover:text-greenMain transition-colors text-base font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ fontFamily: "var(--font-inclusive)" }}
              >
                Fonctionnalités
              </Link>
              <Link
                href="/particuliers#prevention-sante"
                className="text-dark hover:text-greenMain transition-colors text-base font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ fontFamily: "var(--font-inclusive)" }}
              >
                Prévention santé
              </Link>
              <Link
                href="/particuliers#faq"
                className="text-dark hover:text-greenMain transition-colors text-base font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ fontFamily: "var(--font-inclusive)" }}
              >
                FAQ
              </Link>
              <Link
                href="/particuliers/magazine"
                className="text-dark hover:text-greenMain transition-colors text-base font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ fontFamily: "var(--font-inclusive)" }}
              >
                Le magazine Prévention Santé
              </Link>
              <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-2">
                <Button
                  href="/particuliers/connexion"
                  variant="green"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Se connecter
                </Button>
                <Button
                  href="/particuliers/inscription"
                  variant="dark"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  S&apos;inscrire
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
