"use client";

import { useState, InputHTMLAttributes } from "react";
import IconEye from "@/app/components/atoms/icons/Eye";
import IconEyeOff from "@/app/components/atoms/icons/EyeOff";

const DATE_PLACEHOLDER = "--/--/----";

/* Formats entered digits as DD/MM/YYYY (max 8) */
function formatDateValue(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  type?: "text" | "email" | "password" | "tel" | "url" | "number" | "date";
  label?: string;
  hintText?: string;
  placeholder?: string;
  showPasswordToggle?: boolean;
  className?: string;
}

export default function Input({
  type = "text",
  label,
  hintText,
  placeholder,
  showPasswordToggle = false,
  className = "",
  disabled,
  onChange,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isDateType = type === "date";
  const inputType =
    type === "password" && showPassword ? "text" : isDateType ? "tel" : type;
  const shouldShowToggle = type === "password" && showPasswordToggle;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDateType) {
      const formatted = formatDateValue(e.target.value);
      e = { ...e, target: { ...e.target, value: formatted } };
    }

    onChange?.(e);
  };

  const dateInputProps = isDateType
    ? {
        inputMode: "numeric" as const,
        autoComplete: "bday" as const,
        placeholder: placeholder ?? DATE_PLACEHOLDER,
        maxLength: 10,
        onChange: handleChange,
      }
    : { onChange };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          className={`block text-dark font-inclusive text-base mb-1 ${
            disabled ? "opacity-60" : ""
          }`}
        >
          {label}
        </label>
      )}
      {hintText && (
        <p className="text-gray-3 font-inclusive text-sm mb-2">{hintText}</p>
      )}
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-3 rounded-lg border border-gray-3 bg-light text-dark
            font-inclusive text-base
            placeholder:text-gray-3
            focus:outline-none focus:ring-2 focus:ring-greenMain focus:border-transparent
            transition-all duration-200
            ${shouldShowToggle ? "pr-12" : ""}
            ${disabled ? "opacity-60 cursor-not-allowed bg-gray-2" : ""}
          `}
          {...props}
          {...dateInputProps}
        />
        {shouldShowToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-4 hover:text-dark transition-colors duration-200"
            aria-label={
              showPassword
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
            }
          >
            {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
