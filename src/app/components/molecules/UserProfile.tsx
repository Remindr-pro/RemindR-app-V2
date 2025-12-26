"use client";

import Image from "next/image";

interface UserProfileProps {
  name: string;
  accountType: string;
  avatarUrl?: string;
  onLogout?: () => void;
}

export default function UserProfile({
  name,
  accountType,
  avatarUrl,
  onLogout,
}: UserProfileProps) {
  const defaultAvatar = "/images/articles/article-semaine-1.jpg";

  return (
    <div className="px-4 pb-6">
      <div className="flex items-center justify-between rounded-2xl bg-light px-3 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0">
            <Image
              src={avatarUrl || defaultAvatar}
              alt="Photo de profil"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{name}</span>
            <span className="text-xs text-gray-500 font-inclusive">
              {accountType}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="flex h-8 w-8 items-center justify-center shrink-0 hover:opacity-80 transition-opacity"
          aria-label="Déconnexion"
        >
          <Image
            src="/images/icons/logout.png"
            alt="Déconnexion"
            width={15}
            height={15}
            className="drop-shadow-sm"
          />
        </button>
      </div>
    </div>
  );
}
