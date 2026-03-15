import { FamilyMemberCardSkeleton } from "@/app/components/molecules/FamilyMemberCard";

export default function FamilyMembersLoading() {
  return (
    <div className="w-full pt-8">
      <div className="flex flex-wrap gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-w-0"
          >
            <FamilyMemberCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
