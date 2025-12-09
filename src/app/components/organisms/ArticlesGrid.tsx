"use client";

import { useState } from "react";
import ArticleCard, { ArticleCardProps } from "../molecules/ArticleCard";
import Button from "../atoms/Button";

interface ArticlesGridProps {
  articles: ArticleCardProps[];
}

const CATEGORIES = [
  "Tout",
  "Prévention au quotidien",
  "Prendre soin des siens",
  "Bien-être global",
  "Comprendre & agir",
  "Droits et démarches",
] as const;

export default function ArticlesGrid({ articles }: ArticlesGridProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>("Tout");

  const filteredArticles =
    selectedCategory === "Tout"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  // Le premier article est en avant (grand), les autres sont normaux
  // -> à l'avenir faire en fonction de la date de création de l'article.
  const featuredArticle = filteredArticles[0];
  const regularArticles = filteredArticles.slice(1);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Navigation par catégories */}
      <div className="w-full">
        <ul className="w-full flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-start gap-2 sm:gap-3 md:gap-4 bg-light border border-gray-2 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-sm">
          {CATEGORIES.map((category) => (
            <li
              key={category}
              className="w-full sm:w-auto sm:flex-1 sm:min-w-[170px] sm:max-w-[185px]"
            >
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(category)}
                isActive={selectedCategory === category}
                className="w-full text-sm sm:text-base"
              >
                {category}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Grille d'articles */}
      {filteredArticles.length > 0 ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Article en avant) */}
          {featuredArticle && (
            <div className="md:col-span-2 lg:col-span-2 h-full min-h-[400px] md:min-h-[500px]">
              <ArticleCard variant="advice" isForward {...featuredArticle} />
            </div>
          )}

          {/* Articles réguliers */}
          {regularArticles.map((article, index) => (
            <div
              key={index}
              className="w-full h-full min-h-[300px] md:min-h-[350px]"
            >
              <ArticleCard variant="advice" position="vertical" {...article} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-dark font-inclusive">
          <p className="text-lg">Aucun article trouvé dans cette catégorie.</p>
        </div>
      )}
    </div>
  );
}
