import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Remindr - Gestion des cookies",
};

export default function GestionDesCookies() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25%] md:pt-[10%] pb-10 font-inclusive text-dark">
      <div>
        <h1 className="text-4xl font-bold font-tango">
          Gestion des cookies
        </h1>
        <span className="italic text-xs">
          Dernière mise à jour : 12/12/2026
        </span>
        <p className="mt-4 mb-6">
          Ce document vous informe sur l&apos;utilisation des cookies sur le site
          Remindr et sur les moyens dont vous disposez pour les gérer, conformément
          à la réglementation en vigueur et à nos engagements en matière de
          transparence.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Qu&apos;est-ce qu&apos;un cookie ?</h2>
      <p className="mb-4">
        Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur,
        tablette, smartphone) lors de la visite d&apos;un site. Il permet de
        mémoriser des informations sur votre navigation (préférences, session,
        statistiques, etc.) pour une durée limitée.
      </p>

      <h2 className="text-2xl font-bold mb-4">Types de cookies utilisés</h2>
      <p className="mb-4">
        Nous utilisons les catégories de cookies suivantes :
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          <strong>Cookies strictement nécessaires :</strong> indispensables au
          fonctionnement du site (session, sécurité, préférences essentielles).
          Ils ne nécessitent pas votre consentement préalable.
        </li>
        <li className="mb-2">
          <strong>Cookies de performance et d&apos;analyse :</strong> nous aident
          à comprendre comment les visiteurs utilisent le site (pages vues, durée,
          parcours) afin d&apos;améliorer nos services.
        </li>
        <li className="mb-2">
          <strong>Cookies de personnalisation :</strong> permettent d&apos;adapter
          l&apos;affichage ou le contenu en fonction de vos choix (langue,
          région, etc.).
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Durée de conservation</h2>
      <p className="mb-4">
        La durée de vie des cookies varie selon leur finalité. Les cookies de
        session sont supprimés à la fermeture du navigateur. D&apos;autres cookies
        peuvent être conservés pendant une durée définie (par exemple 12 ou 24
        mois) pour les besoins d&apos;analyse ou de personnalisation.
      </p>

      <h2 className="text-2xl font-bold mb-4">Vos choix</h2>
      <p className="mb-4">
        Vous pouvez à tout moment modifier vos préférences en matière de cookies :
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          Via les paramètres de votre navigateur (refus ou suppression des cookies).
          Les modalités varient selon les navigateurs (Chrome, Firefox, Safari,
          Edge, etc.).
        </li>
        <li className="mb-2">
          En refusant les cookies non essentiels via le bandeau ou le centre de
          préférences proposé sur le site, lorsqu&apos;il est disponible.
        </li>
      </ul>
      <p className="mb-4">
        Le refus ou la suppression de certains cookies peut affecter certaines
        fonctionnalités du site ou votre expérience de navigation.
      </p>

      <h2 className="text-2xl font-bold mb-4">Plus d&apos;informations</h2>
      <p className="mb-6">
        Pour en savoir plus sur le traitement de vos données, consultez notre{" "}
        <Link href="/politique-de-confidentialite" className="text-greenMain hover:underline">
          politique de confidentialité
        </Link>
        . Pour toute question :{" "}
        <Link href="mailto:contact@remind-r.com" className="text-greenMain">
          contact@remind-r.com
        </Link>
      </p>
    </div>
  );
}
