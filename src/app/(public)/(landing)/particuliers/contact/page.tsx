"use client";

import ContactForm from "@/app/components/organisms/ContactForm";

const DESCRIPTION_PARTICULIERS =
  "Besoin d'un coup de pouce pour votre bien-être ? Contactez-nous via ce formulaire pour découvrir comment notre outil vous accompagne au quotidien et consulter la liste de nos mutuelles partenaires.";
export default function ContactParticuliersPage() {
  const handleSubmit = async (data: {
    email: string;
    subject: string;
    message: string;
    acceptTerms: boolean;
  }) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        subject: data.subject,
        message: data.message,
      }),
    });
    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(json.error || "Erreur lors de l'envoi du message.");
    }
  };

  return (
    <div className="w-full mx-auto bg-gray-1 rounded-2xl p-8">
      <div className="max-w-[700px] w-full mx-auto p-8 bg-light rounded-2xl">
        <ContactForm
          onSubmit={handleSubmit}
          description={DESCRIPTION_PARTICULIERS}
        />
      </div>
    </div>
  );
}
