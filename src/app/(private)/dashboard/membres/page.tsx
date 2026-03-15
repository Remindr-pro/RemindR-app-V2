import type { Metadata } from "next";
import FamilyMemberCard from "@/app/components/molecules/FamilyMemberCard";
import { getMyFamilyMembers } from "@/app/actions/family";
import type { FamilyMemberViewModel } from "@/app/actions/family";

export const metadata: Metadata = {
  title: "Mes proches | Remindr",
  description:
    "Gérez les profils santé de vos proches et suivez leurs rappels depuis votre tableau de bord Remindr.",
};

export default async function FamilyPage() {
  let errorMessage: string | null = null;
  let familyMembers: FamilyMemberViewModel[] = [];

  try {
    familyMembers = await getMyFamilyMembers();
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Impossible de charger les proches pour le moment.";
  }

  if (errorMessage) {
    return (
      <div className="w-full pt-8">
        <p className="text-red-500 font-inclusive">{errorMessage}</p>
      </div>
    );
  }

  if (familyMembers.length === 0) {
    return (
      <div className="w-full pt-8">
        <p className="text-gray-4 font-inclusive">
          Aucun profil familial à afficher pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full pt-8">
      <div className="flex flex-wrap gap-6">
        {familyMembers.map((member) => (
          <div
            key={member.id}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-w-0"
          >
            <FamilyMemberCard {...member} />
          </div>
        ))}
      </div>
    </div>
  );
}
