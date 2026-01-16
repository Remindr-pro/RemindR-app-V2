"use client";

import React from "react";
import Link from "next/link";

const VARIANTS = {
  fill: {
    base: {
      red: "bg-red-1 outline outline-2 outline-red-1 text-light",
      green: "bg-greenMain outline outline-2 outline-greenMain text-light",
      purple: "bg-purple outline outline-2 outline-purple text-light",
      pink: "bg-pink-1 outline outline-2 outline-pink-1 text-light",
      blue: "bg-blue outline outline-2 outline-blue text-light",
      yellow: "bg-yellow-1 outline outline-2 outline-yellow-1 text-light",
      orange: "bg-orange outline outline-2 outline-blue text-light",
    },
    hover: {
      red: "hover:bg-red-2 hover:outline-red-2",
      green: "hover:bg-[#179275] hover:outline-[##179275]",
      purple: "hover:bg-purple",
      pink: "hover:bg-pink-1",
      blue: "hover:bg-blue",
      yellow: "hover:bg-yellow-1",
      orange: "hover:bg-orange",
    },
  },
  outline: {
    base: {
      red: "bg-transparent outline outline-2 outline-red-1 text-red-1",
      green:
        "bg-transparent outline outline-2 outline-greenMain text-greenMain",
      purple: "bg-transparent outline outline-2 outline-purple text-purple",
      pink: "bg-transparent outline outline-2 outline-pink-1 text-pink-1",
      blue: "bg-transparent outline outline-2 outline-blue text-blue",
      yellow: "bg-transparent outline outline-2 outline-yellow-1 text-yellow-1",
      orange: "bg-transparent outline outline-2 outline-orange text-orange",
    },
    hover: {
      red: "hover:bg-red-1 hover:text-light",
      green: "hover:bg-greenMain hover:text-light",
      purple: "hover:bg-purple hover:text-light",
      pink: "hover:bg-pink hover:text-light",
      blue: "hover:bg-blue hover:text-light",
      yellow: "hover:bg-yellow-1 hover:text-light",
      orange: "hover:bg-orange hover:text-light",
    },
  },
} as const;

const SIZES = {
  sm: "text-xs px-2 py-1",
  md: "text-sm px-3 py-1.5",
} as const;

type ColorType =
  | "red"
  | "green"
  | "purple"
  | "blue"
  | "orange"
  | "yellow"
  | "pink";
type VariantType = "fill" | "outline";
type SizeType = keyof typeof SIZES;

interface BadgeProps {
  text: string;
  color?: ColorType;
  variant?: VariantType;
  size?: SizeType;
  url?: string;
  className?: string;
  onClick?: () => void;
}

const Badge = ({
  text,
  color = "green",
  variant = "fill",
  size = "md",
  url,
  className = "",
  onClick,
}: BadgeProps) => {
  const baseClasses =
    "rounded-full transition-colors duration-200 inline-block font-semibold font-inclusive w-max";
  const variantClasses = VARIANTS[variant].base[color];
  const hoverClasses = url || onClick ? VARIANTS[variant].hover[color] : "";
  const sizeClasses = SIZES[size];
  const cursorClasses = onClick || url ? "cursor-pointer" : "";
  const classes = `${baseClasses} ${variantClasses} ${hoverClasses} ${sizeClasses} ${cursorClasses} ${className}`;

  if (onClick) {
    return (
      <button onClick={onClick} className={classes}>
        {text}
      </button>
    );
  }

  if (url) {
    return (
      <Link href={url} className={classes}>
        {text}
      </Link>
    );
  }

  return <span className={classes}>{text}</span>;
};

export default Badge;
