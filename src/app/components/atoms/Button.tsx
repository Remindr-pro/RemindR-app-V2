import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  variant?: "green" | "dark" | "light" | "outline";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: ReactNode;
  roundedFull?: boolean;
  size?: "sm" | "default";
}

export default function Button({
  href,
  variant = "green",
  children,
  className = "",
  onClick,
  isActive = false,
  type = "button",
  disabled = false,
  icon,
  roundedFull = false,
  size = "default",
}: ButtonProps) {
  const roundedClass = roundedFull ? "rounded-full" : "rounded-lg";
  const sizeClasses =
    size === "sm" ? "px-4 py-2 text-sm" : "px-6 py-3 text-base";
  const baseClasses = `${sizeClasses} ${roundedClass} font-medium whitespace-nowrap transition-all duration-200 text-center inline-flex items-center justify-center gap-2 hover:shadow-md active:scale-[0.98]`;

  const getVariantClasses = () => {
    const variantConfig = {
      green: {
        baseBg: "bg-greenMain",
        activeBg: "bg-greenMain-2",
        text: "text-light",
        hover: "hover:bg-greenMain-2",
        active: "active:bg-greenMain-2",
        border: "",
      },
      dark: {
        baseBg: "bg-dark",
        activeBg: "bg-gray-4",
        text: "text-light",
        hover: "hover:bg-gray-4",
        active: "active:bg-gray-4",
        border: "",
      },
      light: {
        baseBg: "bg-light",
        activeBg: "bg-gray-2",
        text: "text-dark",
        hover: "hover:bg-gray-2",
        active: "active:bg-gray-2",
        border: "",
      },
      outline: {
        baseBg: "bg-transparent",
        activeBg: "bg-gray-2",
        text: "text-dark",
        border: "border border-gray-2",
        hover: "hover:bg-gray-2",
        active: "active:bg-gray-2",
      },
    };

    const config = variantConfig[variant];
    const bgClass = isActive ? config.activeBg : config.baseBg;

    return `${bgClass} ${config.text} ${config.border} ${config.hover} ${config.active}`;
  };

  const disabledClasses = disabled
    ? "opacity-60 cursor-not-allowed hover:shadow-none active:scale-100"
    : "";

  const combinedClasses = `${baseClasses} ${getVariantClasses()} ${disabledClasses} ${className}`;

  const content = (
    <>
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </>
  );

  return href ? (
    <Link
      href={href}
      className={combinedClasses}
      onClick={onClick}
      style={{ fontFamily: "var(--font-inclusive)" }}
    >
      {content}
    </Link>
  ) : (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      style={{ fontFamily: "var(--font-inclusive)" }}
    >
      {content}
    </button>
  );
}
