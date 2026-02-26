"use client";

import { useState } from "react";

interface CollapseItemProps {
  title: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function CollapseItem({
  title,
  children,
  isOpen: controlledIsOpen,
  onToggle,
}: CollapseItemProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <div className="border-b border-gray-2 last:border-b-0">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between py-4 text-left hover:opacity-80 transition-opacity cursor-pointer"
      >
        <span className="text-base md:text-lg font-inclusive font-medium text-dark">
          {title}
        </span>
        <svg
          className={`w-5 h-5 text-dark transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && children && (
        <div className="pb-4 text-base font-inclusive text-gray-4">
          {children}
        </div>
      )}
    </div>
  );
}
