"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Badge from "@/app/components/atoms/Badge";
import BlogCarouselCard from "@/app/components/molecules/BlogCarouselCard";
import RecommendedRemindersCard from "@/app/components/molecules/RecommendedRemindersCard";
import CommunicationCard from "@/app/components/molecules/CommunicationCard";
import PromotionalCard from "@/app/components/molecules/PromotionalCard";
import DashboardSidebar from "@/app/components/molecules/DashboardSidebar";
import WelcomeProfileModal from "@/app/components/organisms/WelcomeProfileModal";
import type { ArticleCardProps } from "@/app/components/molecules/ArticleCard";
import { useAuth } from "@/lib/auth-provider";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: "1",
      day: "3",
      month: "NOV",
      content:
        "Pensez à votre contrôle de vue. Avantages adhérents chez Clair&Net disponibles maintenant.",
      actionText: "Prendre rendez-vous avec un partenaire près de chez vous",
      actionUrl: "#",
    },
    {
      id: "2",
      day: "29",
      month: "OCT",
      content:
        "Vous venez d'avoir un rendez-vous ostéopathie. Avez-vous pensé à envoyer votre facture pour remboursement ?",
      actionText: "Envoyez-nous votre facture",
      actionUrl: "#",
    },
  ]);

  const [reminders] = useState([
    {
      id: "1",
      title:
        "Consultation de suivi des 3 ans / bilan visuel et langage pour Milo",
      person: "Milo",
      date: "Nov. 2025",
      source: "ameli.fr",
      color: "orange" as const,
      learnMoreUrl: "#",
    },
    {
      id: "2",
      title: "Dépistage du cancer du col de l'utérus pour Camille",
      person: "Camille",
      date: "Nov. 2025",
      source: "ameli.fr",
      color: "purple" as const,
      learnMoreUrl: "#",
    },
    {
      id: "3",
      title:
        "Dépistage tension artérielle et bilan cardiologique de routine pour Maxime",
      person: "Maxime",
      date: "Déc. 2025",
      source: "www.santepubliquefrance.fr",
      color: "blue" as const,
      learnMoreUrl: "#",
    },
  ]);

  const blogArticles: ArticleCardProps[] = [
    {
      image: "/images/articles/article-semaine-1.jpg",
      category: "Prévention au quotidien",
      title: "Automne: 5 réflexes santé pour vous et vos proches",
      date: "20 octobre 2025",
      variant: "advice",
      position: "vertical",
      isForward: true,
    },
  ];

  const handleDismissMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const handleAcceptReminder = (id: string) => {
    console.log("Rappel accepté:", id);
    // Logique d'acceptation du rappel
  };

  const handleRejectReminder = (id: string) => {
    console.log("Rappel refusé:", id);
    // Logique de refus du rappel
  };

  const userName = user?.firstName ?? "Camille";

  return (
    <div className="w-full mx-auto bg-gray-1 rounded-2xl">
      <WelcomeProfileModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        userName={userName}
        onCompleteProfile={() => {
          setShowWelcomeModal(false);
          router.push("/dashboard/mon-compte");
        }}
        onIgnore={() => setShowWelcomeModal(false)}
      />

      <div className="flex flex-col gap-4">
        <div className="h-16 flex items-center justify-between border-b border-gray-2">
          <div className="px-6 xl:px-10 flex items-center justify-between gap-4 flex-1">
            <h2 className="text-xl font-semibold">
              Bonjour,{" "}
              <span className="text-greenMain">
                {user?.firstName || "Utilisateur"}
              </span>
            </h2>

            <div className="flex items-center gap-3">
              <Badge
                text="Camille"
                size="sm"
                variant="outline"
                color="purple"
              />
              <Badge text="Maxime" size="sm" variant="outline" color="blue" />
              <Badge text="Alice" size="sm" variant="outline" color="pink" />
              <Badge text="Milo" size="sm" variant="outline" color="orange" />
              <Badge text="Voir tout le monde" size="sm" color="green" />
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 xl:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Contenu principal - Colonne gauche */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            {/* Première ligne : Campagne prévention + Blog */}
            <div className="flex flex-col md:flex-row gap-6">
              <div>
                <PromotionalCard
                  image="/images/illustrations/pub-mutuelle-2.png"
                  title="Envie d'une mutuelle plus humaine ?"
                />
              </div>

              <div className="w-full">
                <BlogCarouselCard articles={blogArticles} />
              </div>
            </div>

            {/* Deuxième ligne : Rappels recommandés - Pleine largeur */}
            <div>
              <RecommendedRemindersCard
                reminders={reminders}
                onAccept={handleAcceptReminder}
                onReject={handleRejectReminder}
              />
            </div>

            {/* Troisième ligne : Carte promotionnelle + Communication */}
            <div className="flex gap-6">
              <div className="w-full">
                <CommunicationCard
                  messages={messages.map((msg) => ({
                    ...msg,
                    onDismiss: handleDismissMessage,
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Sidebar droite - Calendrier et Rappels */}
          <div className="lg:w-70 xl:w-80 shrink-0">
            <DashboardSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
