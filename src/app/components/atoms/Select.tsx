"use client";

import { SelectHTMLAttributes } from "react";
import IconChevron from "./icons/Chevron";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "type"> {
  label?: string;
  hintText?: string;
  placeholder?: string;
  options: SelectOption[];
  className?: string;
}

export default function Select({
  label,
  hintText,
  placeholder,
  options,
  className = "",
  disabled,
  ...props
}: SelectProps) {
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
        <select
          disabled={disabled}
          className={`
            w-full px-4 py-3 rounded-lg border border-gray-3 bg-light text-dark
            font-inclusive text-base
            focus:outline-none focus:ring-2 focus:ring-greenMain focus:border-transparent
            transition-all duration-200
            appearance-none pr-10
            ${
              disabled
                ? "opacity-60 cursor-not-allowed bg-gray-2"
                : "cursor-pointer"
            }
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <IconChevron size={20} className="text-gray-4" />
        </div>
      </div>
    </div>
  );
}
