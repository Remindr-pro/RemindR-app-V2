"use client";

import { usePathname } from "next/navigation";
import BannerCta from "../../components/organisms/BannerCta";
import NewsletterSection from "../../components/organisms/NewsletterSection";
import { useAuth } from "@/lib/auth-provider";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

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
        buttonLink: "/dashboard",
      };
    }
    if (pathname?.includes("/professionnels")) {
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
        button: "Réserver votre démo dès aujourd'hui",
        buttonLink: "/professionnels/contact",
      };
    }
    if (pathname?.includes("/particuliers")) {
      return {
        title: (
          <>
            Un pas simple vers <br /> une meilleure prévention.
          </>
        ),
        button: isAuthenticated
          ? "Accéder à mon tableau de bord"
          : "Je crée mon tableau de bord santé",
        buttonLink: "/dashboard",
      };
    }
    return {
      title: (
        <>
          Un pas simple vers <br /> une meilleure prévention.
        </>
      ),
      button: isAuthenticated
        ? "Accéder à mon tableau de bord"
        : "Je crée mon tableau de bord santé",
      buttonLink: "/dashboard",
    };
  };

  const bannerConfig = getBannerConfig();
  const isContactPage =
    pathname === "/particuliers/contact" ||
    pathname === "/professionnels/contact";
  const showBannerCta = !isContactPage;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      {showBannerCta && (
        <BannerCta
          title={bannerConfig.title}
          content={bannerConfig.content}
          button={bannerConfig.button}
          buttonLink={bannerConfig.buttonLink}
        />
      )}
      {pathname?.includes("/particuliers/magazine") && <NewsletterSection />}
    </>
  );
}
