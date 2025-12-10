"use client";

import { useState, FormEvent } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Link from "next/link";

interface IdentificationFormProps {
  onSubmit?: (data: {
    adherentNumber: string;
    birthDate: string;
    email: string;
  }) => void;
  onButtonClick?: () => void;
  buttonType?: "submit" | "button";
  buttonHref?: string;
}

export default function IdentificationForm({
  onSubmit,
  onButtonClick,
  buttonType = "submit",
  buttonHref,
}: IdentificationFormProps) {
  const [adherentNumber, setAdherentNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        adherentNumber,
        birthDate,
        email,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      <div>
        <Input
          type="text"
          label="Mon numéro d'adhérent"
          hintText="Ex : 10345"
          placeholder="Numéro d'adhérent"
          value={adherentNumber}
          onChange={(e) => setAdherentNumber(e.target.value)}
        />
        <Link
          href="#"
          className="text-greenMain hover:text-greenMain-2 font-inclusive text-sm transition-colors duration-200"
        >
          Où trouver mon numéro d&apos;adhérent ?
        </Link>
      </div>

      <Input
        type="text"
        label="Ma date de naissance"
        hintText="Ex : 28/12/1999"
        placeholder="Date de naissance"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />

      <Input
        type="email"
        label="Mon adresse mail"
        hintText="Ex : adresse@mail.fr"
        placeholder="Adresse mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="pt-2">
        {buttonHref ? (
          <Button
            variant="green"
            href={buttonHref}
            className="w-full"
            onClick={onButtonClick}
          >
            Continuer
          </Button>
        ) : (
          <Button
            variant="green"
            type={buttonType}
            className="w-full"
            onClick={onButtonClick}
          >
            Continuer
          </Button>
        )}
      </div>
    </form>
  );
}
