import type { Metadata } from "next";
import DashboardPageContent from "@/app/(private)/dashboard/DashboardPageContent";

export const metadata: Metadata = {
  title: "Proche | Remindr",
  description:
    "Tableau de bord du proche : rappels santé, événements et recommandations personnalisées.",
};

interface MemberDashboardPageProps {
  params: Promise<{ id: string }>;
}

export default async function MemberDashboardPage({
  params,
}: MemberDashboardPageProps) {
  const { id } = await params;

  return <DashboardPageContent memberId={id} />;
}
