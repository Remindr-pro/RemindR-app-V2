"use client";

import ProfileQuestionnaireCard from "../molecules/ProfileQuestionnaireCard";
import AddProfileButton from "../atoms/AddProfileButton";

export interface ProfileItem {
  id: string;
  name: string;
  role: string;
  birthdate: string;
  gender: "Femme" | "Homme";
  avatarUrl?: string;
}

interface QuestionnaireProfilesStepProps {
  profiles: ProfileItem[];
  onCompleteProfile: (id: string) => void;
  onRemoveProfile?: (id: string) => void;
  onAddProfile: () => void;
}

export default function QuestionnaireProfilesStep({
  profiles,
  onCompleteProfile,
  onRemoveProfile,
  onAddProfile,
}: QuestionnaireProfilesStepProps) {
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
              onRemoveProfile && profiles.length > 1
                ? () => onRemoveProfile(profile.id)
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
