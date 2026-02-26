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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "Des tableaux de bord clairs pour vous et vos proches.",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "Des rappels qui s'adaptent à vous.",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    title: "Un calendrier santé partagé.",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
  },
  {
    title: "Un lien direct avec votre mutuelle.",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.",
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
