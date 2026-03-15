import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Professionnels | Remindr",
  description:
    "Demandez une démo Remindr pour transformer l'engagement de vos adhérents. Échangez avec notre équipe sur votre projet prévention.",
};

export default function ContactProfessionnelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
