import { ReactNode } from "react";

export default function ConnexionLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-red-1 text-light">
      {children}
    </main>
  );
}
