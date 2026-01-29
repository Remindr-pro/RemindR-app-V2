"use client";

import { useEffect } from "react";
import IconHandWave from "@/app/components/atoms/icons/HandWave";
import Button from "@/app/components/atoms/Button";
import ModalCloseButton from "@/app/components/molecules/ModalCloseButton";
import Link from "next/link";

export interface WelcomeProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onCompleteProfile?: () => void;
  onIgnore?: () => void;
}

export default function WelcomeProfileModal({
  isOpen,
  onClose,
  userName,
  onCompleteProfile,
  onIgnore,
}: WelcomeProfileModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleIgnore = () => {
    onIgnore?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-dark/50 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-light rounded-2xl shadow-xl flex flex-col items-center pt-14 pb-8 px-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalCloseButton onClose={onClose} />

        <IconHandWave size={56} className="text-dark mb-6" />

        <h2
          id="welcome-modal-title"
          className="text-2xl xl:text-3xl font-bold text-dark mb-4"
          style={{ fontFamily: "var(--font-inclusive)" }}
        >
          Bonjour {userName}
        </h2>

        <p
          className="text-base text-gray-4 mb-8 max-w-md leading-relaxed"
          style={{ fontFamily: "var(--font-inclusive)" }}
        >
          Pour découvrir mon espace prévention et avoir des conseils
          personnalisés, je commence dès maintenant à compléter mon profil avec
          quelques informations santé !
        </p>

        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <Link href="/mon-questionnaire-sante">
            <Button
              variant="green"
              onClick={onCompleteProfile}
              className="w-full rounded-xl"
              size="default"
            >
              Compléter mon profil médical
            </Button>
          </Link>

          <button
            type="button"
            onClick={handleIgnore}
            className="text-dark text-base font-normal hover:underline transition-colors cursor-pointer"
            style={{ fontFamily: "var(--font-inclusive)" }}
          >
            Ignorer
          </button>
        </div>
      </div>
    </div>
  );
}
