"use client";

import { useState } from "react";
import Link from "next/link";
import IconEnvelope from "../atoms/icons/Envelope";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue.");
        return;
      }
      setStatus("success");
      setMessage(data.success || "Inscription enregistrée !");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Erreur lors de l'envoi. Réessayez plus tard.");
    }
  };

  return (
    <section className="w-full bg-gray-2 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Atome : Icône envelope dans cercle */}
        <div
          className="flex items-center justify-center w-16 h-16 rounded-full bg-light border border-gray-3 shadow-sm mb-8"
          aria-hidden
        >
          <IconEnvelope size={28} className="text-dark" />
        </div>

        {/* Molécule : Titre */}
        <h2
          className="text-2xl md:text-4xl lg:text-5xl font-inclusive font-bold text-dark leading-tight mb-4"
          style={{ fontFamily: "var(--font-inclusive)" }}
        >
          Toutes les informations et conseils{" "}
          <span className="text-greenMain">santé</span> directement dans votre
          boîte mail.
        </h2>

        {/* Molécule : Paragraphe descriptif */}
        <p
          className="text-base text-gray-4 max-w-2xl mb-8"
          style={{ fontFamily: "var(--font-inclusive)" }}
        >
          Restez informé·e des bonnes pratiques et recommandations officielles,
          directement dans votre boîte mail. Pour des conseils personnalisés et
          des rappels santé sur mesure,{" "}
          <Link
            href="/dashboard"
            className="underline text-gray-4 hover:text-greenMain transition-colors"
          >
            activez votre tableau de bord Remindr
          </Link>
          .
        </p>

        {/* Molécule : Formulaire inscription */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg sm:max-w-xl flex flex-row gap-2 sm:gap-3 justify-center items-stretch mb-6"
        >
          <div className="flex-1 min-w-0 sm:min-w-[280px]">
            <Input
              type="email"
              placeholder="Votre adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mb-0"
              aria-label="Adresse e-mail pour la newsletter"
            />
          </div>
          <Button
            type="submit"
            variant="green"
            size="sm"
            disabled={status === "loading"}
            className="shrink-0 flex items-center justify-center sm:px-6! sm:py-3! sm:text-base"
          >
            {status === "loading" ? (
              "..."
            ) : (
              <>
                <span className="sm:hidden">S&apos;inscrire</span>
                <span className="hidden sm:inline">
                  S&apos;inscrire à la newsletter
                </span>
              </>
            )}
          </Button>
        </form>

        {message && (
          <p
            className={`mb-6 text-sm font-inclusive ${
              status === "success" ? "text-greenMain" : "text-red-1"
            }`}
            style={{ fontFamily: "var(--font-inclusive)" }}
            role="status"
          >
            {message}
          </p>
        )}

        {/* Molécule : Mention confidentialité */}
        <p
          className="text-xs text-gray-5"
          style={{ fontFamily: "var(--font-inclusive)" }}
        >
          Nous respectons votre vie privée et vos données seront toujours
          protégées.{" "}
          <Link
            href="/mentions-legales"
            className="underline text-gray-5 hover:text-gray-4 transition-colors"
          >
            En savoir plus.
          </Link>
        </p>
      </div>
    </section>
  );
}
