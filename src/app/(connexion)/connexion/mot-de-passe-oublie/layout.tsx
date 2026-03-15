import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mot de passe oublié | Remindr",
  description:
    "Réinitialisez votre mot de passe Remindr en toute sécurité. Recevez les instructions par email.",
};

export default function MotDePasseOublieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
