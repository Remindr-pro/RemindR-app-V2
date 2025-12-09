import AvatarIcon from "../atoms/icons/Avatar";

interface FeedbackCardProps {
  name: string;
  age: number;
  role: string;
  quote: string;
  memberSince: string;
  avatar?: string;
}

export default function FeedbackCard({
  name,
  age,
  role,
  quote,
  memberSince,
}: FeedbackCardProps) {
  // Fonction pour mettre en évidence "Remindr" dans le texte
  const highlightRemindr = (text: string) => {
    const parts = text.split(/(Remindr)/gi);

    return parts.map((part, index) =>
      part.toLowerCase() === "remindr" ? (
        <span key={index} className="text-greenMain font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-light rounded-lg p-6 shadow-sm border border-gray-2 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-4">
        <AvatarIcon />

        <div>
          <h3 className="font-inclusive font-bold text-dark text-lg">
            {name}, {age} ans
          </h3>
          <p className="font-inclusive text-sm text-gray-4">{role}</p>
        </div>
      </div>
      <p className="font-inclusive text-base text-dark leading-relaxed grow">
        &ldquo;{highlightRemindr(quote)}&rdquo;
      </p>
      <p className="font-inclusive text-xs text-gray-4">
        Membre depuis {memberSince}
      </p>
    </div>
  );
}
