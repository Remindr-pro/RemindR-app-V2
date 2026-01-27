import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
