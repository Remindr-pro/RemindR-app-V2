import Image from "next/image";
import Link from "next/link";

interface PromotionalCardProps {
  image: string;
  title: string;
  linkUrl?: string;
}

export default function PromotionalCard({
  image,
  title,
  linkUrl,
}: PromotionalCardProps) {
  const cardContent = (
    <div className="w-full lg:w-[490px] h-[256px] relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative h-full min-h-[200px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
    </div>
  );

  if (linkUrl) {
    return <Link href={linkUrl}>{cardContent}</Link>;
  }

  return cardContent;
}
