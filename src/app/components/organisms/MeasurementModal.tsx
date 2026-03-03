"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Input from "@/app/components/atoms/Input";
import Button from "@/app/components/atoms/Button";
import IconHelp from "@/app/components/atoms/icons/Help";

export interface MeasurementFormData {
  height: string;
  heightMeasuredAt: string;
  weight: string;
  weightMeasuredAt: string;
}

interface MeasurementModalProps {
  isOpen: boolean;
  profileName: string;
  initialData?: MeasurementFormData;
  onClose: () => void;
  onSubmit: (data: MeasurementFormData) => void;
}

const EMPTY_DATA: MeasurementFormData = {
  height: "",
  heightMeasuredAt: "",
  weight: "",
  weightMeasuredAt: "",
};

const STEP_CONFIG = {
  1: {
    title: "Taille",
    iconPath: "/images/icons/size-modale-icon.png",
    iconMaxSize: { maxWidth: 112, maxHeight: 112 },
  },
  2: {
    title: "Poids",
    iconPath: "/images/icons/weight-modale-icon.png",
    iconMaxSize: { maxWidth: 128, maxHeight: 103 },
  },
} as const;

export default function MeasurementModal({
  isOpen,
  profileName,
  initialData,
  onClose,
  onSubmit,
}: MeasurementModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<MeasurementFormData>(
    initialData ?? EMPTY_DATA,
  );

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

  if (!isOpen) return null;

  const isFirstStep = step === 1;
  const currentStepConfig = STEP_CONFIG[step];
  const title = currentStepConfig.title;
  const iconPath = currentStepConfig.iconPath;
  const iconMaxSize = currentStepConfig.iconMaxSize;

  const primaryAction = () => {
    if (isFirstStep) {
      setStep(2);
      return;
    }
    onSubmit(formData);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-dark/50 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="measurement-modal-title"
    >
      <div
        className="relative w-full max-w-md h-[580px] max-h-[90vh] flex flex-col bg-light rounded-2xl shadow-xl pt-10 pb-8 px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-5 right-5 flex items-center gap-2 z-10">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-gray-4 font-inclusive text-sm hover:text-dark transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <span>Quitter</span>
            <span className="w-9 h-9 rounded-full bg-greenMain text-light flex items-center justify-center hover:bg-greenMain-2 transition-colors shrink-0">
            <svg
              width="18"
              height="18"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                fill="currentColor"
              />
            </svg>
            </span>
          </button>
        </div>

        <div className="flex justify-center mb-4 shrink-0">
          <Image
            src={iconPath}
            alt={title}
            width={iconMaxSize.maxWidth}
            height={iconMaxSize.maxHeight}
            className="object-contain"
            quality={100}
            unoptimized
            style={{ imageRendering: "crisp-edges" }}
          />
        </div>

        <p className="text-center text-gray-4 font-inclusive text-sm mb-3 shrink-0">
          Profil : {profileName}
        </p>

        <div className="w-full max-w-[430px] mx-auto overflow-y-auto min-h-0 flex-1 px-1">
          {isFirstStep ? (
            <>
              <div className="flex flex-col mb-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <label
                    htmlFor="measure-height"
                    className="text-dark font-inclusive text-base"
                  >
                    Taille
                  </label>
                  <span className="text-gray-4">
                    <IconHelp size={14} />
                  </span>
                </div>
                <p className="text-gray-3 font-inclusive text-sm mb-2">
                  Ex : 175
                </p>
                <Input
                  id="measure-height"
                  placeholder="Taille en centimètres"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, height: e.target.value }))
                  }
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-1">
                  <label
                    htmlFor="measure-height-date"
                    className="text-dark font-inclusive text-base"
                  >
                    Date de la mesure
                  </label>
                  <span className="text-gray-4">
                    <IconHelp size={14} />
                  </span>
                </div>
                <p className="text-gray-3 font-inclusive text-sm mb-2">
                  Ex : 27/11/2025
                </p>
                <Input
                  id="measure-height-date"
                  placeholder="Date de la mesure"
                  value={formData.heightMeasuredAt}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      heightMeasuredAt: e.target.value,
                    }))
                  }
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col mb-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <label
                    htmlFor="measure-weight"
                    className="text-dark font-inclusive text-base"
                  >
                    Poids
                  </label>
                  <span className="text-gray-4">
                    <IconHelp size={14} />
                  </span>
                </div>
                <p className="text-gray-3 font-inclusive text-sm mb-2">
                  Ex : 91
                </p>
                <Input
                  id="measure-weight"
                  placeholder="Poids en kilos"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, weight: e.target.value }))
                  }
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-1">
                  <label
                    htmlFor="measure-weight-date"
                    className="text-dark font-inclusive text-base"
                  >
                    Date de la mesure
                  </label>
                  <span className="text-gray-4">
                    <IconHelp size={14} />
                  </span>
                </div>
                <p className="text-gray-3 font-inclusive text-sm mb-2">
                  Ex : 27/11/2025
                </p>
                <Input
                  id="measure-weight-date"
                  placeholder="Date de la mesure"
                  value={formData.weightMeasuredAt}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      weightMeasuredAt: e.target.value,
                    }))
                  }
                />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 mt-6 shrink-0">
          {isFirstStep ? (
            <Button variant="outline" onClick={() => setStep(2)}>
              Passer
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setStep(1)}>
              Précédent
            </Button>
          )}

          <Button variant="green" onClick={primaryAction}>
            {isFirstStep ? "Suivant" : "Valider"}
          </Button>
        </div>
      </div>
    </div>
  );
}
