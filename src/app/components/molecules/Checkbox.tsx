"use client";

import { ReactNode } from "react";

interface CheckboxProps {
  id: string;
  label: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function Checkbox({
  id,
  label,
  checked,
  onChange,
  className = "",
}: CheckboxProps) {
  return (
    <div className={`flex items-start gap-3 w-full max-w-md ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-5 h-5 rounded border-2 border-greenMain cursor-pointer shrink-0 appearance-none checked:bg-greenMain checked:border-greenMain relative checked:after:content-['✓'] checked:after:text-light checked:after:text-xs checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 transition-all"
      />
      <label
        htmlFor={id}
        className="text-base font-inclusive text-dark cursor-pointer leading-relaxed"
      >
        {label}
      </label>
    </div>
  );
}
