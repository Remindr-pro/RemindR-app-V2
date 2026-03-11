import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Remindr - Politique de confidentialité",
};

export default function Confidentiality() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25%] md:pt-[10%] pb-10 font-inclusive text-dark">
      <div>
        <h1 className="text-4xl font-bold font-tango">
          Politique de confidentialité
        </h1>
        <span className="italic text-xs">
          Dernière mise à jour : 03/01/2026
        </span>
        <p className="mt-4 mb-6">
          Chez Remindr, nous accordons une importance primordiale à la
          protection de vos données personnelles. Cette politique de
          confidentialité explique quelles informations nous collectons, comment
          nous les utilisons et quels sont vos droits à cet égard.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">1. Collecte des informations</h2>
      <p className="mb-4">
        Nous collectons différentes catégories de données personnelles afin
        d&apos;améliorer votre expérience avec Remindr :
      </p>

      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          Informations fournies par l&apos;utilisateur : Nom, adresse e-mail,
          numéro de téléphone et toute autre information saisie lors de
          l&apos;inscription ou de l&apos;utilisation de nos services.
        </li>
        <li className="mb-2">
          Données techniques : Adresse IP, type de navigateur, système
          d&apos;exploitation et autres données relatives à votre interaction
          avec notre plateforme.
        </li>
        <li className="mb-2">
          Cookies et technologies similaires : Pour analyser le comportement des
          utilisateurs et améliorer nos services.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">2. Utilisation des données</h2>
      <p className="mb-4">Les données collectées sont utilisées pour : </p>

      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">Fournir, gérer et améliorer nos services.</li>
        <li className="mb-2">
          Communiquer avec vous (support, notifications, mises à jour, etc.).
        </li>
        <li className="mb-2">
          Assurer la sécurité et la protection de notre plateforme.
        </li>
        <li className="mb-2">
          Respecter nos obligations légales et réglementaires.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">3. Partage des informations</h2>
      <p className="mb-4">
        Nous ne vendons ni ne louons vos données personnelles. Cependant, elles
        peuvent être partagées avec :
      </p>

      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          Fournisseurs de services qui nous aident à fournir nos services
          (hébergement, maintenance, analytics, etc.).
        </li>
        <li className="mb-2">
          Autorités légales si requis par la loi ou pour protéger nos droits.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">4. Sécurité des données</h2>
      <p className="mb-6">
        Nous mettons en œuvre des mesures de sécurité techniques et
        organisationnelles pour protéger vos informations contre tout accès,
        modification ou divulgation non autorisés.
      </p>

      <h2 className="text-2xl font-bold mb-4">5. Vos droits</h2>
      <p className="mb-4">
        Conformément à la réglementation en vigueur, vous disposez de plusieurs
        droits concernant vos données personnelles :
      </p>

      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">Accès et rectification de vos informations.</li>
        <li className="mb-2">
          Suppression de vos données lorsque cela est possible.
        </li>
        <li className="mb-2">
          Opposition ou limitation du traitement de vos données.
        </li>
        <li className="mb-2">
          Portabilité de vos données vers un autre service.
        </li>
      </ul>
      <p className="mb-6">
        Pour exercer vos droits, vous pouvez nous contacter à l’adresse suivante
        :{" "}
        <Link href="mailto:contact@remind-r.com" className="text-greenMain">
          contact@remind-r.com
        </Link>
      </p>

      <h2 className="text-2xl font-bold mb-4">
        6. Modification de la politique de confidentialité
      </h2>
      <p className="mb-6">
        Nous nous réservons le droit de modifier cette politique à tout moment.
        Toute modification sera publiée sur cette page avec une indication de la
        date de mise à jour.
      </p>

      <h2 className="text-2xl font-bold mb-4">7. Contact</h2>
      <p className="mb-6">
        Pour toute question concernant cette politique de confidentialité, vous
        pouvez nous écrire à:{" "}
        <Link href="mailto:contact@remind-r.com" className="text-greenMain">
          contact@remind-r.com
        </Link>
      </p>
    </div>
  );
}
