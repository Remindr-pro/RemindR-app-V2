"use client";

import Button from "@/app/components/atoms/Button";
import Link from "next/link";
import Image from "next/image";
import CodeInput from "@/app/components/molecules/CodeInput";

export default function VerificationPage() {
  return (
    <div className="w-full max-w-md md:max-w-2xl flex flex-col items-center justify-center gap-6 font-inclusive px-4">
      <Image
        src="/images/icons/lock.png"
        alt="Lock icon"
        width={100}
        height={100}
        className="w-16 h-16 md:w-[100px] md:h-[100px] mb-8"
      />

      <CodeInput
        length={6}
        onComplete={(code) => {
          console.log("Code complet:", code);
          // TODO: Implémenter la logique de vérification
        }}
      />

      <div className="w-full pt-2 text-center">
        <Button variant="green" className="w-full md:w-max">
          Vérifier mon compte
        </Button>
      </div>
      <span>
        Vous n’avez pas reçu le code ?{" "}
        <Link href="/" className="text-greenMain underline">
          Renvoyer
        </Link>
      </span>
      <Link href="/" className="text-greenMain underline">
        Utiliser un autre moyen.
      </Link>
    </div>
  );
}
