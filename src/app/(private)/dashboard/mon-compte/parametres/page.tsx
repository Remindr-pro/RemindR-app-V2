"use client";

import Image from "next/image";
import Input from "@/app/components/atoms/Input";
import { useAuth } from "@/lib/auth-provider";

export default function ParametresPage() {
  const { user } = useAuth();

  return (
    <div className="w-full mx-auto pt-8">
      <div className="p-8 bg-light rounded-2xl">
        <h1 className="text-4xl font-bold text-dark mb-6 font-inclusive">
          Paramètres
        </h1>

        <p className="text-base text-dark font-inclusive mb-8 leading-relaxed">
          <span className="font-bold text-xl">
            Gérez vos paramètres de connexion.
          </span>
          <br />
          Ici, vous pouvez modifier vos paramètres de connexion et supprimer
          votre compte.
        </p>

        <div className="flex flex-col gap-8">
          {/* Section Identifiants */}
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-3">
              <Image
                src="/images/icons/identification.png"
                alt="Identifiants"
                width={35}
                height={35}
                className="w-9 h-9"
              />
              <h2 className="text-lg font-bold text-dark font-inclusive">
                Identifiants
              </h2>
            </div>

            <div className="flex flex-col gap-6 pl-9">
              <Input
                type="email"
                label="Adresse e-mail"
                defaultValue={user?.email}
              />
              <Input
                type="password"
                label="Ancien mot de passe"
                showPasswordToggle
              />
              <Input
                type="password"
                label="Nouveau mot de passe"
                showPasswordToggle
              />
            </div>
          </div>

          {/* Section Suppression du compte */}
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-3">
              <Image
                src="/images/icons/suppression.png"
                alt="Suppression du compte"
                width={35}
                height={35}
                className="w-9 h-9"
              />
              <h2 className="text-lg font-bold text-dark font-inclusive">
                Suppression du compte
              </h2>
            </div>

            <div className="flex flex-col pl-9">
              <p className="text-base text-dark font-inclusive leading-relaxed">
                Supprimez votre compte et toutes les données associées. Aucune
                récupération possible.
              </p>
              <a
                href="#"
                className="text-greenMain underline font-inclusive text-base hover:text-greenMain-2 transition-colors"
              >
                Supprimer votre compte
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
