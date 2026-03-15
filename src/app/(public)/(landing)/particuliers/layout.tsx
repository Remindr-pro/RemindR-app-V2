import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace Particuliers | Remindr",
  description:
    "Prenez soin de votre santé et de celle de vos proches avec Remindr : rappels personnalisés, calendrier santé partagé et prévention au quotidien.",
};

export default function ParticuliersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
