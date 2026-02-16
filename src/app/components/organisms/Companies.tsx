"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const AUTO_SLIDE_INTERVAL_MS = 4000;

const LOGOS = [
  "logo_assurance-maladie.png",
  "logo-Fnors.png",
  "logo-insee.png",
  "logo-ligue-contre-le-Cancer.png",
  "logo-OCDE.png",
  "logo-OMS.png",
  "logo-sante-gouv.png",
];

export default function Companies() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? LOGOS.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === LOGOS.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-slide sur mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === LOGOS.length - 1 ? 0 : prev + 1));
    }, AUTO_SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full">
      {/* Carousel mobile (style FeedbackGrid) */}
      <div className="md:hidden relative w-[90vw] max-w-full mx-auto">
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {LOGOS.map((image, index) => (
              <div
                key={index}
                className="min-w-full flex items-center justify-center py-4 px-6 bg-gray-1 rounded-lg"
              >
                <div className="relative w-40 h-20">
                  <Image
                    src={`/images/companies/${image}`}
                    alt={`Organisme partenaire ${index + 1}`}
                    width={160}
                    height={80}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Boutons de navigation */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 bg-light rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10 border border-gray-2"
          aria-label="Logo précédent"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 bg-light rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10 border border-gray-2"
          aria-label="Logo suivant"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Indicateurs de pagination */}
        <div className="flex justify-center gap-2 mt-6">
          {LOGOS.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-greenMain w-8" : "bg-gray-3 w-2"
              }`}
              aria-label={`Aller au logo ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bandeau défilant desktop */}
      <div className="hidden md:block relative w-[65vw] mx-auto overflow-hidden">
        <div className="flex items-center gap-10 animate-scroll">
          {LOGOS.map((image, index) => (
            <div
              key={index}
              className="shrink-0 w-[90px] h-[50px] flex items-center justify-center"
            >
              <Image
                src={`/images/companies/${image}`}
                alt={`Organisme partenaire ${index + 1}`}
                width={90}
                height={50}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
          {LOGOS.map((image, index) => (
            <div
              key={`duplicate-${index}`}
              className="shrink-0 w-[90px] h-[50px] flex items-center justify-center"
            >
              <Image
                src={`/images/companies/${image}`}
                alt=""
                width={90}
                height={50}
                className="object-contain w-full h-full"
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
