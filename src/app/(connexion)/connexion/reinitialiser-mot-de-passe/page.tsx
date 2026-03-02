"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/app/components/atoms/Input";
import Button from "@/app/components/atoms/Button";
import { AuthService } from "@/lib/auth-service";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      !!token &&
      newPassword.length >= 8 &&
      confirmPassword.length >= 8 &&
      newPassword === confirmPassword &&
      !loading
    );
  }, [confirmPassword, loading, newPassword, token]);

  useEffect(() => {
    if (!token) {
      router.replace("/connexion");
    }
  }, [router, token]);

  if (!token) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    if (!token) {
      setError("Le lien est invalide. Le token est manquant.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("La confirmation du mot de passe ne correspond pas.");
      return;
    }

    try {
      setLoading(true);
      await AuthService.resetPassword({ token, newPassword });
      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
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
    <div className="bg-light rounded-xl shadow-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-inclusive font-bold text-dark text-center mb-4">
        Réinitialiser le mot de passe
      </h2>

      <p className="text-sm text-gray-4 font-inclusive text-center mb-6">
        Choisissez un nouveau mot de passe sécurisé.
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
            Mot de passe modifié avec succès. Vous pouvez maintenant vous
            connecter.
          </div>
        )}

        <Input
          type="password"
          label="Nouveau mot de passe"
          placeholder="Au moins 8 caractères"
          showPasswordToggle
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <Input
          type="password"
          label="Confirmer le mot de passe"
          placeholder="Confirmez le nouveau mot de passe"
          showPasswordToggle
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button
          variant="green"
          className="w-full"
          type="submit"
          disabled={!canSubmit}
        >
          {loading ? "Validation..." : "Valider"}
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center pb-16 md:pb-0">
      <Suspense
        fallback={
          <div className="bg-light rounded-xl shadow-lg p-8 w-full max-w-md text-center font-inclusive">
            Chargement...
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>

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
