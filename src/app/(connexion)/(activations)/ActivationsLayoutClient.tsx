"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import StepIndicator from "@/app/components/atoms/StepIndicator";

interface PageConfig {
  step: number;
  title: string;
  description: string;
}

const pageConfigs: Record<string, PageConfig> = {
  "/bienvenue": {
    step: 0,
    title: "Bienvenue dans votre espace Prévention Personnalisé",
    description:
      "Santé care vous offre l'accès à un espace sécurisé vous permettant d'accéder à des recommandations adaptées à votre profil, afin de préserver votre santé au quotidien.",
  },
  "/identification": {
    step: 1,
    title: "Je vérifie mon identité",
    description:
      "Cette étape nous permet de nous assurer que cet accès vous est bien destiné et que les infos de Santé care sont correctes.",
  },
  "/verification": {
    step: 2,
    title: "Mon code provisoire",
    description: "Je choisis le mode de vérification sécurisé de mon identité.",
  },
  "/verification/code": {
    step: 2,
    title: "Mon code provisoire",
    description: "Je saisis le code à 6 chiffres reçu au 06 ** ** **45.",
  },
  "/activation": {
    step: 3,
    title: "J'active mon compte",
    description:
      "Vos données personnelles et informations de santé sont strictement confidentielles. Elles sont utilisées uniquement pour le fonctionnement de votre espace Prévention Personnalisé, selon la réglementation en vigueur (RGPD).",
  },
  "/compte": {
    step: 4,
    title: "Mon compte",
    description:
      "Choisissez votre identifiant et définissez un mot de passe sécurisé. Ils vous permettront d'accéder, en toute confidentialité, à votre espace personnel.",
  },
  "/compte-active": {
    step: 5,
    title: "Mon compte a bien été activé !",
    description:
      "Vous pouvez désormais accéder à votre espace personnel, découvrir vos recommandations prévention et activer des rappels pour vous accompagner au quotidien.",
  },
};

export default function ActivationsLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const relativePath = pathname || "/bienvenue";

  let config: PageConfig | undefined;

  config = pageConfigs[relativePath];

  if (!config && relativePath !== "/") {
    const parts = relativePath.split("/").filter(Boolean);

    for (let i = parts.length - 1; i >= 0; i--) {
      const testPath = "/" + parts.slice(0, i + 1).join("/");

      config = pageConfigs[testPath];

      if (config) break;
    }
  }

  if (!config) {
    config = pageConfigs["/bienvenue"];
  }

  return (
    <div className="bg-gray-1 w-full">
      <div className="w-full max-w-md md:max-w-3xl mx-auto flex flex-col items-center">
        <StepIndicator currentStep={config.step} />

        <h1 className="text-3xl md:text-5xl font-inclusive font-bold text-dark text-center mb-4 px-4">
          {config.title}
        </h1>

        <p className="text-base font-inclusive font-regular text-dark text-center mb-8 px-4">
          {config.description}
        </p>

        <div className="w-full flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
