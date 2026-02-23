import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Remindr - Conditions générales d'utilisation",
};

export default function ConditionsGeneralesUtilisation() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25%] md:pt-[10%] pb-10 font-inclusive text-dark">
      <div>
        <h1 className="text-4xl font-bold font-tango">
          Conditions générales d&apos;utilisation (CGU)
        </h1>
        <span className="italic text-xs">
          Dernière mise à jour : 12/12/2026
        </span>
        <p className="mt-4 mb-6">
          Les présentes Conditions générales d&apos;utilisation (CGU) régissent
          l&apos;accès et l&apos;utilisation du site et des services Remindr.
          En accédant au site ou en utilisant nos services, vous acceptez
          d&apos;être lié par ces conditions.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">1. Objet et champ d&apos;application</h2>
      <p className="mb-4">
        Les présentes CGU ont pour objet de définir les modalités et conditions
        d&apos;utilisation des services proposés par Remindr, ainsi que les
        droits et obligations des parties dans ce cadre.
      </p>

      <h2 className="text-2xl font-bold mb-4">2. Acceptation des conditions</h2>
      <p className="mb-4">
        L&apos;utilisation du site et des services Remindr implique
        l&apos;acceptation pleine et entière des présentes CGU. En cas de
        désaccord avec tout ou partie de ces conditions, l&apos;utilisateur est
        invité à ne pas utiliser les services.
      </p>

      <h2 className="text-2xl font-bold mb-4">3. Description des services</h2>
      <p className="mb-4">
        Remindr propose une plateforme de suivi et de prévention santé permettant
        aux utilisateurs de gérer leurs rappels de santé, ceux de leurs proches
        et d&apos;accéder à des contenus de prévention personnalisés. Les
        fonctionnalités détaillées sont décrites sur le site.
      </p>

      <h2 className="text-2xl font-bold mb-4">4. Inscription et compte utilisateur</h2>
      <p className="mb-4">
        L&apos;utilisation de certains services peut nécessiter la création d&apos;un
        compte. L&apos;utilisateur s&apos;engage à fournir des informations
        exactes et à maintenir la confidentialité de ses identifiants. Remindr
        se réserve le droit de suspendre ou résilier un compte en cas de
        manquement aux présentes CGU.
      </p>

      <h2 className="text-2xl font-bold mb-4">5. Obligations de l&apos;utilisateur</h2>
      <p className="mb-4">
        L&apos;utilisateur s&apos;engage à utiliser le site et les services de
        manière conforme aux lois en vigueur, aux présentes CGU et aux droits des
        tiers. Il est notamment interdit d&apos;utiliser les services à des fins
        illicites, de porter atteinte au fonctionnement du site ou de tenter
        d&apos;accéder de manière non autorisée aux données d&apos;autres
        utilisateurs.
      </p>

      <h2 className="text-2xl font-bold mb-4">6. Propriété intellectuelle</h2>
      <p className="mb-4">
        L&apos;ensemble des éléments du site (textes, visuels, logiciels, etc.)
        sont protégés par le droit de la propriété intellectuelle. Toute
        reproduction ou exploitation non autorisée est prohibée.
      </p>

      <h2 className="text-2xl font-bold mb-4">7. Limitation de responsabilité</h2>
      <p className="mb-4">
        Remindr met en œuvre tous les moyens pour assurer la disponibilité et la
        qualité de ses services. Toutefois, Remindr ne peut être tenu
        responsable des dommages indirects ou des conséquences liées à
        l&apos;utilisation du site. Les contenus de prévention ont une valeur
        informative et ne se substituent pas à un avis médical.
      </p>

      <h2 className="text-2xl font-bold mb-4">8. Modification des CGU</h2>
      <p className="mb-4">
        Remindr se réserve le droit de modifier les présentes CGU à tout moment.
        Les utilisateurs seront informés des changements substantiels. La
        poursuite de l&apos;utilisation du site après modification vaut
        acceptation des nouvelles conditions.
      </p>

      <h2 className="text-2xl font-bold mb-4">9. Droit applicable et litiges</h2>
      <p className="mb-6">
        Les présentes CGU sont régies par le droit français. Tout litige sera
        soumis aux tribunaux compétents français.
      </p>

      <h2 className="text-2xl font-bold mb-4">10. Contact</h2>
      <p className="mb-6">
        Pour toute question relative aux présentes CGU :{" "}
        <Link href="mailto:contact@remind-r.com" className="text-greenMain">
          contact@remind-r.com
        </Link>
        . Vous pouvez également consulter nos{" "}
        <Link href="/mentions-legales" className="text-greenMain hover:underline">
          mentions légales
        </Link>{" "}
        et notre{" "}
        <Link href="/politique-de-confidentialite" className="text-greenMain hover:underline">
          politique de confidentialité
        </Link>
        .
      </p>
    </div>
  );
}
