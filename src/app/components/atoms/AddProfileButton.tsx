"use client";

import IconPlus from "./icons/Plus";

interface AddProfileButtonProps {
  onClick: () => void;
  ariaLabel?: string;
}

export default function AddProfileButton({
  onClick,
  ariaLabel = "Ajouter un profil",
}: AddProfileButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-20 h-20 rounded-full bg-greenMain text-light flex items-center justify-center hover:bg-greenMain-2 transition-colors duration-200 shrink-0 cursor-pointer shadow-md hover:shadow-lg"
      aria-label={ariaLabel}
    >
      <IconPlus size={32} />
    </button>
  );
}
