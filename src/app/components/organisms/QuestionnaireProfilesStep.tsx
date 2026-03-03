"use client";

import ProfileQuestionnaireCard from "@/app/components/molecules/ProfileQuestionnaireCard";
import AddProfileButton from "@/app/components/atoms/AddProfileButton";

export interface ProfileItem {
  id: string;
  name: string;
  role: string;
  birthdate: string;
  gender: "Femme" | "Homme" | "Non précisé";
  avatarUrl?: string;
  color?: string;
  link?: string;
  email?: string;
}

interface QuestionnaireProfilesStepProps {
  profiles: ProfileItem[];
  onCompleteProfile: (id: string) => void;
  onRemoveProfile?: (id: string) => void;
  onAddProfile: () => void;
  mainProfileId?: string;
}

export default function QuestionnaireProfilesStep({
  profiles,
  onCompleteProfile,
  onRemoveProfile,
  onAddProfile,
  mainProfileId,
}: QuestionnaireProfilesStepProps) {
  const canRemoveProfile = (profile: ProfileItem) => {
    if (!onRemoveProfile) return false;
    if (mainProfileId !== undefined && profile.id === mainProfileId) return false;

    const email = profile.email?.toLowerCase() || "";
    const isSimpleProfile = !email || email.endsWith("@remindr.local");

    return isSimpleProfile;
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row md:flex-wrap items-center md:items-start gap-4 md:gap-6">
        {profiles.map((profile) => (
          <ProfileQuestionnaireCard
            key={profile.id}
            name={profile.name}
            role={profile.role}
            birthdate={profile.birthdate}
            gender={profile.gender}
            avatarUrl={profile.avatarUrl}
            color={profile.color}
            onComplete={() => onCompleteProfile(profile.id)}
            onRemove={
              canRemoveProfile(profile)
                ? () => onRemoveProfile?.(profile.id)
                : undefined
            }
          />
        ))}
        <div className="flex items-center mt-5 md:mt-0 md:min-h-[320px]">
          <AddProfileButton onClick={onAddProfile} />
        </div>
      </div>
    </div>
  );
}
