"use client";

import Button from "@/app/components/atoms/Button";
import Preview from "@/app/components/organisms/Preview";
import PreventionCollapse from "@/app/components/organisms/PreventionCollapse";
import FeedbackGrid from "@/app/components/organisms/FeedbackGrid";
import FAQ from "@/app/components/organisms/FAQ";
import Companies from "@/app/components/organisms/Companies";
import { useAuth } from "@/lib/auth-provider";

const feedbacks = [
  {
    name: "Claire",
    age: 38,
    role: "Maman de deux enfants",
    quote:
      "Avant Remindr, je notais les vaccins et les rendez-vous des enfants un peu partout... Maintenant tout est au même endroit. Les rappels arrivent tout seuls et je n'ai plus peur d'oublier un suivi important. C'est un vrai soulagement. Mon mari peut aussi accéder aux informations des enfants via son espace personnel. C'est un vrai plus.",
    memberSince: "mars 2025",
  },
  {
    name: "Julien",
    age: 45,
    role: "Prend soin de ses parents",
    quote:
      "Je gère les rendez-vous de mes parents âgés depuis le même espace que le mien. Je peux suivre leur santé facilement et voir les recommandations selon leur profil. Ça me fait gagner un temps fou.",
    memberSince: "janvier 2025",
  },
  {
    name: "Sarah",
    age: 29,
    role: "En rémission d'un cancer",
    quote:
      "Avec Remindr, j'ai retrouvé un sentiment de contrôle sur ma santé. Les rappels pour mes suivis médicaux sont automatiques, et je peux ajouter mes propres notes. C'est simple, apaisant et hyper rassurant.",
    memberSince: "juillet 2025",
  },
  {
    name: "Élodie",
    age: 34,
    role: "Aidante pour sa grand-mère",
    quote:
      "Remindr m'aide à suivre les rendez-vous médicaux de ma grand-mère, même à distance. J'ai accès à son calendrier santé, et je peux envoyer ses factures à la mutuelle directement depuis l'appli. C'est fluide et humain.",
    memberSince: "janvier 2025",
  },
  {
    name: "Thomas",
    age: 52,
    role: "Père de famille",
    quote:
      "Entre le boulot, les enfants et ma mutuelle, je perdais souvent des infos. Remindr centralise tout: les rappels en fonction de mon âge mais aussi en fonction de mes examens passés. J'aime beaucoup la fonction des suggestions personnalisées car je découvre de nouvelles choses auxquelles je n'aurait pas pensé.",
    memberSince: "février 2025",
  },
  {
    name: "Mehdi",
    age: 27,
    role: "Jeune actif",
    quote:
      "Je pensais que c'était juste pour les familles, mais en fait ça m'aide à gérer ma propre santé. Je reçois des rappels pour mes bilans, mes vaccins, et je découvre des conseils de prévention personnalisés. C'est cool.",
    memberSince: "août 2025",
  },
  {
    name: "Caroline",
    age: 41,
    role: "Maman solo",
    quote:
      "En tant que maman solo, Remindr est devenu mon allié indispensable. Je peux gérer ma santé et celle de mes enfants sans stress. Les rappels automatiques me permettent de ne rien oublier malgré mon emploi du temps chargé.",
    memberSince: "avril 2025",
  },
  {
    name: "Antoine",
    age: 62,
    role: "Jeune retraité",
    quote:
      "À la retraite, j'ai enfin le temps de prendre soin de ma santé. Remindr m'aide à suivre tous mes rendez-vous médicaux et mes bilans de santé. C'est simple à utiliser et très rassurant.",
    memberSince: "mai 2025",
  },
  {
    name: "Léa",
    age: 33,
    role: "Responsable RH",
    quote:
      "Ce que j'aime, c'est que ma mutuelle travaille main dans la main avec Remindr. Je peux gérer mes remboursements directement depuis l'application. C'est un gain de temps énorme dans ma vie professionnelle chargée.",
    memberSince: "juin 2025",
  },
];

export default function ParticuliersPage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* === Section Hero === */}
      <section className="min-h-screen flex flex-col items-center justify-center gap-8 px-5 lg:px-0 max-w-full md:max-w-3/5 mx-auto text-center">
        <h1 className="text-3xl md:text-6xl font-inclusive font-bold">
          Prenez soin de vous et de ceux que vous aimez, sans avoir à y penser.
        </h1>
        <p className="text-base md:text-lg font-inclusive font-medium md:max-w-5/6">
          Remindr vous aide à ne rien oublier pour votre santé et celle de vos
          proches. Des rappels simples, un espace clair de prévention et de
          suivi pour toute la famille, et l&apos;esprit enfin léger.
        </p>
      </section>

      {/* === Section Preview === */}
      <section className="min-h-screen flex flex-col items-center justify-center py-0 md:py-24">
        <Preview />
      </section>

      {/* === Section Prevention  === */}
      <section
        className="min-h-screen flex items-center justify-center py-24 relative overflow-visible"
        id="fonctionnalites"
      >
        <div
          className="absolute left-0 right-0 w-full z-0"
          style={{
            top: "-200px",
            bottom: 0,
            backgroundColor: "var(--color-gray-1)",
            backgroundImage: "url('/images/bg/bg-with-cross-fullwidth.png')",
            backgroundSize: "fit-content",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-inclusive font-bold text-dark mb-4">
              La santé <span className="text-greenMain">regroupée</span> pour
              toute la famille.
            </h2>
            <p className="text-base md:text-lg font-inclusive font-medium text-dark">
              Tout est réuni au même endroit pour prendre soin de vous, et de
              ceux que vous aimez. Tout en simplicité et avec sérénité.
            </p>
          </div>

          <PreventionCollapse />
        </div>
      </section>

      {/* === Section Feedback === */}
      <section
        className="min-h-screen flex items-center justify-center py-24"
        id="prevention-sante"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-inclusive font-bold text-dark mb-4">
              Ils ont choisi de se
              <span className="text-greenMain"> simplifier</span> la santé.
            </h2>
            <p className="text-base md:text-lg font-inclusive font-medium text-dark mb-8">
              Nos utilisateurs racontent comment Remindr les aide au quotidien à
              équilibrer leur vie, leur santé et celle de leurs proches.
            </p>
            <Button href="/dashboard" variant="green">
              {isAuthenticated
                ? "Accéder à mon tableau de bord"
                : "Je crée aussi mon tableau de bord"}
            </Button>
          </div>

          <FeedbackGrid feedbacks={feedbacks} />
        </div>
      </section>

      {/* === Section FAQ === */}
      <section
        className="min-h-screen flex flex-col items-center justify-center gap-20 py-24 relative overflow-visible"
        id="faq"
      >
        <div
          className="absolute left-0 right-0 w-full z-0"
          style={{
            top: "-200px",
            bottom: 0,
            backgroundColor: "var(--color-gray-1)",
            backgroundImage: "url('/images/bg/bg-with-cross-fullwidth.png')",
            backgroundSize: "fit-content",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="max-w-7xl mx-auto flex flex-col gap-16 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-inclusive font-bold">
            Une <span className="text-greenMain">question</span> ? Nous y
            répondons.
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg font-inclusive font-regular">
            En cas de doute, vous pouvez aussi nous contacter. Nous valorisons
            la transparence et la clarté des informations que nous vous
            fournissons.
          </p>
        </div>

        <div className="relative z-10">
          <FAQ />
        </div>
      </section>

      {/* === Section Companies === */}
      <section className="min-h-screen flex flex-col items-center justify-center gap-20 py-24 relative overflow-visible">
        <div
          className="absolute left-0 right-0 w-full z-0"
          style={{
            top: "-200px",
            bottom: 0,
            backgroundColor: "var(--color-gray-1)",
            backgroundImage: "url('/images/bg/bg-with-cross-fullwidth.png')",
            backgroundSize: "fit-content",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="max-w-3xl w-full mx-auto flex flex-col gap-16 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-inclusive font-bold">
            Des sources <span className="text-greenMain">fiables</span> pour une
            santé au top.
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg font-inclusive font-regular">
            Toutes nos recommandations et rappels automatiques sont basés sur
            les recommandations officielles des organismes de santé.
          </p>
        </div>

        <div className="relative z-10">
          <Companies />
        </div>
      </section>
    </>
  );
}
