import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendrier | Remindr",
  description:
    "Votre calendrier santé Remindr : rendez-vous, rappels et événements pour vous et vos proches.",
};

export default function CalendrierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
