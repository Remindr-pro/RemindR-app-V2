"use client";

import React, { useState } from "react";
import IconHelp from "@/app/components/atoms/icons/Help";

interface ColorPickerProps {
  defaultColor?: string;
  onChange?: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  defaultColor = "#1aa484",
  onChange,
}) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    "#1aa484",
    "#4a90e2",
    "#a31b39",
    "#f0e763",
    "#ab7dfa",
    "#f4a261",
    "#795548",
    "#607D8B",
  ];

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onChange?.(color);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <span className="text-base font-inclusive text-dark">
            Couleur associée au compte
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center"
          >
            <IconHelp size={14} className="text-gray-4" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div
            className="w-full cursor-pointer flex items-center gap-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className="w-20 h-10 rounded-sm"
              style={{ backgroundColor: selectedColor }}
            />
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute mt-2 p-4 bg-[#fff] rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${
                  selectedColor === color
                    ? "ring-2 ring-offset-2 ring-gray-400"
                    : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
