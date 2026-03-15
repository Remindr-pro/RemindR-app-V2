import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Particuliers | Remindr",
  description:
    "Contactez Remindr pour découvrir comment notre outil vous accompagne au quotidien et consulter la liste de nos mutuelles partenaires.",
};

export default function ContactParticuliersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
