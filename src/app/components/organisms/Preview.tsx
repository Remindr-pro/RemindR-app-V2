"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../atoms/Button";

const PREVIEW_IMAGES = {
  "Tableau de bord familial": {
    image: "/images/illustrations/dashboard.png",
    color: "#4A90E2",
    text: "Tableau de bord familial",
  },
  "Tableau de bord individuel": {
    color: "#50C878",
    text: "Tableau de bord individuel",
  },
  "Calendrier partagé": {
    color: "#FF6B6B",
    text: "Calendrier partagé",
  },
  "Recommandations personnalisées": {
    color: "#9B59B6",
    text: "Recommandations personnalisées",
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
        {"image" in currentImage && currentImage.image ? (
          <Image
            src={currentImage.image}
            alt={currentImage.text}
            width={1140}
            height={662}
            className="w-full h-auto block"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1140px"
          />
        ) : (
          <div
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[660px] flex items-center justify-center"
            style={{ backgroundColor: currentImage.color }}
          >
            <span className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-center px-4 sm:px-6 md:px-8 leading-tight">
              {currentImage.text}
            </span>
          </div>
        )}
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
              Recommandations personnalisées
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
