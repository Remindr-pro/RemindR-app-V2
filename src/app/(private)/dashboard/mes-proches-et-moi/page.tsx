import FamilyMemberCard from "@/app/components/molecules/FamilyMemberCard";

export default function FamilyPage() {
  const familyMembers = [
    {
      name: "Camille Dupont",
      role: "Profil principal",
      gender: "Femme" as const,
      birthdate: "Née le 18 avril 1988",
      email: "camille.dupont@mail.com",
      profileCompletion: 50,
      borderColor: "purple" as const,
      avatarUrl: "/images/articles/article-semaine-1.jpg",
    },
    {
      name: "Maxime Dupont",
      role: "Conjoint",
      gender: "Homme" as const,
      birthdate: "Né le 11 janvier 1989",
      email: "maxime.dupont@mail.com",
      profileCompletion: 30,
      borderColor: "blue" as const,
      avatarUrl: "/images/articles/article-semaine-2.jpg",
    },
    {
      name: "Alice Dupont",
      role: "Fille",
      gender: "Femme" as const,
      birthdate: "Née le 6 novembre 2018",
      profileCompletion: 80,
      borderColor: "pink" as const,
    },
    {
      name: "Milo Dupont",
      role: "Fils",
      gender: "Homme" as const,
      birthdate: "Né le 2 mai 2022",
      profileCompletion: 100,
      borderColor: "orange" as const,
      avatarUrl: "/images/articles/article-semaine-3.jpg",
    },
  ];

  return (
    <div className="w-full pt-8">
      <div className="flex flex-wrap gap-6">
        {familyMembers.map((member) => (
          <div
            key={member.name}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-w-0"
          >
            <FamilyMemberCard {...member} />
          </div>
        ))}
      </div>
    </div>
  );
}
