import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Remindr - Accessibilité",
};

export default function Accessibilite() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25%] md:pt-[10%] pb-10 font-inclusive text-dark">
      <div>
        <h1 className="text-4xl font-bold font-tango">
          Déclaration d&apos;accessibilité
        </h1>
        <span className="italic text-xs">
          Dernière mise à jour : 03/01/2026
        </span>
        <p className="mt-4 mb-6">
          Remindr s&apos;engage à rendre son service accessible au plus grand
          nombre, conformément à l&apos;article 47 de la loi n° 2005-102 du 11
          février 2005. Cette déclaration d&apos;accessibilité s&apos;applique
          au site Remindr.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">État de conformité</h2>
      <p className="mb-4">
        Le site Remindr est en conformité partielle avec le Référentiel général
        d&apos;amélioration de l&apos;accessibilité (RGAA) version 4.1. Nous
        nous efforçons d&apos;améliorer continuellement l&apos;expérience des
        utilisateurs en situation de handicap.
      </p>

      <h2 className="text-2xl font-bold mb-4">
        Fonctionnalités d&apos;accessibilité
      </h2>
      <p className="mb-4">
        Nous mettons en œuvre les mesures suivantes pour faciliter l&apos;accès
        à nos contenus :
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          Structure des pages avec titres et landmarks pour la navigation au
          clavier et par lecteurs d&apos;écran.
        </li>
        <li className="mb-2">
          Contraste des couleurs respectant les recommandations pour une bonne
          lisibilité.
        </li>
        <li className="mb-2">
          Textes alternatifs sur les images et contenus non textuels lorsque
          pertinent.
        </li>
        <li className="mb-2">
          Formulaires avec labels associés et messages d&apos;erreur clairs.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Défauts connus</h2>
      <p className="mb-4">
        Certaines pages ou fonctionnalités peuvent encore présenter des
        non-conformités. Nous travaillons à les corriger dans le cadre de nos
        mises à jour régulières.
      </p>

      <h2 className="text-2xl font-bold mb-4">Amélioration et contact</h2>
      <p className="mb-6">
        Si vous rencontrez un problème d&apos;accessibilité sur le site, vous
        pouvez nous le signaler à :{" "}
        <Link href="mailto:contact@remind-r.com" className="text-greenMain">
          contact@remind-r.com
        </Link>{" "}
        ou via la page{" "}
        <Link href="/aide-contact" className="text-greenMain hover:underline">
          Aide et Contact
        </Link>
        . Nous nous engageons à vous répondre dans les meilleurs délais.
      </p>
    </div>
  );
}
