import { ReactNode } from "react";

export default function ActivationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="bg-gray-1">{children}</div>;
}
