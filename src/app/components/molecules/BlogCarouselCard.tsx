"use client";

import { useState } from "react";
import ArticleCard, { ArticleCardProps } from "./ArticleCard";
import IconChevron from "../atoms/icons/Chevron";

interface BlogCarouselCardProps {
  articles: ArticleCardProps[];
}

export default function BlogCarouselCard({ articles }: BlogCarouselCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (articles.length === 0) return null;

  return (
    <div className="bg-light rounded-2xl p-6 xl:p-8 shadow-md h-full">
      <h3 className="text-base text-dark font-inclusive mb-6">
        Le blog - Ça peut vous intéresser
      </h3>

      <div className="relative">
        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {articles.map((article, index) => (
              <div key={index} className="min-w-full">
                <ArticleCard {...article} isForward={index === currentIndex} />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {articles.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-light/80 hover:bg-light rounded-full p-2 shadow-md transition-all z-10"
                aria-label="Article précédent"
              >
                <IconChevron size={20} className="rotate-90" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-light/80 hover:bg-light rounded-full p-2 shadow-md transition-all z-10"
                aria-label="Article suivant"
              >
                <IconChevron size={20} className="-rotate-90" />
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {articles.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-greenMain w-8"
                    : "bg-gray-3 w-2 hover:bg-gray-4"
                }`}
                aria-label={`Aller à l'article ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
