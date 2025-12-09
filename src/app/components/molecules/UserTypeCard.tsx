import Image from "next/image";
import Link from "next/link";

interface UserTypeCardProps {
  illustration: string;
  title: string;
  description: string;
  link?: string;
}

export default function UserTypeCard({
  illustration,
  title,
  description,
  link,
}: UserTypeCardProps) {
  const cardContent = (
    <>
      <div className="mb-6 shrink-0">
        <Image
          src={illustration}
          alt={title}
          width={173}
          height={173}
          className="w-32 h-32 md:w-full md:h-auto max-w-[173px]"
        />
      </div>
      <h2 className="font-inclusive text-dark text-2xl font-bold mb-4">
        {title}
      </h2>
      <p className="font-inclusive text-gray-4 text-base leading-relaxed">
        {description}
      </p>
    </>
  );

  if (link) {
    return (
      <Link
        href={link}
        className="bg-light rounded-xl p-8 shadow-sm max-w-[300px] mx-auto border border-gray-2/50 flex flex-col items-center text-center hover:shadow-md transition-shadow"
      >
        {cardContent}
      </Link>
    );
  } else {
    return (
      <div className="bg-light rounded-xl p-8 shadow-sm max-w-[300px] mx-auto border border-gray-2/50 flex flex-col items-center text-center hover:shadow-md transition-shadow">
        {cardContent}
      </div>
    );
  }

  return cardContent;
}
