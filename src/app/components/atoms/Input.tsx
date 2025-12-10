"use client";

import { useState, InputHTMLAttributes } from "react";
import IconEye from "./icons/Eye";
import IconEyeOff from "./icons/EyeOff";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: "text" | "email" | "password" | "tel" | "url" | "number";
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
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;
  const shouldShowToggle = type === "password" && showPasswordToggle;

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
