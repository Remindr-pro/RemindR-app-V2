import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Remindr - Aide et Contact",
};

export default function AideContact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25%] md:pt-[10%] pb-10 font-inclusive text-dark">
      <div>
        <h1 className="text-4xl font-bold font-tango">
          Aide et Contact
        </h1>
        <p className="mt-4 mb-6">
          Vous avez une question, un problème technique ou besoin d&apos;un
          accompagnement ? Nous sommes là pour vous aider.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Nous contacter</h2>
      <p className="mb-4">
        Pour toute demande (support, informations, partenariats, signalement),
        vous pouvez nous joindre par e-mail :
      </p>
      <p className="mb-6">
        <Link
          href="mailto:contact@remind-r.com"
          className="text-greenMain font-medium hover:underline"
        >
          contact@remind-r.com
        </Link>
      </p>
      <p className="mb-6">
        Nous nous efforçons de répondre à vos messages dans les meilleurs délais.
      </p>

      <h2 className="text-2xl font-bold mb-4">Ressources utiles</h2>
      <p className="mb-4">
        Retrouvez les informations et documents officiels qui peuvent vous
        aider :
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">
          <Link href="/particuliers" className="text-greenMain hover:underline">
            Tout savoir sur l&apos;espace santé Remindr
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/politique-de-confidentialite" className="text-greenMain hover:underline">
            Politique de confidentialité
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/mentions-legales" className="text-greenMain hover:underline">
            Mentions légales
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/conditions-generales-utilisation" className="text-greenMain hover:underline">
            Conditions générales d&apos;utilisation (CGU)
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/gestion-des-cookies" className="text-greenMain hover:underline">
            Gestion des cookies
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/accessibilite" className="text-greenMain hover:underline">
            Accessibilité
          </Link>
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Espace professionnels</h2>
      <p className="mb-6">
        Vous représentez une mutuelle, une entreprise ou un organisme et souhaitez
        en savoir plus sur nos solutions B2B ? Consultez notre page{" "}
        <Link href="/professionnels" className="text-greenMain hover:underline">
          Professionnels
        </Link>{" "}
        ou contactez-nous directement.
      </p>
    </div>
  );
}
