"use client";

import { useState, FormEvent, useMemo } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

interface AccountFormProps {
  onSubmit?: (data: {
    identifier: string;
    password: string;
    confirmPassword: string;
  }) => void;
  onButtonClick?: () => void;
  buttonType?: "submit" | "button";
  buttonHref?: string;
}

export default function AccountForm({
  onSubmit,
  onButtonClick,
  buttonType = "submit",
  buttonHref,
}: AccountFormProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordValidations = useMemo(() => {
    return {
      minLength: password.length >= 12,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#?$%&*]/.test(password),
    };
  }, [password]);

  const isPasswordValid = useMemo(() => {
    return Object.values(passwordValidations).every((validation) => validation);
  }, [passwordValidations]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit({
        identifier,
        password,
        confirmPassword,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      <div>
        <Input
          type="text"
          label="Mon identifiant"
          hintText="Ex : prenom, prenom.nom, pseudo, etc."
          placeholder="Identifiant"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
      </div>

      <div>
        <Input
          type="password"
          label="Mon mot de passe"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPasswordToggle={true}
        />
        <div className="mt-2">
          <p className="text-gray-3 font-inclusive text-sm mb-2">
            Votre mot de passe doit contenir :
          </p>
          <ul className="font-inclusive text-sm space-y-1 ml-4">
            <li
              className={
                passwordValidations.minLength ? "text-greenMain" : "text-gray-3"
              }
            >
              • Minimum 12 caractères
            </li>
            <li
              className={
                passwordValidations.hasUpperCase
                  ? "text-greenMain"
                  : "text-gray-3"
              }
            >
              • Au moins une lettre majuscule
            </li>
            <li
              className={
                passwordValidations.hasLowerCase
                  ? "text-greenMain"
                  : "text-gray-3"
              }
            >
              • Au moins une lettre minuscule
            </li>
            <li
              className={
                passwordValidations.hasNumber ? "text-greenMain" : "text-gray-3"
              }
            >
              • Au moins un chiffre
            </li>
            <li
              className={
                passwordValidations.hasSpecialChar
                  ? "text-greenMain"
                  : "text-gray-3"
              }
            >
              • Au moins un caractère spécial (ex: ! @ # ? $ % & *)
            </li>
          </ul>
        </div>
      </div>

      <Input
        type="password"
        label="Confirmer mon mot de passe"
        placeholder="Mot de passe"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        showPasswordToggle={true}
        disabled={!isPasswordValid}
      />

      <div className="pt-2 text-center">
        {buttonHref ? (
          <Button
            variant="green"
            href={buttonHref}
            className="w-full md:w-max"
            onClick={onButtonClick}
          >
            Activer mon espace
          </Button>
        ) : (
          <Button
            variant="green"
            type={buttonType}
            className="w-full md:w-max"
            onClick={onButtonClick}
          >
            Activer mon espace
          </Button>
        )}
      </div>
    </form>
  );
}
