"use client";

import { useState } from "react";
import Image from "next/image";
import CollapseList from "./CollapseList";

const COLLAPSE_IMAGES = {
  0: {
    image: "/images/illustrations/notification-preview.png",
    alt: "Aperçu des notifications et du suivi santé",
    width: 400,
    height: 360,
  },
  1: {
    image: "/images/illustrations/dashboard.png",
    alt: "Tableaux de bord clairs pour vous et vos proches",
    width: 1200,
    height: 800,
  },
  2: {
    image: "/images/illustrations/dashboard-calendrier.png",
    alt: "Des rappels qui s'adaptent à vous",
    width: 1200,
    height: 800,
  },
  3: {
    image: "/images/illustrations/dashboard-proches.png",
    alt: "Calendrier santé partagé avec vos proches",
    width: 1200,
    height: 800,
  },
  4: {
    image: "/images/illustrations/dashboard-contact.png",
    alt: "Lien direct avec votre mutuelle",
    width: 1200,
    height: 800,
  },
};

const COLLAPSE_ITEMS = [
  {
    title: "La prévention et le suivi santé, simple et fiable.",
    content:
      "Remindr centralise vos rappels de vaccins, bilans et rendez-vous médicaux. Les recommandations s'appuient sur les préconisations officielles des organismes de santé. Vous recevez des notifications au bon moment pour ne rien oublier.",
  },
  {
    title: "Des tableaux de bord clairs pour vous et vos proches.",
    content:
      "Un espace par personne : le vôtre et ceux de vos proches (enfants, parents). Tout est au même endroit. Vous visualisez d'un coup d'œil les prochains rendez-vous, les rappels en attente et les conseils de prévention personnalisés.",
  },
  {
    title: "Des rappels qui s'adaptent à vous.",
    content:
      "Les rappels sont calculés selon votre âge, votre profil et vos antécédents. Remindr vous suggère aussi des examens ou bilans auxquels vous n'auriez pas pensé. Plus de stress, plus d'oubli.",
  },
  {
    title: "Un calendrier santé partagé.",
    content:
      "Gérez la santé de toute la famille depuis un seul compte. Accédez au calendrier de vos proches (avec leur accord), suivez leurs rendez-vous et leurs rappels. Idéal pour les aidants ou les parents.",
  },
  {
    title: "Un lien direct avec votre mutuelle.",
    content:
      "Envoyez vos factures à votre mutuelle et suivez vos remboursements directement depuis Remindr. Votre complémentaire santé et votre suivi prévention travaillent ensemble pour vous simplifier la vie.",
  },
];

export default function PreventionCollapse() {
  const [openCollapseIndex, setOpenCollapseIndex] = useState<
    number | undefined
  >(0);

  const handleCollapseToggle = (index: number) => {
    setOpenCollapseIndex(openCollapseIndex === index ? undefined : index);
  };

  const currentImage =
    openCollapseIndex !== undefined
      ? COLLAPSE_IMAGES[openCollapseIndex as keyof typeof COLLAPSE_IMAGES]
      : COLLAPSE_IMAGES[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
      {/* Liste des items collapse */}
      <div className="flex">
        <CollapseList
          openIndex={openCollapseIndex}
          onItemToggle={handleCollapseToggle}
          items={COLLAPSE_ITEMS}
        />
      </div>

      {/* Image */}
      <div className="hidden lg:block">
        <div
          className="rounded-2xl h-full w-full flex items-center justify-center transition-all duration-300 overflow-hidden"
          style={{
            backgroundColor: "transparent",
          }}
        >
          {"image" in currentImage && currentImage.image ? (
            <Image
              src={currentImage.image}
              alt={"alt" in currentImage ? currentImage.alt : ""}
              width={"width" in currentImage ? currentImage.width : 1200}
              height={"height" in currentImage ? currentImage.height : 800}
              sizes="(min-width: 1024px) 50vw, 0px"
              quality={90}
              className="w-full h-full object-contain"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
