import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications | Remindr",
  description:
    "Gérez vos préférences de notifications Remindr : rappels santé, conseils personnalisés et actualités.",
};

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
