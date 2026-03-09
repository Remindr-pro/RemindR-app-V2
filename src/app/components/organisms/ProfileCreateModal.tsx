"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/app/components/atoms/Button";
import Input from "@/app/components/atoms/Input";
import Toggle from "@/app/components/atoms/Toggle";
import IconHelp from "@/app/components/atoms/icons/Help";
import IconChevron from "@/app/components/atoms/icons/Chevron";
import ColorPicker from "@/app/components/molecules/ColorPicker";
import type { ProfileEditFormData } from "@/app/components/organisms/ProfileEditModal";
import { sileo } from "sileo";

const DEFAULT_AVATAR = "/images/illustrations/avatar.png";
const DEFAULT_COLOR = "#1aa484";

const LIEN_OPTIONS = [
  { value: "", label: "Lien" },
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

const initialFormData: ProfileEditFormData = {
  firstName: "",
  lastName: "",
  link: "",
  birthdate: "",
  genderBirth: "",
  genderActual: "",
  color: DEFAULT_COLOR,
  email: "",
  createLogin: false,
  password: "",
  confirmPassword: "",
};

export interface ProfileCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onValidate: (data: ProfileEditFormData) => void;
}

function ProfileCreateFormContent({
  onValidate,
  onClose,
}: {
  onValidate: (data: ProfileEditFormData) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] =
    useState<ProfileEditFormData>(initialFormData);

  const canCreateConnectedAccount =
    !!formData.link && formData.link !== "moi";
  const selectedLinkLabel =
    LIEN_OPTIONS.find((opt) => opt.value === formData.link)?.label.toLowerCase() ||
    "proche";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canCreateConnectedAccount && formData.createLogin) {
      if (!formData.email) {
        sileo.error({ title: "Veuillez renseigner un email." });
        return;
      }
      if (formData.password.length < 8) {
        sileo.error({
          title: "Le mot de passe doit contenir au moins 8 caractères.",
        });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        sileo.error({
          title: "La confirmation du mot de passe ne correspond pas.",
        });
        return;
      }
    }
    onValidate(formData);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center overflow-y-auto min-h-0 flex-1 max-h-[calc(90vh-5rem)] px-2"
    >
      {/* Photo de profil */}
      <div className="flex flex-col items-center mb-6 shrink-0">
        <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-2 border-2 border-dashed border-gray-3 flex items-center justify-center">
          <Image
            src={DEFAULT_AVATAR}
            alt="Photo de profil"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="w-full space-y-4 shrink-0">
        {/* Prénom */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <label
              htmlFor="profile-create-firstname"
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
          <Input
            id="profile-create-firstname"
            type="text"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, firstName: e.target.value }))
            }
          />
        </div>

        {/* Nom */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <label
              htmlFor="profile-create-lastname"
              className="text-dark font-inclusive text-base"
            >
              Nom
            </label>
            <span className="text-gray-4">
              <IconHelp size={14} />
            </span>
          </div>
          <Input
            id="profile-create-lastname"
            type="text"
            placeholder="Nom"
            value={formData.lastName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
        </div>

        {/* Lien */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <label
              htmlFor="profile-create-link"
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
              id="profile-create-link"
              value={formData.link}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  link: e.target.value,
                  createLogin:
                    e.target.value && e.target.value !== "moi"
                      ? prev.createLogin
                      : false,
                  email:
                    e.target.value && e.target.value !== "moi"
                      ? prev.email
                      : "",
                  password:
                    e.target.value && e.target.value !== "moi"
                      ? prev.password
                      : "",
                  confirmPassword:
                    e.target.value && e.target.value !== "moi"
                      ? prev.confirmPassword
                      : "",
                }))
              }
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

        {canCreateConnectedAccount && (
          <>
            <div className="flex items-center justify-between rounded-lg border border-gray-3 p-3">
              <div className="flex flex-col">
                <span className="text-dark font-inclusive text-sm font-semibold">
                  {`Créer un compte connecté (${selectedLinkLabel})`}
                </span>
                <span className="text-gray-4 font-inclusive text-xs">
                  Cette personne pourra se connecter avec les identifiants
                  saisis.
                </span>
              </div>
              <Toggle
                id="create-connected-account-create"
                checked={formData.createLogin}
                onChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    createLogin: checked,
                    email: checked ? prev.email : "",
                    password: checked ? prev.password : "",
                    confirmPassword: checked ? prev.confirmPassword : "",
                  }))
                }
              />
            </div>

            {formData.createLogin && (
              <>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 mb-1">
                    <label
                      htmlFor="profile-create-email"
                      className="text-dark font-inclusive text-base"
                    >
                      Email du proche
                    </label>
                    <span className="text-gray-4">
                      <IconHelp size={14} />
                    </span>
                  </div>
                  <Input
                    id="profile-create-email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 mb-1">
                    <label
                      htmlFor="profile-create-password"
                      className="text-dark font-inclusive text-base"
                    >
                      Mot de passe
                    </label>
                  </div>
                  <Input
                    id="profile-create-password"
                    type="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    showPasswordToggle
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 mb-1">
                    <label
                      htmlFor="profile-create-confirm-password"
                      className="text-dark font-inclusive text-base"
                    >
                      Confirmer le mot de passe
                    </label>
                  </div>
                  <Input
                    id="profile-create-confirm-password"
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    showPasswordToggle
                  />
                </div>
              </>
            )}
          </>
        )}

        {/* Date de naissance */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <label
              htmlFor="profile-create-birthdate"
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
          <Input
            id="profile-create-birthdate"
            type="date"
            value={formData.birthdate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, birthdate: e.target.value }))
            }
          />
        </div>

        {/* Genre à la naissance */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <label
              htmlFor="profile-create-gender"
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
              id="profile-create-gender"
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
              htmlFor="profile-create-gender-actual"
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
              id="profile-create-gender-actual"
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
            defaultColor={formData.color}
            onChange={(color) =>
              setFormData((prev) => ({ ...prev, color }))
            }
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

export default function ProfileCreateModal({
  isOpen,
  onClose,
  onValidate,
}: ProfileCreateModalProps) {
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
      aria-labelledby="profile-create-modal-title"
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
                  d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </button>
        </div>

        <ProfileCreateFormContent onValidate={onValidate} onClose={onClose} />
      </div>
    </div>
  );
}
