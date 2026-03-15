"use client";

import Image from "next/image";
import Button from "@/app/components/atoms/Button";
import Skeleton from "@/app/components/atoms/Skeleton";
import IconSport from "@/app/components/atoms/icons/Sport";
import IconFood from "@/app/components/atoms/icons/Food";
import IconAddiction from "@/app/components/atoms/icons/Addiction";

interface HabitsProfileCardProps {
  name: string;
  avatarUrl?: string;
  color?: string;
  hasSport?: boolean;
  hasFood?: boolean;
  hasAddictions?: boolean;
  onComplete: () => void;
}

const defaultAvatar = "/images/illustrations/avatar.png";
const DEFAULT_BORDER_COLOR = "#1aa484";

function resolveBorderColor(color?: string): string {
  if (!color) return DEFAULT_BORDER_COLOR;

  const normalized = color.trim().toLowerCase();
  if (normalized === "green") return "#1aa484";
  if (normalized === "purple") return "#ab7dfa";
  if (normalized === "blue") return "#4a90e2";
  if (normalized === "pink") return "#a31b39";
  if (normalized === "orange") return "#f4a261";

  return color;
}

export default function HabitsProfileCard({
  name,
  avatarUrl,
  color,
  hasSport,
  hasFood,
  hasAddictions,
  onComplete,
}: HabitsProfileCardProps) {
  return (
    <div
      className="bg-light rounded-2xl p-6 border-2 shadow-sm hover:shadow-md transition-shadow flex flex-col relative min-w-[240px] w-[240px]"
      style={{ borderColor: resolveBorderColor(color) }}
    >
      <div className="relative h-24 w-24 rounded-full overflow-hidden mx-auto mb-4">
        <Image
          src={avatarUrl || defaultAvatar}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col flex-1 text-center">
        <h3 className="text-xl font-bold text-dark mb-1 font-inclusive">
          {name}
        </h3>

        <div className="flex items-start justify-center gap-4 mb-4">
          <div className="flex flex-col items-center min-w-0">
            <span
              className={`text-2xl ${hasSport ? "text-dark" : "text-gray-4"}`}
            >
              <IconSport size={24} />
            </span>
          </div>
          <div className="flex flex-col items-center min-w-0">
            <span
              className={`text-2xl ${hasFood ? "text-dark" : "text-gray-4"}`}
            >
              <IconFood size={24} />
            </span>
          </div>
          <div className="flex flex-col items-center min-w-0">
            <span
              className={`text-2xl ${hasAddictions ? "text-dark" : "text-gray-4"}`}
            >
              <IconAddiction size={24} />
            </span>
          </div>
        </div>

        <Button
          variant="green"
          onClick={onComplete}
          className="w-full mt-auto"
          size="default"
        >
          Compléter
        </Button>
      </div>
    </div>
  );
}

const habitsCardBaseClasses =
  "bg-light rounded-2xl p-6 border-2 border-gray-2 shadow-sm flex flex-col relative min-w-[240px] w-[240px]";

export function HabitsProfileCardSkeleton() {
  return (
    <div className={habitsCardBaseClasses}>
      <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
      <div className="flex flex-col flex-1 text-center">
        <Skeleton className="h-6 w-32 mx-auto mb-1" />
        <div className="flex items-start justify-center gap-4 mb-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-6 w-6 rounded mx-auto" />
          ))}
        </div>
        <Skeleton className="h-10 w-full rounded-md mt-auto" />
      </div>
    </div>
  );
}
