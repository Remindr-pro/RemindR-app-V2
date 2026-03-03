"use client";

import IconPlus from "@/app/components/atoms/icons/Plus";

interface AddItemButtonProps {
  onClick: () => void;
  ariaLabel?: string;
}

export default function AddItemButton({
  onClick,
  ariaLabel = "Ajouter un élément",
}: AddItemButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="self-center mt-2 w-10 h-10 rounded-full bg-greenMain text-light flex items-center justify-center hover:bg-greenMain-2 transition-colors cursor-pointer"
      aria-label={ariaLabel}
    >
      <span className="leading-none -translate-y-px">
        <IconPlus size={16} />
      </span>
    </button>
  );
}
