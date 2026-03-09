"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import IconX from "@/app/components/atoms/icons/X";
import StepIndicator from "@/app/components/atoms/StepIndicator";
import { BASE_PATH } from "@/app/(private)/mon-questionnaire-sante/constants";

const QUESTIONNAIRE_STEP_LABELS = [
  "Profil(s)",
  "Mesures",
  "Maladies",
  "Habitudes",
];

interface PageConfig {
  step: number;
  title: string;
  description: string;
}

const pageConfigs: Record<string, PageConfig> = {
  [BASE_PATH]: {
    step: 1,
    title: "Je renseigne mon profil et celui de mes proches.",
    description: "",
  },
  [`${BASE_PATH}/mesures`]: {
    step: 2,
    title:
      "Je renseigne mon poids et ma taille pour avoir des conseils personnalisés et suivre mon évolution.",
    description: "",
  },
  [`${BASE_PATH}/maladies`]: {
    step: 3,
    title:
      "Je renseigne mes maladies et mes allergies pour avoir des conseils et des rappels personnalisés.",
    description: "",
  },
  [`${BASE_PATH}/habitudes`]: {
    step: 4,
    title:
      "Je renseigne mes habitudes pour avoir des conseils et des rappels personnalisés.",
    description: "",
  },
};

function getConfigForPath(pathname: string): PageConfig {
  const normalized = pathname?.replace(/\/$/, "") || BASE_PATH;
  let config = pageConfigs[normalized];

  if (!config && normalized !== BASE_PATH) {
    const parts = normalized.split("/").filter(Boolean);
    for (let i = parts.length - 1; i >= 0; i--) {
      const testPath = "/" + parts.slice(0, i + 1).join("/");
      config = pageConfigs[testPath];
      if (config) break;
    }
  }

  if (!config) {
    config = pageConfigs[BASE_PATH];
  }

  return config;
}

export { pageConfigs, getConfigForPath, QUESTIONNAIRE_STEP_LABELS };

interface QuestionnaireLayoutClientProps {
  children: React.ReactNode;
}

export default function QuestionnaireLayoutClient({
  children,
}: QuestionnaireLayoutClientProps) {
  const pathname = usePathname();
  const config = getConfigForPath(pathname ?? "");

  return (
    <div className="flex min-h-screen w-full bg-light">
      <aside className="hidden md:flex w-24 md:w-32 shrink-0 bg-greenMain flex-col items-center py-8">
        <Image
          src="/images/logos/logo-dashboard.svg"
          alt="RemindR"
          width={48}
          height={48}
          className="brightness-0 invert opacity-90"
        />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 bg-light border-b border-gray-2 px-6 xl:px-10 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-inclusive font-bold text-dark">
              Mon questionnaire santé
            </h1>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-gray-4 hover:text-greenMain transition-colors font-inclusive text-sm font-medium"
            >
              <span className="hidden md:block">Quitter</span>
              <span className="w-7 h-7 rounded-full bg-greenMain/10 flex items-center justify-center">
                <IconX size={14} className="text-greenMain" />
              </span>
            </Link>
          </div>
        </header>

        <main className="flex-1 px-6 xl:px-10 py-8 pb-28 max-w-4xl mx-auto w-full">
          <div className="flex flex-col items-center w-full">
            <StepIndicator
              currentStep={config.step}
              stepLabels={QUESTIONNAIRE_STEP_LABELS}
            />

            <h2 className="text-2xl md:text-3xl font-inclusive font-bold text-dark text-center mb-4 w-full">
              {config.title}
            </h2>

            {config.description ? (
              <p className="text-base font-inclusive font-regular text-dark text-center mb-8 w-full">
                {config.description}
              </p>
            ) : null}

            <div className="w-full flex flex-col items-center justify-center">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
