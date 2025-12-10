"use client";

import Image from "next/image";

interface VerificationCardProps {
  image: string;
  title: string;
  description: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function VerificationCard({
  image,
  title,
  description,
  isSelected = false,
  onClick,
}: VerificationCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full bg-light rounded-3xl p-4 border-2 shadow-md transition-all duration-200
        flex items-start gap-4 text-left
        hover:shadow-md active:scale-[0.98] cursor-pointer
        ${isSelected ? "border-greenMain shadow-md" : "border-transparent"}
      `}
    >
      <div className="shrink-0 mt-1">
        <Image
          src={image}
          alt={title}
          width={80}
          height={80}
          className={isSelected ? "opacity-100" : "opacity-80"}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3
          className={`font-inclusive font-bold text-base mb-1 ${
            isSelected ? "text-greenMain" : "text-dark"
          }`}
        >
          {title}
        </h3>
        <p className="font-inclusive text-sm text-dark">{description}</p>
      </div>
    </button>
  );
}
