"use client";

import Image from "next/image";
import Button from "@/app/components/atoms/Button";
import IconSize from "@/app/components/atoms/icons/Size";
import IconWeight from "@/app/components/atoms/icons/Weight";

interface MeasurementProfileCardProps {
  name: string;
  avatarUrl?: string;
  color?: string;
  heightValue?: string;
  weightValue?: string;
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

export default function MeasurementProfileCard({
  name,
  avatarUrl,
  color,
  heightValue,
  weightValue,
  onComplete,
}: MeasurementProfileCardProps) {
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

        <div className="flex items-start justify-center gap-6 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-2xl text-gray-4">
              <IconSize size={24} fill="currentColor" className="text-gray-5" />
            </span>
            <span className="text-sm text-gray-4 font-inclusive">
              {heightValue || "Taille"}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl text-gray-4">
              <IconWeight
                size={24}
                fill="currentColor"
                className="text-gray-5"
              />
            </span>
            <span className="text-sm text-gray-4 font-inclusive">
              {weightValue || "Poids"}
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
