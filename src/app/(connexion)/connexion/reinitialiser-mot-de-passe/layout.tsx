import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réinitialiser le mot de passe | Remindr",
  description:
    "Choisissez un nouveau mot de passe pour votre compte Remindr. Sécurisez à nouveau l'accès à votre espace santé.",
};

export default function ReinitialiserMotDePasseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
