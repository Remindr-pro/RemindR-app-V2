"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BannerCta from "../components/Banner-cta";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Banner configuration
  const getBannerConfig = () => {
    if (pathname?.includes("/particuliers/magazine")) {
      return {
        content: (
          <>
            Je souhaite prendre soin de mes
            <br /> proches et de moi de façon
            <br /> personnalisée, gratuite et fiable.
          </>
        ),
        button: (
          <>
            Je crée mon tableau de bord <br className="md:hidden" />
            santé avec Remindr
          </>
        ),
        buttonLink: "/particuliers/dashboard",
      };
    } else if (pathname?.includes("/professionnels")) {
      return {
        content: (
          <>
            Un pas simple vers <br /> une meilleure prévention.
          </>
        ),
        button: "Découvrir la solution Remindr",
        buttonLink: "/professionnels/contact",
      };
    } else if (pathname?.includes("/particuliers")) {
      return {
        content: (
          <>
            Un pas simple vers <br /> une meilleure prévention.
          </>
        ),
        button: "Je crée mon tableau de bord santé",
        buttonLink: "/particuliers/inscription",
      };
    } else {
      // Valeur par défaut
      return {
        content: (
          <>
            Un pas simple vers <br /> une meilleure prévention.
          </>
        ),
        button: "Je crée mon tableau de bord santé",
        buttonLink: "/particuliers/inscription",
      };
    }
  };

  const bannerConfig = getBannerConfig();

  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      <BannerCta
        content={bannerConfig.content}
        button={bannerConfig.button}
        buttonLink={bannerConfig.buttonLink}
      />
      <Footer />
    </>
  );
}
