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
        title: (
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
        title: (
          <>
            Prêt à renforcer votre stratégie de <br />
            prévention ?
          </>
        ),
        content: (
          <p className="flex flex-col text-left items-start justify-start gap-4 text-base md:text-lg font-inclusive font-medium max-w-2xl">
            <span>
              Remindr accompagne déjà des familles… et peut transformer
              l&apos;engagement de vos adhérents.
            </span>
            <span>
              Programmez une démonstration personnalisée pour découvrir tout le
              potentiel de la plateforme.
            </span>
          </p>
        ),
        button: "Réserver votre démo dès aujourd’hui",
        buttonLink: "/professionnels/contact",
      };
    } else if (pathname?.includes("/particuliers")) {
      return {
        title: (
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
        title: (
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
        title={bannerConfig.title}
        content={bannerConfig.content}
        button={bannerConfig.button}
        buttonLink={bannerConfig.buttonLink}
      />
      <Footer />
    </>
  );
}
