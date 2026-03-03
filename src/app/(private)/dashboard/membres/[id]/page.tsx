import DashboardPageContent from "@/app/(private)/dashboard/DashboardPageContent";

interface MemberDashboardPageProps {
  params: Promise<{ id: string }>;
}

export default async function MemberDashboardPage({
  params,
}: MemberDashboardPageProps) {
  const { id } = await params;

  return <DashboardPageContent memberId={id} />;
}
