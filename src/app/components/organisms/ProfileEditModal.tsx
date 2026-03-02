"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/app/components/atoms/Button";
import IconHelp from "@/app/components/atoms/icons/Help";
import IconChevron from "@/app/components/atoms/icons/Chevron";
import ColorPicker from "@/app/components/molecules/ColorPicker";
import type { ProfileItem } from "@/app/components/organisms/QuestionnaireProfilesStep";

const DEFAULT_AVATAR = "/images/illustrations/avatar.png";
const DEFAULT_COLOR = "#1aa484";

const LIEN_OPTIONS = [
  { value: "", label: "Lien" },
  { value: "moi", label: "Moi-même" },
  { value: "conjoint", label: "Conjoint(e)" },
  { value: "enfant", label: "Enfant" },
  { value: "parent", label: "Parent" },
  { value: "autre", label: "Autre" },
];

const GENRE_OPTIONS = [
  { value: "", label: "Genre" },
  { value: "Femme", label: "Femme" },
  { value: "Homme", label: "Homme" },
  { value: "non_precise", label: "Non précisé" },
];

export interface ProfileEditFormData {
  firstName: string;
  lastName: string;
  link: string;
  birthdate: string;
  genderBirth: string;
  genderActual: string;
  color: string;
}

function parseDisplayBirthdate(s: string): string {
  if (!s || s === "--/--/----") return "";
  return s;
}

function profileToFormData(profile: ProfileItem | null): ProfileEditFormData {
  if (!profile) {
    return {
      firstName: "",
      lastName: "",
      link: "",
      birthdate: "",
      genderBirth: "",
      genderActual: "",
      color: DEFAULT_COLOR,
    };
  }
  const [firstName = "", ...lastNameParts] = (profile.name || "").split(" ");
  const lastName = lastNameParts.join(" ");
  const genderValue =
    profile.gender === "Non précisé"
      ? "non_precise"
      : profile.gender === "Homme"
        ? "Homme"
        : "Femme";
  return {
    firstName,
    lastName,
    link: profile.role === "Profil principal" ? "moi" : "",
    birthdate: parseDisplayBirthdate(profile.birthdate),
    genderBirth: genderValue,
    genderActual: genderValue,
    color: profile.color || DEFAULT_COLOR,
  };
}

export interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileItem | null;
  onValidate: (profileId: string, data: ProfileEditFormData) => void;
}

interface ProfileEditFormContentProps {
  profile: ProfileItem | null;
  onValidate: (profileId: string, data: ProfileEditFormData) => void;
  onClose: () => void;
}

function ProfileEditFormContent({
  profile,
  onValidate,
  onClose,
}: ProfileEditFormContentProps) {
  const [formData, setFormData] = useState<ProfileEditFormData>(() =>
    profileToFormData(profile),
  );
  const isMainProfile = profile?.role === "Profil principal";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile) {
      onValidate(profile.id, formData);
      onClose();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center overflow-y-auto min-h-0 flex-1 max-h-[calc(90vh-5rem)]"
    >
      {/* Photo de profil */}
      <div className="flex flex-col items-center mb-6 shrink-0">
        <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-2 border-2 border-dashed border-gray-3 flex items-center justify-center">
          <Image
            src={profile?.avatarUrl || DEFAULT_AVATAR}
            alt="Photo de profil"
            fill
            className="object-cover"
          />
        </div>
        <button
          type="button"
          className="mt-2 flex items-center gap-1.5 text-gray-4 text-sm font-inclusive hover:text-dark transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
          Modifier la photo
        </button>
      </div>

      <div className="w-full space-y-4 shrink-0">
        {/* Prénom */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <label
              htmlFor="profile-firstname"
              className="text-dark font-inclusive text-base"
            >
              Prénom
            </label>
            <span className="text-gray-4">
              <IconHelp size={14} />
            </span>
          </div>
          <p className="text-gray-3 font-inclusive text-sm mb-2">
            Ex : Prénom, pseudo
          </p>
          <input
            id="profile-firstname"
            type="text"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-3 bg-light text-dark font-inclusive text-base placeholder:text-gray-3 focus:outline-none focus:ring-2 focus:ring-greenMain focus:border-transparent"
          />
        </div>

        {/* Nom */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <label
              htmlFor="profile-lastname"
              className="text-dark font-inclusive text-base"
            >
              Nom
            </label>
            <span className="text-gray-4">
              <IconHelp size={14} />
            </span>
          </div>
          <input
            id="profile-lastname"
            type="text"
            placeholder="Nom"
            value={formData.lastName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-3 bg-light text-dark font-inclusive text-base placeholder:text-gray-3 focus:outline-none focus:ring-2 focus:ring-greenMain focus:border-transparent"
          />
        </div>

        {/* Lien */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <label
              htmlFor="profile-link"
              className="text-dark font-inclusive text-base"
            >
              Lien
            </label>
            <span className="text-gray-4">
              <IconHelp size={14} />
            </span>
          </div>
          <div className="relative">
            <select
              id="profile-link"
              value={formData.link}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, link: e.target.value }))
              }
              disabled={isMainProfile}
              className="w-full px-4 py-3 rounded-lg border border-gray-3 bg-light text-dark font-inclusive text-base focus:outline-none focus:ring-2 focus:ring-greenMain appearance-none pr-10 cursor-pointer"
            >
              {LIEN_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <IconChevron size={20} className="text-gray-4" />
            </div>
          </div>
        </div>

        {/* Date de naissance */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <label
              htmlFor="profile-birthdate"
              className="text-dark font-inclusive text-base"
            >
              Date de naissance
            </label>
            <span className="text-gray-4">
              <IconHelp size={14} />
            </span>
          </div>
          <p className="text-gray-3 font-inclusive text-sm mb-2">
            Ex : 28/12/1999
          </p>
          <input
            id="profile-birthdate"
            type="text"
            placeholder="Date de naissance"
            value={formData.birthdate}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                birthdate: e.target.value,
              }))
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-3 bg-light text-dark font-inclusive text-base placeholder:text-gray-3 focus:outline-none focus:ring-2 focus:ring-greenMain focus:border-transparent"
          />
        </div>

        {/* Genre à la naissance */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <label
              htmlFor="profile-gender"
              className="text-dark font-inclusive text-base"
            >
              Genre à la naissance
            </label>
            <span className="text-gray-4">
              <IconHelp size={14} />
            </span>
          </div>
          <div className="relative">
            <select
              id="profile-gender"
              value={formData.genderBirth}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  genderBirth: e.target.value,
                }))
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-3 bg-light text-dark font-inclusive text-base focus:outline-none focus:ring-2 focus:ring-greenMain appearance-none pr-10 cursor-pointer"
            >
              {GENRE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <IconChevron size={20} className="text-gray-4" />
            </div>
          </div>
        </div>

        {/* Genre actuel */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <label
              htmlFor="profile-gender-actual"
              className="text-dark font-inclusive text-base"
            >
              Genre actuel
            </label>
            <span className="text-gray-4">
              <IconHelp size={14} />
            </span>
          </div>
          <div className="relative">
            <select
              id="profile-gender-actual"
              value={formData.genderActual}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  genderActual: e.target.value,
                }))
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-3 bg-light text-dark font-inclusive text-base focus:outline-none focus:ring-2 focus:ring-greenMain appearance-none pr-10 cursor-pointer"
            >
              {GENRE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <IconChevron size={20} className="text-gray-4" />
            </div>
          </div>
        </div>

        {/* Couleur */}
        <div>
          <ColorPicker
            key={profile?.id ?? "new"}
            defaultColor={formData.color}
            onChange={(color) => setFormData((prev) => ({ ...prev, color }))}
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="green"
        className="w-full mt-6 rounded-xl"
        size="default"
      >
        Valider
      </Button>
    </form>
  );
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  profile,
  onValidate,
}: ProfileEditModalProps) {
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-dark/50 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-edit-modal-title"
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] flex flex-col bg-light rounded-2xl shadow-xl pt-10 pb-8 px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête : Quitter + X */}
        <div className="absolute top-5 right-5 flex items-center gap-2 z-10">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-4 font-inclusive text-sm hover:text-dark transition-colors"
          >
            Quitter
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-greenMain text-light flex items-center justify-center hover:bg-greenMain-2 transition-colors shrink-0"
            aria-label="Fermer"
          >
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
          </button>
        </div>

        <ProfileEditFormContent
          key={profile?.id ?? "new"}
          profile={profile}
          onValidate={onValidate}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
