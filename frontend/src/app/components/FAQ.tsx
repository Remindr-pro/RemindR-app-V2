"use client";

import { useState } from "react";
import Button from "./Button";
import FAQCollapseList from "./FAQCollapseList";

const FAQ_CATEGORIES = {
  "Notre service": {
    questions: [
      {
        title: "Qu'est-ce que Remindr ?",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        title: "Est-ce que Remindr remplace ma mutuelle ?",
        content:
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
      {
        title: "À qui s'adresse Remindr ?",
        content:
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.",
      },
      {
        title:
          "Puis-je utiliser Remindr sans être adhérent·e d'une mutuelle partenaire ?",
        content:
          "Ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
      },
      {
        title: "Est-ce que Remindr est gratuit ?",
        content:
          "Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      },
    ],
  },
  "Rappels et prévention": {
    questions: [
      {
        title: "Comment fonctionnent les rappels de santé ?",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        title: "Puis-je personnaliser mes rappels ?",
        content:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        title: "Quels types de prévention sont couverts ?",
        content:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
    ],
  },
  "Tableau de bord": {
    questions: [
      {
        title: "Comment accéder à mon tableau de bord ?",
        content:
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
      },
      {
        title: "Puis-je partager mon tableau de bord avec ma famille ?",
        content:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      },
      {
        title: "Quelles informations sont affichées sur le tableau de bord ?",
        content:
          "Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.",
      },
    ],
  },
  "Vos données": {
    questions: [
      {
        title: "Comment sont protégées mes données de santé ?",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        title: "Qui a accès à mes informations ?",
        content:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        title: "Puis-je supprimer mes données ?",
        content:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
    ],
  },
  "Votre mutuelle et vous": {
    questions: [
      {
        title: "Quelles mutuelles sont partenaires de Remindr ?",
        content:
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
      },
      {
        title: "Comment Remindr s'intègre avec ma mutuelle ?",
        content:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      },
      {
        title: "Puis-je gérer mes remboursements via Remindr ?",
        content:
          "Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.",
      },
    ],
  },
};

export default function FAQ() {
  const [currentCategory, setCurrentCategory] =
    useState<keyof typeof FAQ_CATEGORIES>("Notre service");
  const [openQuestionIndex, setOpenQuestionIndex] = useState<
    number | undefined
  >(undefined);

  const handleCategoryClick = (category: keyof typeof FAQ_CATEGORIES) => {
    setCurrentCategory(category);
    setOpenQuestionIndex(undefined);
  };

  const handleQuestionToggle = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? undefined : index);
  };

  const currentQuestions = FAQ_CATEGORIES[currentCategory].questions;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
      {/* Navigation par catégories */}
      <div className="w-full">
        <ul className="w-full flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-2 sm:gap-3 md:gap-4 bg-light border border-gray-2 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-sm">
          {Object.keys(FAQ_CATEGORIES).map((category) => (
            <li
              key={category}
              className="w-full sm:w-auto sm:flex-1 sm:min-w-[200px] sm:max-w-[300px]"
            >
              <Button
                variant="outline"
                onClick={() =>
                  handleCategoryClick(category as keyof typeof FAQ_CATEGORIES)
                }
                isActive={currentCategory === category}
                className="w-full text-sm sm:text-base"
              >
                {category}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Liste des questions */}
      <div className="max-w-3xl mx-auto w-full">
        <FAQCollapseList
          items={currentQuestions}
          openIndex={openQuestionIndex}
          onItemToggle={handleQuestionToggle}
        />
      </div>
    </div>
  );
}
