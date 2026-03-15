import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Remindr",
  description:
    "Contactez l'équipe Remindr depuis votre espace : support, questions techniques ou accompagnement.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
