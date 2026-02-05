"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import BannerCta from "../components/organisms/BannerCta";
import { useAuth } from "@/lib/auth-provider";
import ChatIcon from "../components/atoms/icons/Chat";
import Chat from "../components/molecules/Chat";
import ToggleRoundedButton from "../components/atoms/ToggleRoundedButton";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [isChatActive, setChatActive] = useState(false);

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
        button: isAuthenticated
          ? "Accéder à mon tableau de bord"
          : "Je crée mon tableau de bord santé",
        buttonLink: isAuthenticated
          ? "/dashboard"
          : "/particuliers/inscription",
      };
    } else {
      // Valeur par défaut
      return {
        title: (
          <>
            Un pas simple vers <br /> une meilleure prévention.
          </>
        ),
        button: isAuthenticated
          ? "Accéder à mon tableau de bord"
          : "Je crée mon tableau de bord santé",
        buttonLink: isAuthenticated
          ? "/dashboard"
          : "/particuliers/inscription",
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

      <div className="fixed bottom-6 right-3 md:bottom-8 md:right-4 z-9999">
        {isChatActive && <Chat onClose={() => setChatActive(false)} />}
        <ToggleRoundedButton
          className="w-12 h-12 md:w-auto md:h-auto relative flex items-center justify-center border-2 border-light"
          onClick={(active) => setChatActive(active)}
          updateField={isChatActive}
          inactiveBackground="primary"
          activeBackground="steel"
          activeTooltipContent="Discussion"
          inactiveTooltipContent="Fermer la discussion"
          tooltipPosition="left"
        >
          <ChatIcon fill="fill-light" />
        </ToggleRoundedButton>
      </div>

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
