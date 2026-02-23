import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Remindr - Mentions légales",
};

export default function MentionsLegales() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25%] md:pt-[10%] pb-10 font-inclusive text-dark">
      <div>
        <h1 className="text-4xl font-bold font-tango">Mentions légales</h1>
        <span className="italic text-xs">
          Dernière mise à jour : 12/12/2026
        </span>
        <p className="mt-4 mb-6">
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004
          pour la confiance en l&apos;économie numérique, il est précisé aux
          utilisateurs du site Remindr l&apos;identité des différents
          intervenants dans le cadre de sa réalisation et de son suivi. Pour les
          conditions d&apos;utilisation du service, consultez nos{" "}
          <Link href="/conditions-generales-utilisation" className="text-greenMain hover:underline">
            conditions générales d&apos;utilisation (CGU)
          </Link>
          .
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">1. Éditeur du site</h2>
      <p className="mb-4">
        Le site Remindr est édité par :<br />
        [Raison sociale]<br />
        [Forme juridique]<br />
        [Siège social]<br />
        [Capital social]
      </p>

      <h2 className="text-2xl font-bold mb-4">2. Directeur de la publication</h2>
      <p className="mb-4">
        Le directeur de la publication du site est : [Nom du responsable].
      </p>

      <h2 className="text-2xl font-bold mb-4">3. Hébergeur</h2>
      <p className="mb-4">
        Le site Remindr est hébergé par :<br />
        [Nom de l&apos;hébergeur]<br />
        [Adresse]<br />
        [Coordonnées]
      </p>

      <h2 className="text-2xl font-bold mb-4">4. Propriété intellectuelle</h2>
      <p className="mb-4">
        L&apos;ensemble du contenu du site (textes, images, graphismes, logo,
        icônes, etc.) est protégé par le droit d&apos;auteur et le droit des
        marques. Toute reproduction, représentation, modification ou exploitation
        non autorisée de tout ou partie de ce contenu est strictement interdite
        sans l&apos;accord préalable de Remindr.
      </p>

      <h2 className="text-2xl font-bold mb-4">5. Limitation de responsabilité</h2>
      <p className="mb-4">
        Les informations contenues sur ce site sont aussi précises que possible.
        Toutefois, Remindr ne pourra être tenu responsable des omissions, des
        inexactitudes et des carences dans la mise à jour, qu&apos;elles soient
        de son fait ou du fait des tiers partenaires.
      </p>

      <h2 className="text-2xl font-bold mb-4">6. Liens hypertextes</h2>
      <p className="mb-4">
        Le site peut contenir des liens vers d&apos;autres sites. Remindr
        n&apos;exerce aucun contrôle sur ces sites et décline toute
        responsabilité quant à leur contenu.
      </p>

      <h2 className="text-2xl font-bold mb-4">7. Droit applicable</h2>
      <p className="mb-6">
        Les présentes mentions légales sont régies par le droit français. En
        cas de litige, les tribunaux français seront seuls compétents.
      </p>

      <h2 className="text-2xl font-bold mb-4">8. Contact</h2>
      <p className="mb-6">
        Pour toute question concernant ces mentions légales, vous pouvez nous
        contacter à :{" "}
        <Link href="mailto:contact@remind-r.com" className="text-greenMain">
          contact@remind-r.com
        </Link>
      </p>
    </div>
  );
}
