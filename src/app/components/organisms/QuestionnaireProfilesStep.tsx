"use client";

import ProfileQuestionnaireCard from "../molecules/ProfileQuestionnaireCard";
import AddProfileButton from "../atoms/AddProfileButton";

export interface ProfileItem {
  id: string;
  name: string;
  role: string;
  birthdate: string;
  gender: "Femme" | "Homme" | "Non précisé";
  avatarUrl?: string;
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
  const canRemoveProfile = (profileId: string) => {
    if (!onRemoveProfile) return false;
    if (mainProfileId !== undefined) return profileId !== mainProfileId;

    return profiles.length > 1;
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
            onComplete={() => onCompleteProfile(profile.id)}
            onRemove={
              canRemoveProfile(profile.id)
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
