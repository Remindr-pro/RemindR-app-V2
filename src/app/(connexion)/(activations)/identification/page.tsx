"use client";

import IdentificationForm from "@/app/components/molecules/IdentificationForm";

export default function IdentificationPage() {
  const handleSubmit = (data: {
    adherentNumber: string;
    birthDate: string;
    email: string;
  }) => {
    // TODO: Implémenter la logique de vérification d'identité
    console.log("Données du formulaire:", data);
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center gap-2 font-inclusive">
      <IdentificationForm buttonHref="/verification" onSubmit={handleSubmit} />
    </div>
  );
}
