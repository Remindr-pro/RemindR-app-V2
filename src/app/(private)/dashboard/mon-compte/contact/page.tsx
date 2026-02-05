"use client";

import ContactForm from "@/app/components/organisms/ContactForm";
import { useAuth } from "@/lib/auth-provider";

export default function ContactPage() {
  const { user } = useAuth();

  const handleSubmit = (data: {
    email: string;
    subject: string;
    message: string;
    acceptTerms: boolean;
  }) => {
    // TODO: Implémenter l'envoi du formulaire
    console.log("Formulaire soumis:", data);
  };

  return (
    <div className="w-full mx-auto bg-gray-1 rounded-2xl p-8">
      <div className="max-w-[700px] w-full mx-auto p-8 bg-light rounded-2xl">
        <ContactForm
          key={user?.email}
          onSubmit={handleSubmit}
          defaultEmail={user?.email}
        />
      </div>
    </div>
  );
}
