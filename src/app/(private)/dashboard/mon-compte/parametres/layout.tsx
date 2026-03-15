import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paramètres | Remindr",
  description:
    "Modifiez votre mot de passe et gérez les paramètres de sécurité de votre compte Remindr.",
};

export default function ParametresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
