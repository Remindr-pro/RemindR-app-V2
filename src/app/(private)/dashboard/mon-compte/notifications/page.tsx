"use client";

import { useState } from "react";
import Image from "next/image";
import Toggle from "@/app/components/atoms/Toggle";

export default function NotificationsPage() {
  const [healthReminders, setHealthReminders] = useState(true);
  const [personalizedAdvice, setPersonalizedAdvice] = useState(true);
  const [updatesAndNews, setUpdatesAndNews] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [partnerOffers, setPartnerOffers] = useState(true);

  return (
    <div className="w-full mx-auto pt-8">
      <div className="p-8 bg-light rounded-2xl">
        <h1 className="text-4xl font-bold text-dark mb-6 font-inclusive">
          Notifications
        </h1>

        <p className="text-base text-dark font-inclusive mb-8 leading-relaxed">
          <span className="font-bold">
            Gérez vos préférences en toute simplicité.
          </span>
          <br />
          Ici, vous pouvez modifier vos paramètres de compte, gérer vos
          notifications et ajuster vos préférences pour que Remindr
          s&apos;adapte parfaitement à vos besoins.
        </p>

        <div className="flex flex-col gap-8">
          {/* Section Notifications */}
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-3">
              <Image
                src="/images/icons/bell.png"
                alt="Notifications"
                width={24}
                height={24}
                className="w-9 h-9"
              />
              <h2 className="text-xl font-bold text-dark font-inclusive">
                Notifications
              </h2>
            </div>

            <div className="flex flex-col gap-6 pl-9">
              {/* Rappels de santé */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-base font-semibold text-dark font-inclusive mb-1">
                    Rappels de santé
                  </p>
                  <p className="text-sm text-gray-4 font-inclusive">
                    (notification pour les rendez-vous médicaux, vaccins, bilans
                    de santé, etc.)
                  </p>
                </div>
                <Toggle
                  id="health-reminders"
                  checked={healthReminders}
                  onChange={setHealthReminders}
                />
              </div>

              {/* Conseils personnalisés */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-base font-semibold text-dark font-inclusive mb-1">
                    Conseils personnalisés
                  </p>
                  <p className="text-sm text-gray-4 font-inclusive">
                    (recevoir des recommandations adaptées en fonction de votre
                    profil et ceux de vos proches)
                  </p>
                </div>
                <Toggle
                  id="personalized-advice"
                  checked={personalizedAdvice}
                  onChange={setPersonalizedAdvice}
                />
              </div>

              {/* Mises à jour et nouveautés */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-base font-semibold text-dark font-inclusive mb-1">
                    Mises à jour et nouveautés
                  </p>
                  <p className="text-sm text-gray-4 font-inclusive">
                    (informations sur de nouvelles fonctionnalités ou contenus)
                  </p>
                </div>
                <Toggle
                  id="updates-news"
                  checked={updatesAndNews}
                  onChange={setUpdatesAndNews}
                />
              </div>
            </div>
          </div>

          {/* Section Gestion des e-mails */}
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-3">
              <Image
                src="/images/icons/letter.png"
                alt="Gestion des e-mails"
                width={24}
                height={24}
                className="w-9 h-9"
              />
              <h2 className="text-xl font-bold text-dark font-inclusive">
                Gestion des e-mails
              </h2>
            </div>

            <div className="flex flex-col gap-6 pl-9">
              {/* Récapitulatif hebdomadaire */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-base font-semibold text-dark font-inclusive mb-1">
                    Recevoir un récapitulatif hebdomadaire
                  </p>
                  <p className="text-sm text-gray-4 font-inclusive">
                    (un email avec vos rappels à venir et conseils clés)
                  </p>
                </div>
                <Toggle
                  id="weekly-summary"
                  checked={weeklySummary}
                  onChange={setWeeklySummary}
                />
              </div>

              {/* Offres partenaires */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-base font-semibold text-dark font-inclusive mb-1">
                    Recevoir des offres partenaires
                  </p>
                  <p className="text-sm text-gray-4 font-inclusive">
                    (produits et services en lien avec votre bien-être et santé)
                  </p>
                </div>
                <Toggle
                  id="partner-offers"
                  checked={partnerOffers}
                  onChange={setPartnerOffers}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
