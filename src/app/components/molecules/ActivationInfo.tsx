"use client";

import Button from "@/app/components/atoms/Button";

interface ActivationInfoProps {
  onSwitchToLogin?: () => void;
}

export default function ActivationInfo({
  onSwitchToLogin,
}: ActivationInfoProps) {
  return (
    <div className="bg-light rounded-xl shadow-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-inclusive font-bold text-dark text-center mb-6">
        Pas encore de compte ?
      </h2>

      <p className="text-gray-4 font-inclusive text-base mb-6 text-left">
        Si vous n&apos;avez pas encore d&apos;accès, vous pouvez activer votre
        espace uniquement via le lien sécurisé envoyé par votre mutuelle
        partenaire ou en rejoignant l&apos;une de nos mutuelles partenaires.
      </p>

      <div className="space-y-4">
        <Button variant="green" href="/bienvenue" className="w-full">
          Renvoyer le lien d&apos;activation
        </Button>

        <Button variant="dark" href="#" className="w-full">
          Voir nos mutuelles partenaires
        </Button>
      </div>

      {/* Lien mobile uniquement */}
      {onSwitchToLogin && (
        <div className="mt-4 text-center md:hidden">
          <button
            onClick={onSwitchToLogin}
            className="text-greenMain hover:text-greenMain-2 font-inclusive text-sm transition-colors duration-200"
          >
            Se connecter
          </button>
        </div>
      )}
    </div>
  );
}
