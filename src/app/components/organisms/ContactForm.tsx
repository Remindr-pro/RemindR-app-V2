"use client";

import { useState, FormEvent } from "react";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import Textarea from "../atoms/Textarea";
import Button from "../atoms/Button";
import Checkbox from "../molecules/Checkbox";
import Link from "next/link";

export interface ContactFormData {
  email: string;
  subject: string;
  message: string;
  acceptTerms: boolean;
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void | Promise<void>;
  defaultEmail?: string;
}

const SUBJECT_OPTIONS = [
  { value: "technical", label: "Assistance technique" },
  { value: "contract", label: "Question sur mon contrat" },
  { value: "billing", label: "Question de facturation" },
  { value: "other", label: "Autre" },
];

export default function ContactForm({
  onSubmit,
  defaultEmail = "",
}: ContactFormProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    if (!onSubmit) return;
    setIsSubmitting(true);
    try {
      await onSubmit({
        email,
        subject,
        message,
        acceptTerms,
      });
      setSuccessMessage("Votre message a bien été envoyé. Nous vous répondrons dès que possible.");
      setMessage("");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-dark mb-4 font-inclusive text-center">
        Contactez-nous
      </h1>
      <p className="text-dark font-inclusive text-base mb-8 text-center">
        Pour toute assistance technique ou question concernant votre contrat,
        utilisez le formulaire ci-dessous.
      </p>

      {(successMessage || errorMessage) && (
        <div
          className={`mb-6 p-4 rounded-xl text-sm font-inclusive ${
            successMessage
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
          role="alert"
        >
          {successMessage ?? errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            type="email"
            label="Adresse e-mail"
            placeholder="votre.email@exemple.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Select
            label="Votre sujet"
            placeholder="Sélectionnez un sujet"
            options={SUBJECT_OPTIONS}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <Textarea
          label="Votre message"
          placeholder="Écrivez votre message ici..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          required
        />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="pt-2">
            <Button
              type="submit"
              variant="green"
              className="w-full"
              disabled={!acceptTerms || isSubmitting}
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer votre message"}
            </Button>
          </div>

          <div className="pt-2">
            <Checkbox
              id="accept-terms"
              checked={acceptTerms}
              onChange={setAcceptTerms}
              className="max-w-full"
              label={
                <span className="text-sm font-inclusive text-dark">
                  J&apos;accepte les{" "}
                  <Link
                    href="/conditions-generales-utilisation"
                    className="text-greenMain hover:text-greenMain-2 underline transition-colors duration-200"
                  >
                    Conditions générales d&apos;utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link
                    href="/politique-de-confidentialite"
                    className="text-greenMain hover:text-greenMain-2 underline transition-colors duration-200"
                  >
                    Politique de confidentialité
                  </Link>
                </span>
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
}
