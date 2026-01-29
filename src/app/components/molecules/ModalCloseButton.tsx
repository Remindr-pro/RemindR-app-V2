"use client";

import IconX from "@/app/components/atoms/icons/X";

interface ModalCloseButtonProps {
  onClose: () => void;
  ariaLabel?: string;
}

export default function ModalCloseButton({
  onClose,
  ariaLabel = "Fermer",
}: ModalCloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="absolute top-5 right-5 w-9 h-9 rounded-full bg-greenMain text-light flex items-center justify-center hover:bg-greenMain-2 transition-colors duration-200 shrink-0 cursor-pointer"
      aria-label={ariaLabel}
    >
      <IconX size={18} className="text-light" />
    </button>
  );
}
