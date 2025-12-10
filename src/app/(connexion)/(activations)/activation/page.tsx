"use client";

import { useState } from "react";
import Button from "@/app/components/atoms/Button";
import Checkbox from "@/app/components/molecules/Checkbox";
import Image from "next/image";
import Link from "next/link";

export default function ActivationPage() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center gap-2 font-inclusive">
      <Image
        src="/images/icons/insurance.png"
        alt="Insurance icon"
        width={100}
        height={100}
        className="w-16 h-16 md:w-[100px] md:h-[100px] mb-8"
      />

      <div className="flex flex-col items-center gap-3">
        <Checkbox
          id="accept-cgu"
          label={
            <>
              J&apos;accepte les Conditions Générale d&apos;Utilisation et la
              Politique de Protection des Donnnées Personnelles
            </>
          }
          checked={accepted}
          onChange={setAccepted}
        />

        <div className="text-center mt-4">
          {accepted ? (
            <Button variant="green" href="/compte">
              Activer mon espace
            </Button>
          ) : (
            <Button
              variant="green"
              className="opacity-50 cursor-not-allowed pointer-events-none"
            >
              Activer mon espace
            </Button>
          )}
        </div>

        <div className="flex flex-col items-center gap-3 mt-2">
          <Link
            href="/cgu"
            className="text-greenMain underline text-sm font-inclusive hover:text-greenMain-2 transition-colors text-center"
          >
            En savoir plus sur les Conditions Générale d&apos;Utilisation
          </Link>
          <Link
            href="/politique-confidentialite"
            className="text-greenMain underline text-sm font-inclusive hover:text-greenMain-2 transition-colors text-center"
          >
            En savoir plus sur la Politique de Protection des Données
            Personnelles
          </Link>
        </div>
      </div>
    </div>
  );
}
