"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import IconPeopleLink from "@/app/components/atoms/icons/PeopleLink";
import ProgressBar from "@/app/components/atoms/ProgressBar";
import { BASE_PATH, PROFILE_ID_SEARCH_PARAM } from "@/app/(private)/mon-questionnaire-sante/constants";

interface FamilyMemberCardProps {
  id: string;
  name: string;
  role: string;
  gender: "Femme" | "Homme" | "Non renseigné";
  birthdate: string;
  email?: string;
  showPeopleLink?: boolean;
  profileCompletion: number;
  avatarUrl?: string;
  borderColor: "green" | "purple" | "blue" | "pink" | "orange";
}

const borderColorClasses = {
  green: "border-greenMain",
  purple: "border-purple",
  blue: "border-blue",
  pink: "border-pink-2",
  orange: "border-orange",
};

export default function FamilyMemberCard({
  id,
  name,
  role,
  gender,
  birthdate,
  email,
  showPeopleLink = false,
  profileCompletion,
  avatarUrl,
  borderColor,
}: FamilyMemberCardProps) {
  const defaultAvatar = "/images/illustrations/avatar.png";
  const questionnaireHref = `${BASE_PATH}?${PROFILE_ID_SEARCH_PARAM}=${encodeURIComponent(id)}`;

  return (
    <Link
      href={questionnaireHref}
      className={`bg-light rounded-2xl p-6 border-2 ${borderColorClasses[borderColor]} shadow-sm hover:shadow-md transition-shadow flex flex-col relative`}
    >
      {/* Icône PeopleLink en haut à droite */}
      {showPeopleLink && (
        <button
          type="button"
          className="absolute top-6 right-6 text-gray-4 hover:text-dark transition-colors z-10"
          aria-label="Lien du profil"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          <IconPeopleLink size={18} fill="currentColor" />
        </button>
      )}

      {/* Photo de profil*/}
      <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4">
        <Image
          src={avatarUrl || defaultAvatar}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Contenu */}
      <div className="flex flex-col flex-1">
        {/* Informations personnelles */}
        <div className="mb-4 text-left flex-1">
          <h3 className="text-xl font-bold text-dark mb-1 font-inclusive">
            {name}
          </h3>
          <p className="text-sm text-gray-4 italic font-inclusive mb-2">
            {role}
          </p>
          <div className="flex flex-col gap-1 text-sm text-dark font-inclusive">
            <span>{gender}</span>
            <span>{birthdate}</span>
            <div className="min-h-5">
              {email && <span className="text-gray-4">{email}</span>}
            </div>
          </div>
        </div>

        {/* Séparateur et barre de progression */}
        <div className="mt-auto">
          <div className="border-t border-gray-2 mb-4"></div>
          <ProgressBar
            percentage={profileCompletion}
            color={borderColor}
            label={`Profil renseigné à ${profileCompletion}%`}
          />
        </div>
      </div>
    </Link>
  );
}
