"use client";

import ContactForm from "@/app/components/organisms/ContactForm";

const DESCRIPTION_PROFESSIONNELS =
  "Prêt à transformer l'engagement de vos adhérents ? Contactez notre équipe via le formulaire ci-dessous pour obtenir une démo de nos outils ou discuter de votre projet avec un expert.";

export default function ContactProfessionnelsPage() {
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
          description={DESCRIPTION_PROFESSIONNELS}
        />
      </div>
    </div>
  );
}
