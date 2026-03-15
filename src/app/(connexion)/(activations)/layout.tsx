import type { Metadata } from "next";
import ActivationsLayoutClient from "./ActivationsLayoutClient";

export const metadata: Metadata = {
  title: "Activation de compte | Remindr",
  description:
    "Activez votre espace Remindr : vérification d'identité, code de sécurité et création de votre compte pour accéder à vos rappels santé.",
};

export default function ActivationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ActivationsLayoutClient>{children}</ActivationsLayoutClient>;
}
