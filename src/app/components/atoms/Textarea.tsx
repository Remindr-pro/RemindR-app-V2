"use client";

import { TextareaHTMLAttributes } from "react";

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "type"> {
  label?: string;
  hintText?: string;
  placeholder?: string;
  className?: string;
}

export default function Textarea({
  label,
  hintText,
  placeholder,
  className = "",
  disabled,
  ...props
}: TextareaProps) {
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
      <textarea
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-lg border border-gray-3 bg-light text-dark
          font-inclusive text-base
          placeholder:text-gray-3
          focus:outline-none focus:ring-2 focus:ring-greenMain focus:border-transparent
          transition-all duration-200
          resize-y min-h-[120px]
          ${disabled ? "opacity-60 cursor-not-allowed bg-gray-2" : ""}
        `}
        {...props}
      />
    </div>
  );
}
