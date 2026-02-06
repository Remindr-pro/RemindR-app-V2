"use client";

import Image from "next/image";
import IconX from "../atoms/icons/X";
import Button from "../atoms/Button";

export interface ProfileQuestionnaireCardProps {
  name: string;
  role: string;
  birthdate: string;
  gender: "Femme" | "Homme" | "Non précisé";
  avatarUrl?: string;
  onComplete: () => void;
  onRemove?: () => void;
}

const defaultAvatar = "/images/illustrations/avatar.png";

export default function ProfileQuestionnaireCard({
  name,
  role,
  birthdate,
  gender,
  avatarUrl,
  onComplete,
  onRemove,
}: ProfileQuestionnaireCardProps) {
  return (
    <div className="bg-light rounded-2xl p-6 border-2 border-purple shadow-sm hover:shadow-md transition-shadow flex flex-col relative min-w-[240px]">
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-greenMain text-light flex items-center justify-center hover:bg-greenMain-2 transition-colors duration-200 shrink-0 cursor-pointer z-10"
          aria-label="Supprimer le profil"
        >
          <IconX size={18} className="text-light" />
        </button>
      )}

      <div className="relative h-24 w-24 rounded-full overflow-hidden mx-auto mb-4">
        <Image
          src={avatarUrl || defaultAvatar}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col flex-1 text-center">
        <h3 className="text-xl font-bold text-dark mb-1 font-inclusive">
          {name}
        </h3>
        <p className="text-sm text-gray-4 font-inclusive mb-2">{role}</p>
        <div className="flex flex-col gap-1 text-sm text-gray-4 font-inclusive mb-4">
          <span>{birthdate}</span>
          <span>{gender}</span>
        </div>

        <Button
          variant="green"
          onClick={onComplete}
          className="w-full mt-auto"
          size="default"
        >
          Compléter
        </Button>
      </div>
    </div>
  );
}
