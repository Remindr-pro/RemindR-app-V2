import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion | Remindr",
  description:
    "Connectez-vous à votre espace Remindr pour accéder à vos rappels santé et à votre tableau de bord.",
};

export default function ConnexionPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
