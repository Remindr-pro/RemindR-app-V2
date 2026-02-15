"use client";

import { useMemo, useState } from "react";

const BACKGROUND_COLOR = {
  danger: "bg-red-1 hover:bg-red-2 fill-white-400",
  steel: "bg-gray-5 hover:bg-gray-4",
  white: "bg-white hover:bg-gray-2",
  primary: "bg-greenMain hover:bg-greenMain-2 fill-black",
} as const;

type BackgroundColorType = keyof typeof BACKGROUND_COLOR;

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  inactiveBackground?: BackgroundColorType;
  activeBackground?: BackgroundColorType;
  onClick: (isActive: boolean) => void;
  className?: string;
  defaultValue?: boolean;
  updateField?: boolean;
  updateActiveField?: boolean;
  activeTooltipContent?: string;
  inactiveTooltipContent?: string;
  tooltipPosition?: "left" | "right" | "top" | "bottom";
  isPulse?: boolean;
}

const ToggleRoundedButton = ({
  children,
  onClick,
  className,
  inactiveBackground,
  activeBackground,
  defaultValue,
  updateField,
  updateActiveField = true,
  activeTooltipContent,
  inactiveTooltipContent,
  tooltipPosition = "top",
  isPulse = false,
  ...props
}: ButtonProps) => {
  const { danger, steel, white, primary } = BACKGROUND_COLOR;
  const [isActive, setIsActive] = useState(defaultValue ?? false);

  const isControlled = typeof updateField === "boolean";
  const effectiveActive = isControlled ? updateField : isActive;

  function handleToggle() {
    const nextActive = !effectiveActive;
    onClick(nextActive);
    if (!isControlled && updateActiveField) {
      setIsActive(nextActive);
    }
  }

  const inactiveBackgroundColor = useMemo(() => {
    switch (inactiveBackground) {
      case "danger":
        return danger;
      case "white":
        return white;
      case "steel":
        return steel;
      case "primary":
        return primary;
      default:
        return steel;
    }
  }, [inactiveBackground, danger, steel, white, primary]);

  const activeBackgroundColor = useMemo(() => {
    switch (activeBackground) {
      case "danger":
        return danger;
      case "white":
        return white;
      case "primary":
        return primary;
      default:
        return steel;
    }
  }, [activeBackground, danger, steel, white, primary]);

  const tooltipContent = effectiveActive
    ? inactiveTooltipContent
    : activeTooltipContent;

  const isActiveTooltip =
    tooltipContent && (!effectiveActive || inactiveTooltipContent);

  return (
    <button
      {...props}
      onClick={handleToggle}
      type="button"
      aria-label={tooltipContent ?? undefined}
      className={`${
        effectiveActive ? activeBackgroundColor : inactiveBackgroundColor
      } p-4 rounded-full ease-out duration-300 ${
        isPulse ? "animate-pulse-effect" : ""
      } ${className}`}
      {...(isActiveTooltip
        ? { "data-tooltip": tooltipContent, "data-position": tooltipPosition }
        : {})}
    >
      {children}
    </button>
  );
};

export default ToggleRoundedButton;
