"use client";

import { useState } from "react";
import VerificationCard from "@/app/components/molecules/VerificationCard";
import Button from "@/app/components/atoms/Button";
import Link from "next/link";

export default function VerificationPage() {
  const [selectedMethod, setSelectedMethod] = useState<"email" | "sms" | null>(
    null
  );

  const handleMethodSelect = (method: "email" | "sms") => {
    setSelectedMethod(method);
  };

  return (
    <div className="w-full max-w-md md:max-w-2xl flex flex-col items-center justify-center gap-6 font-inclusive px-4">
      <div className="w-full flex flex-col md:flex-row gap-4">
        <VerificationCard
          image="/images/icons/notification.png"
          title="Par e-mail"
          description="Je reçois mon code sur cam****@free.fr"
          isSelected={selectedMethod === "email"}
          onClick={() => handleMethodSelect("email")}
        />
        <VerificationCard
          image="/images/icons/chatting.png"
          title="Par SMS"
          description="Je reçois mon code au 06 ** ** **45"
          isSelected={selectedMethod === "sms"}
          onClick={() => handleMethodSelect("sms")}
        />
      </div>

      <Link
        href="#"
        className="text-greenMain hover:text-greenMain-2 font-inclusive text-sm transition-colors duration-200 text-center"
      >
        Mes coordonnées sont incorrectes ?
      </Link>

      <div className="w-full pt-2 text-center">
        <Button
          variant="green"
          className="w-full md:w-max"
          onClick={() => {
            if (selectedMethod) {
              // Logique pour envoyer le code
              console.log(`Envoi du code par ${selectedMethod}`);
            }
          }}
          disabled={!selectedMethod}
        >
          Recevoir le code de vérification
        </Button>
      </div>
    </div>
  );
}
