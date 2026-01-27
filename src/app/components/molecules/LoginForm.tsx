"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Link from "next/link";
import { useAuth } from "@/lib/auth-provider";

interface LoginFormProps {
  onSwitchToActivation?: () => void;
}

export default function LoginForm({ onSwitchToActivation }: LoginFormProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Utiliser l'email comme identifiant (vous pouvez adapter selon vos besoins)
      await login(identifier, password);
      // Rediriger vers le dashboard après connexion réussie
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light rounded-xl shadow-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-inclusive font-bold text-dark text-center mb-6">
        Je m&apos;identifie
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <Input
          type="email"
          label="Mon email"
          hintText="Votre adresse email"
          placeholder="email@exemple.com"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />

        <div className="space-y-2">
          <Input
            type="password"
            label="Mon mot de passe"
            placeholder="Mot de passe"
            showPasswordToggle={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-right">
            <Link
              href="/connexion/mot-de-passe-oublie"
              className="text-greenMain hover:text-greenMain-2 font-inclusive text-sm transition-colors duration-200"
            >
              Mot de passe oublié ?
            </Link>
          </div>
        </div>

        <div className="pt-2">
          <Button variant="green" className="w-full" type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </div>
      </form>

      {/* Lien mobile uniquement */}
      {onSwitchToActivation && (
        <div className="mt-4 text-center md:hidden">
          <button
            onClick={onSwitchToActivation}
            className="text-greenMain hover:text-greenMain-2 font-inclusive text-sm transition-colors duration-200"
          >
            Pas de compte ?
          </button>
        </div>
      )}
    </div>
  );
}
