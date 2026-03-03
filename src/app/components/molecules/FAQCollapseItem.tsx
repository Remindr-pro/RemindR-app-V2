"use client";

import { useState } from "react";

interface FAQCollapseItemProps {
  title: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function FAQCollapseItem({
  title,
  children,
  isOpen: controlledIsOpen,
  onToggle,
}: FAQCollapseItemProps) {
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
        <span className="text-2xl text-dark font-light">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && children && (
        <div className="pb-4 text-base font-inclusive text-gray-4">
          {children}
        </div>
      )}
    </div>
  );
}
