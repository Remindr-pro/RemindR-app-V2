import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon compte | Remindr",
  description:
    "Gérez les paramètres de votre compte Remindr : profil, notifications, contact et contrat.",
};

export default function AccountPage() {
  return (
    <div className="w-full mx-auto bg-gray-1 rounded-2xl p-8">
      <h1 className="text-4xl font-bold text-dark mb-4 font-inclusive">
        Mon compte
      </h1>
    </div>
  );
}
