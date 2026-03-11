"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@/app/components/atoms/Button";
import IconHelp from "@/app/components/atoms/icons/Help";
import Select from "@/app/components/atoms/Select";
import Checkbox from "@/app/components/molecules/Checkbox";

export interface HabitsFormData {
  sportRecurrence: string;
  dietType: string;
  addictions: string[];
}

interface HabitsModalProps {
  isOpen: boolean;
  profileName: string;
  initialData?: HabitsFormData;
  onClose: () => void;
  onSubmit: (data: HabitsFormData) => void;
}

const EMPTY_DATA: HabitsFormData = {
  sportRecurrence: "",
  dietType: "",
  addictions: [],
};

const SPORT_OPTIONS = [
  { value: "Jamais", label: "Jamais" },
  { value: "Une fois par semaine", label: "Une fois par semaine" },
  { value: "2 à 3 fois par semaine", label: "2 à 3 fois par semaine" },
  { value: "4 et plus", label: "4 et plus" },
];

const DIET_OPTIONS = [
  { value: "Omnivore", label: "Omnivore" },
  { value: "Flexitarien", label: "Flexitarien" },
  { value: "Pescétarien", label: "Pescétarien" },
  { value: "Végétarien", label: "Végétarien" },
  { value: "Lacto végétarien", label: "Lacto végétarien" },
  { value: "Ovo-végétarien", label: "Ovo-végétarien" },
  { value: "Lacto-ovo végétarien", label: "Lacto-ovo végétarien" },
  { value: "Végétalien", label: "Végétalien" },
  { value: "Crudivore", label: "Crudivore" },
  { value: "Frugivore", label: "Frugivore" },
  { value: "Carnivore", label: "Carnivore" },
];

const ADDICTION_OPTIONS = [
  "Aucune",
  "Alcool",
  "Tabac",
  "Cannabis",
  "Cocaïne",
  "Héroïne",
  "Amphétamines",
  "Méthamphétamine",
  "MDMA / ecstasy",
  "Opioïdes (morphine, oxycodone, fentanyl)",
  "Médicaments anxiolytiques (benzodiazépines)",
  "Médicaments stimulants",
  "Caféine",
  "Sucre",
  "Nourriture / hyperphagie",
  "Jeux d'argent (gambling)",
  "Jeux vidéo",
  "Internet",
  "Réseaux sociaux",
  "Smartphone",
  "Pornographie",
  "Sexe",
  "Achats compulsifs",
  "Travail",
  "Sport",
  "Hallucinogènes (LSD, psilocybine)",
  "Inhalants / solvants",
];

const HABITS_ICON_PATH = "/images/icons/habits-modale-icon.png";

export default function HabitsModal({
  isOpen,
  profileName,
  initialData,
  onClose,
  onSubmit,
}: HabitsModalProps) {
  const [formData, setFormData] = useState<HabitsFormData>(
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

  const handleAddictionChange = (label: string, checked: boolean) => {
    if (label === "Aucune") {
      setFormData((prev) => ({
        ...prev,
        addictions: checked ? ["Aucune"] : [],
      }));

      return;
    }
    setFormData((prev) => {
      const withoutAucune = prev.addictions.filter((a) => a !== "Aucune");
      const next = checked
        ? [...withoutAucune, label]
        : withoutAucune.filter((a) => a !== label);

      return { ...prev, addictions: next };
    });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-dark/50 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="habits-modal-title"
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] flex flex-col bg-light rounded-2xl shadow-xl pt-10 pb-8 px-6"
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
                  d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </button>
        </div>

        <div className="flex justify-center mb-4 shrink-0">
          <Image
            src={HABITS_ICON_PATH}
            alt="Habitudes et style de vie"
            width={112}
            height={112}
            className="object-contain"
            quality={100}
            unoptimized
            style={{ imageRendering: "crisp-edges" }}
          />
        </div>

        <p className="text-center text-gray-4 font-inclusive text-sm mb-3 shrink-0">
          Profil : {profileName}
        </p>

        <div className="w-full max-w-[430px] mx-auto overflow-y-auto min-h-0 flex-1 px-1 space-y-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <label className="text-dark font-inclusive text-base">
                Activité sportive
              </label>
              <span className="text-gray-4">
                <IconHelp size={14} />
              </span>
            </div>
            <Select
              placeholder="Récurrence"
              options={SPORT_OPTIONS}
              value={formData.sportRecurrence}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  sportRecurrence: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <label className="text-dark font-inclusive text-base">
                Alimentation
              </label>
              <span className="text-gray-4">
                <IconHelp size={14} />
              </span>
            </div>
            <Select
              placeholder="Type d'alimentation"
              options={DIET_OPTIONS}
              value={formData.dietType}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dietType: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <label className="text-dark font-inclusive text-base">
                Addictions
              </label>
              <span className="text-gray-4">
                <IconHelp size={14} />
              </span>
            </div>
            <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-3 bg-light p-3 space-y-2">
              {ADDICTION_OPTIONS.map((option) => (
                <Checkbox
                  key={option}
                  id={`addiction-${option.replace(/\s+/g, "-")}`}
                  label={option}
                  checked={formData.addictions.includes(option)}
                  onChange={(checked) => handleAddictionChange(option, checked)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-6 shrink-0">
          <Button variant="green" onClick={handleSubmit}>
            Valider
          </Button>
        </div>
      </div>
    </div>
  );
}
