import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href: string;
  variant?: "green" | "dark";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  href,
  variant = "green",
  children,
  className = "",
  onClick,
}: ButtonProps) {
  const baseClasses =
    "px-6 py-3 rounded-lg font-medium text-base whitespace-nowrap transition-all duration-200 text-center inline-flex items-center justify-center hover:shadow-md active:scale-[0.98]";

  const variantClasses = {
    green: "bg-greenMain text-light hover:bg-greenMain-2 active:bg-greenMain-2",
    dark: "bg-dark text-light hover:bg-gray-4 active:bg-gray-4",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <Link
      href={href}
      className={combinedClasses}
      onClick={onClick}
      style={{ fontFamily: "var(--font-inclusive)" }}
    >
      {children}
    </Link>
  );
}
