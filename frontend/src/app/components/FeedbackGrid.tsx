"use client";

import { useState } from "react";
import FeedbackCard from "./FeedbackCard";

interface Feedback {
  name: string;
  age: number;
  role: string;
  quote: string;
  memberSince: string;
}

interface FeedbackGridProps {
  feedbacks: Feedback[];
}

export default function FeedbackGrid({ feedbacks }: FeedbackGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Répartir les feedbacks en 3 colonnes pour desktop
  const distributeFeedbacks = () => {
    const columns: Feedback[][] = [[], [], []];
    feedbacks.forEach((feedback, index) => {
      columns[index % 3].push(feedback);
    });
    return columns;
  };

  const columns = distributeFeedbacks();

  // Navigation du carousel
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === feedbacks.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full">
      {/* Carousel Mobile */}
      <div className="md:hidden relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {feedbacks.map((feedback, index) => (
              <div key={index} className="min-w-full px-2">
                <FeedbackCard {...feedback} />
              </div>
            ))}
          </div>
        </div>

        {/* Boutons de navigation */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-light rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10"
          aria-label="Avis précédent"
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
              stroke="#222323"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-light rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10"
          aria-label="Avis suivant"
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
              stroke="#222323"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Indicateurs de pagination */}
        <div className="flex justify-center gap-2 mt-6">
          {feedbacks.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-greenMain w-8" : "bg-gray-3 w-2"
              }`}
              aria-label={`Aller à l'avis ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Grille Desktop avec animations */}
      <div className="hidden md:block relative overflow-hidden max-h-[800px]">
        <div className="grid grid-cols-3 gap-6 relative">
          {/* Colonne 1 - Descend */}
          <div className="flex flex-col gap-6 animate-scroll-down">
            {columns[0].map((feedback, index) => (
              <FeedbackCard key={`col1-${index}`} {...feedback} />
            ))}
            {/* Dupliquer pour l'animation infinie */}
            {columns[0].map((feedback, index) => (
              <FeedbackCard key={`col1-duplicate-${index}`} {...feedback} />
            ))}
          </div>

          {/* Colonne 2 - Monte */}
          <div className="flex flex-col gap-6 animate-scroll-up">
            {columns[1].map((feedback, index) => (
              <FeedbackCard key={`col2-${index}`} {...feedback} />
            ))}
            {/* Dupliquer pour l'animation infinie */}
            {columns[1].map((feedback, index) => (
              <FeedbackCard key={`col2-duplicate-${index}`} {...feedback} />
            ))}
          </div>

          {/* Colonne 3 - Descend */}
          <div className="flex flex-col gap-6 animate-scroll-down">
            {columns[2].map((feedback, index) => (
              <FeedbackCard key={`col3-${index}`} {...feedback} />
            ))}
            {/* Dupliquer pour l'animation infinie */}
            {columns[2].map((feedback, index) => (
              <FeedbackCard key={`col3-duplicate-${index}`} {...feedback} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
