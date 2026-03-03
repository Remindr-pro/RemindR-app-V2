"use client";

import { useState } from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import Input from "@/app/components/atoms/Input";
import Button from "@/app/components/atoms/Button";
import { AuthService } from "@/lib/auth-service";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await AuthService.forgotPassword({ email });

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Veuillez réessayer.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center pb-16 md:pb-0">
      <div className="bg-light rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-inclusive font-bold text-dark text-center mb-4">
          Mot de passe oublié
        </h2>

        <p className="text-sm text-gray-4 font-inclusive text-center mb-6">
          Saisissez votre adresse e-mail pour recevoir un lien de
          réinitialisation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div
              className="bg-red-50 border border-red-1 text-red-2 px-4 py-3 rounded-lg text-sm font-inclusive text-center"
              role="alert"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              className="bg-green-50 border border-greenMain text-greenMain px-4 py-3 rounded-lg text-sm font-inclusive text-center"
              role="status"
            >
              Si un compte existe avec cette adresse, un lien de
              réinitialisation vient d&apos;être envoyé.
            </div>
          )}

          <Input
            type="email"
            label="Adresse e-mail"
            hintText="Votre adresse e-mail de connexion"
            placeholder="email@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            variant="green"
            className="w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Envoi..." : "Envoyer le lien"}
          </Button>
        </form>
      </div>

      <Link
        href="/connexion"
        className="absolute left-1/2 -translate-x-1/2 bottom-4 md:fixed md:top-8 md:left-8 md:bottom-auto md:translate-x-0 z-10 inline-flex items-center gap-2 font-inclusive text-dark hover:underline text-sm md:text-base"
      >
        <IconArrowLeft size={20} stroke={2} className="shrink-0" />
        <span>Retour à la connexion</span>
      </Link>
    </div>
  );
}
