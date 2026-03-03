"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import AddItemButton from "../atoms/AddItemButton";
import IconHelp from "../atoms/icons/Help";
import Select from "../atoms/Select";
import Input from "../atoms/Input";
import Checkbox from "../molecules/Checkbox";
import { sileo } from "sileo";

export interface DiseaseFormData {
  allergies: string[];
  chronicConditions: string[];
  allergyTreatments: string[];
  diseaseTreatments: string[];
  noAllergy: boolean;
  noDisease: boolean;
}

interface DiseaseModalProps {
  isOpen: boolean;
  profileName: string;
  initialData?: DiseaseFormData;
  onClose: () => void;
  onSubmit: (data: DiseaseFormData) => void;
}

const EMPTY_DATA: DiseaseFormData = {
  allergies: [""],
  chronicConditions: [""],
  allergyTreatments: [""],
  diseaseTreatments: [""],
  noAllergy: false,
  noDisease: false,
};

const ALLERGY_OPTIONS = [
  "",
  "Pollen",
  "Acariens",
  "Poils d'animaux",
  "Arachides",
  "Gluten",
  "Lactose",
  "Autre",
];

const DISEASE_OPTIONS = [
  "",
  "Asthme",
  "Diabète",
  "Hypertension",
  "Migraine",
  "Thyroïde",
  "Autre",
];

const TREATMENT_OPTIONS = [
  "",
  "Aucun traitement",
  "Traitement quotidien",
  "Traitement ponctuel",
  "Suivi médical",
  "Autre",
];

const STEP_CONFIG = {
  1: {
    title: "Allergies",
    iconPath: "/images/icons/allergy-modale-icon.png",
    iconMaxSize: { maxWidth: 128, maxHeight: 103 },
  },
  2: {
    title: "Maladies",
    iconPath: "/images/icons/treatment-modale-icon.png",
    iconMaxSize: { maxWidth: 128, maxHeight: 103 },
  },
} as const;

type DiseaseFieldKey =
  | "allergies"
  | "chronicConditions"
  | "allergyTreatments"
  | "diseaseTreatments";

function buildSelectOptions(
  label: string,
  index: number,
  options: string[],
): { value: string; label: string }[] {
  const defaultLabel =
    label === "Traitements"
      ? `Traitement ${index + 1}`
      : `${label.slice(0, -1)} ${index + 1}`;

  return [
    { value: "", label: defaultLabel },
    ...options
      .filter((option) => option)
      .map((option) => ({ value: option, label: option })),
  ];
}

function ensureArray(data: string[] | undefined): string[] {
  if (!data || data.length === 0) return [""];
  return data;
}

function normalizeFieldValues(
  items: string[] | undefined,
  options: string[],
): { values: string[]; others: string[] } {
  const rawItems = ensureArray(items);
  const values: string[] = [];
  const others: string[] = [];

  rawItems.forEach((item) => {
    const trimmed = item.trim();
    if (!trimmed) {
      values.push("");
      others.push("");
      return;
    }

    if (options.includes(trimmed)) {
      values.push(trimmed);
      others.push("");
      return;
    }

    values.push("Autre");
    others.push(trimmed);
  });

  return { values, others };
}

export default function DiseaseModal({
  isOpen,
  profileName,
  initialData,
  onClose,
  onSubmit,
}: DiseaseModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const initialAllergies = normalizeFieldValues(
    initialData?.allergies,
    ALLERGY_OPTIONS,
  );
  const initialDiseases = normalizeFieldValues(
    initialData?.chronicConditions,
    DISEASE_OPTIONS,
  );
  const initialTreatments = normalizeFieldValues(
    initialData?.allergyTreatments,
    TREATMENT_OPTIONS,
  );
  const initialDiseaseTreatments = normalizeFieldValues(
    initialData?.diseaseTreatments,
    TREATMENT_OPTIONS,
  );

  const [formData, setFormData] = useState<DiseaseFormData>({
    allergies: initialData ? initialAllergies.values : EMPTY_DATA.allergies,
    chronicConditions: initialData
      ? initialDiseases.values
      : EMPTY_DATA.chronicConditions,
    allergyTreatments: initialData
      ? initialTreatments.values
      : EMPTY_DATA.allergyTreatments,
    diseaseTreatments: initialData
      ? initialDiseaseTreatments.values
      : EMPTY_DATA.diseaseTreatments,
    noAllergy: initialData?.noAllergy ?? EMPTY_DATA.noAllergy,
    noDisease: initialData?.noDisease ?? EMPTY_DATA.noDisease,
  });
  const [otherValues, setOtherValues] = useState<Record<DiseaseFieldKey, string[]>>(
    {
      allergies: initialData ? initialAllergies.others : [""],
      chronicConditions: initialData ? initialDiseases.others : [""],
      allergyTreatments: initialData ? initialTreatments.others : [""],
      diseaseTreatments: initialData ? initialDiseaseTreatments.others : [""],
    },
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

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const resolveItemsForSubmit = (key: DiseaseFieldKey): string[] | null => {
    const items = formData[key].map((item, index) => {
      if (item !== "Autre") return item.trim();
      return (otherValues[key][index] || "").trim();
    });

    const hasMissingOther = formData[key].some(
      (item, index) => item === "Autre" && !((otherValues[key][index] || "").trim()),
    );
    if (hasMissingOther) {
      sileo.error({ title: "Veuillez préciser la valeur pour \"Autre\"." });
      return null;
    }

    return items.filter(Boolean);
  };

  const handleValidate = () => {
    const allergies = resolveItemsForSubmit("allergies");
    const chronicConditions = resolveItemsForSubmit("chronicConditions");
    const allergyTreatments = resolveItemsForSubmit("allergyTreatments");
    const diseaseTreatments = resolveItemsForSubmit("diseaseTreatments");

    if (!allergies || !chronicConditions || !allergyTreatments || !diseaseTreatments)
      return;

    onSubmit({
      allergies: formData.noAllergy ? [] : allergies,
      chronicConditions: formData.noDisease ? [] : chronicConditions,
      allergyTreatments,
      diseaseTreatments,
      noAllergy: formData.noAllergy,
      noDisease: formData.noDisease,
    });
  };

  const updateItem = (
    key: DiseaseFieldKey,
    index: number,
    value: string,
  ) => {
    setFormData((prev) => {
      const next = [...prev[key]];
      next[index] = value;
      return { ...prev, [key]: next };
    });

    if (value !== "Autre") {
      setOtherValues((prev) => {
        const next = [...prev[key]];
        next[index] = "";
        return { ...prev, [key]: next };
      });
    }
  };

  const updateOtherValue = (
    key: DiseaseFieldKey,
    index: number,
    value: string,
  ) => {
    setOtherValues((prev) => {
      const next = [...prev[key]];
      next[index] = value;
      return { ...prev, [key]: next };
    });
  };

  const addItem = (key: DiseaseFieldKey) => {
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
    setOtherValues((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  };

  const renderSelectList = (
    key: DiseaseFieldKey,
    label: string,
    options: string[],
  ) => (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5 mb-1">
        <label className="text-dark font-inclusive text-base">{label}</label>
        <span className="text-gray-4">
          <IconHelp size={14} />
        </span>
      </div>

      <div className="space-y-2">
        {formData[key].map((item, index) => (
          <div key={`${key}-${index}`}>
            <Select
              value={item}
              onChange={(e) => updateItem(key, index, e.target.value)}
              options={buildSelectOptions(label, index, options)}
            />
            {item === "Autre" && (
              <Input
                placeholder="Précisez..."
                value={otherValues[key][index] || ""}
                onChange={(e) => updateOtherValue(key, index, e.target.value)}
                className="mt-2"
              />
            )}
          </div>
        ))}
      </div>

      <AddItemButton
        onClick={() => addItem(key)}
        ariaLabel={`Ajouter ${label.toLowerCase()}`}
      />
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-dark/50 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="disease-modal-title"
    >
      <div
        className="relative w-full max-w-md h-[680px] max-h-[90vh] flex flex-col bg-light rounded-2xl shadow-xl pt-10 pb-8 px-6"
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
            src={currentStepConfig.iconPath}
            alt={currentStepConfig.title}
            width={currentStepConfig.iconMaxSize.maxWidth}
            height={currentStepConfig.iconMaxSize.maxHeight}
            className="object-contain"
            quality={100}
            unoptimized
            style={{ imageRendering: "crisp-edges" }}
          />
        </div>

        <p className="text-center text-gray-4 font-inclusive text-sm mb-3 shrink-0">
          Profil : {profileName}
        </p>

        <div className="w-full max-w-[430px] mx-auto overflow-y-auto min-h-0 flex-1 px-1 space-y-3">
          {isFirstStep ? (
            <>
              {renderSelectList("allergies", "Allergies", ALLERGY_OPTIONS)}
              {renderSelectList(
                "allergyTreatments",
                "Traitements",
                TREATMENT_OPTIONS,
              )}
              <Checkbox
                id="no-allergy-checkbox"
                checked={formData.noAllergy}
                onChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    noAllergy: checked,
                    allergies: checked ? [""] : prev.allergies,
                  }))
                }
                label={
                  <span className="text-gray-4 font-inclusive text-base">
                    Je n&apos;ai pas d&apos;allergie à renseigner.
                  </span>
                }
                className="mt-2"
              />
            </>
          ) : (
            <>
              {renderSelectList(
                "chronicConditions",
                "Maladies",
                DISEASE_OPTIONS,
              )}
              {renderSelectList(
                "diseaseTreatments",
                "Traitements",
                TREATMENT_OPTIONS,
              )}
              <Checkbox
                id="no-disease-checkbox"
                checked={formData.noDisease}
                onChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    noDisease: checked,
                    chronicConditions: checked ? [""] : prev.chronicConditions,
                  }))
                }
                label={
                  <span className="text-gray-4 font-inclusive text-base">
                    Je n&apos;ai pas de maladie à renseigner.
                  </span>
                }
                className="mt-2"
              />
            </>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 mt-6 shrink-0">
          <Button
            variant="outline"
            onClick={isFirstStep ? onClose : () => setStep(1)}
          >
            Précédent
          </Button>

          <Button
            variant="green"
            onClick={isFirstStep ? () => setStep(2) : handleValidate}
          >
            {isFirstStep ? "Suivant" : "Valider"}
          </Button>
        </div>
      </div>
    </div>
  );
}
