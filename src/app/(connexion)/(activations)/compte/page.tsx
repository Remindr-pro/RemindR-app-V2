"use client";

import AccountForm from "@/app/components/molecules/AccountForm";

export default function ComptePage() {
  const handleSubmit = (data: {
    identifier: string;
    password: string;
    confirmPassword: string;
  }) => {
    // TODO: Implémenter la logique de création de compte
    console.log("Données du formulaire:", data);
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center gap-2 font-inclusive">
      <AccountForm buttonHref="/compte-active" onSubmit={handleSubmit} />
    </div>
  );
}
