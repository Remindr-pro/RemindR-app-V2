"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import IconSearch from "./icons/Search";

interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  placeholder?: string;
  className?: string;
  size?: "sm" | "default";
  icon?: ReactNode;
}

export default function SearchInput({
  placeholder = "Rechercher",
  className = "",
  size = "default",
  icon,
  disabled,
  ...props
}: SearchInputProps) {
  const sizeClasses =
    size === "sm" ? "px-4 py-2 text-base pl-10" : "px-6 py-3 text-base pl-10";

  const baseClasses = `${sizeClasses} h-[50px] rounded-lg border border-gray-2 bg-transparent text-dark font-inclusive font-medium placeholder:text-gray-3 hover:bg-gray-2 focus:outline-none focus:ring-2 focus:ring-greenMain focus:border-transparent transition-all duration-200`;

  const disabledClasses = disabled
    ? "opacity-60 cursor-not-allowed hover:bg-transparent"
    : "";

  const combinedClasses = `${baseClasses} ${disabledClasses} ${className}`;

  const searchIcon = icon || <IconSearch size={20} className="text-gray-4" />;

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        className={combinedClasses}
        style={{ fontFamily: "var(--font-inclusive)" }}
        {...props}
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
        {searchIcon}
      </span>
    </div>
  );
}
