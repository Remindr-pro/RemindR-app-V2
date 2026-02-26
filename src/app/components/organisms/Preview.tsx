"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../atoms/Button";

const PREVIEW_IMAGES = {
  "Tableau de bord familial": {
    image: "/images/illustrations/dashboard.png",
    alt: "Tableau de bord familial",
    width: 1140,
    height: 662,
  },
  "Tableau de bord individuel": {
    image: "/images/illustrations/dashboard-indi.png",
    alt: "Tableau de bord individuel",
    width: 1140,
    height: 662,
  },
  "Calendrier partagé": {
    image: "/images/illustrations/dashboard-calendrier-mois.png",
    alt: "Calendrier partagé",
    width: 1140,
    height: 662,
  },
  "Recommandations personnalisées": {
    image: "/images/illustrations/dashboard-magazine.png",
    alt: "Recommandations personnalisées",
    width: 1140,
    height: 662,
  },
};

export default function Preview() {
  const [currentPreview, setCurrentPreview] = useState<
    keyof typeof PREVIEW_IMAGES
  >("Tableau de bord familial");

  const handleButtonClick = (buttonName: keyof typeof PREVIEW_IMAGES) => {
    setCurrentPreview(buttonName);
  };

  const currentImage = PREVIEW_IMAGES[currentPreview];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
      {/* Image ou placeholder */}
      <div className="bg-light border-6 md:border-8 border-gray-2 w-full max-w-[1140px] rounded-lg sm:rounded-xl overflow-hidden shadow-md transition-all duration-300">
        <Image
          src={currentImage.image}
          alt={currentImage.alt}
          width={currentImage.width}
          height={currentImage.height}
          className="w-full h-auto block"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1140px"
        />
      </div>

      {/* Nav */}
      <div className="w-full max-w-7xl">
        <ul className="w-full flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-2 sm:gap-3 md:gap-4 bg-light border border-gray-2 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-sm">
          <li className="w-full sm:w-auto sm:flex-1 sm:min-w-[200px] sm:max-w-[300px]">
            <Button
              variant="outline"
              onClick={() => handleButtonClick("Tableau de bord familial")}
              isActive={currentPreview === "Tableau de bord familial"}
              className="w-full text-sm sm:text-base"
            >
              Tableau de bord familial
            </Button>
          </li>
          <li className="w-full sm:w-auto sm:flex-1 sm:min-w-[200px] sm:max-w-[300px]">
            <Button
              variant="outline"
              onClick={() => handleButtonClick("Tableau de bord individuel")}
              isActive={currentPreview === "Tableau de bord individuel"}
              className="w-full text-sm sm:text-base"
            >
              Tableau de bord individuel
            </Button>
          </li>
          <li className="w-full sm:w-auto sm:flex-1 sm:min-w-[200px] sm:max-w-[300px]">
            <Button
              variant="outline"
              onClick={() => handleButtonClick("Calendrier partagé")}
              isActive={currentPreview === "Calendrier partagé"}
              className="w-full text-sm sm:text-base"
            >
              Calendrier partagé
            </Button>
          </li>
          <li className="w-full sm:w-auto sm:flex-1 sm:min-w-[200px] sm:max-w-[300px]">
            <Button
              variant="outline"
              onClick={() =>
                handleButtonClick("Recommandations personnalisées")
              }
              isActive={currentPreview === "Recommandations personnalisées"}
              className="w-full text-sm sm:text-base"
            >
              Recommandations
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
