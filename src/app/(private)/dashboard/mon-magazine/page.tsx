import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon magazine | Remindr",
  description:
    "Vos articles santé et prévention personnalisés. Découvrez les contenus Remindr adaptés à votre profil.",
};

export default function MagazinePage() {
  return (
    <div className="w-full mx-auto bg-gray-1 rounded-2xl p-8">
      <h1 className="text-4xl font-bold text-dark mb-4 font-inclusive">
        Mon magazine
      </h1>
    </div>
  );
}
