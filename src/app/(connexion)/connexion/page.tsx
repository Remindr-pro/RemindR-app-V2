"use client";

import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import ConnexionCards from "@/app/components/organisms/ConnexionCards";

export default function ConnexionPage() {
  const router = useRouter();

  return (
    <div className="relative w-full flex flex-col items-center justify-center pb-16 md:pb-0">
      <ConnexionCards />

      <button
        type="button"
        onClick={() => router.back()}
        className="absolute left-1/2 -translate-x-1/2 bottom-4 md:fixed md:top-8 md:left-8 md:bottom-auto md:translate-x-0 z-10 inline-flex items-center gap-2 font-inclusive text-dark hover:underline bg-transparent border-none cursor-pointer text-sm md:text-base"
        aria-label="Retour à la page précédente"
      >
        <IconArrowLeft size={20} stroke={2} className="shrink-0" />
        <span>Retour</span>
      </button>
    </div>
  );
}
