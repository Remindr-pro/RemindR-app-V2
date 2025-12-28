"use client";

interface ToggleProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function Toggle({
  id,
  checked,
  onChange,
  className = "",
}: ToggleProps) {
  return (
    <label
      className={`relative inline-flex items-center cursor-pointer ${className}`}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div
        className={`w-11 h-6 rounded-full transition-colors duration-200 ${
          checked ? "bg-greenMain" : "bg-gray-3"
        } peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-greenMain/50`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-light rounded-full transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
    </label>
  );
}
