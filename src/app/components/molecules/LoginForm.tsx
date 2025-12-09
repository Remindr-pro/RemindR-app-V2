"use client";

import { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Link from "next/link";

interface LoginFormProps {
  onSwitchToActivation?: () => void;
}

export default function LoginForm({ onSwitchToActivation }: LoginFormProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la logique de connexion
    console.log("Connexion avec:", { identifier, password });
  };

  return (
    <div className="bg-light rounded-xl shadow-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-inclusive font-bold text-dark text-center mb-6">
        Je m&apos;identifie
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          type="text"
          label="Mon identifiant"
          hintText="Ex : prenom, prenom.nom, pseudo, etc."
          placeholder="Identifiant"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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
          <Button variant="green" className="w-full">
            Se connecter
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
