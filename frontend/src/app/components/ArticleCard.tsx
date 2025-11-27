import Image from "next/image";
import Button from "./Button";
import IconCalendar from "./icons/Calendar";

export interface ArticleCardProps {
  image: string;
  category: string;
  title: string;
  date: string;
}

export default function ArticleCard({
  image,
  category,
  title,
  date,
}: ArticleCardProps) {
  return (
    <div className="relative rounded-xl md:rounded-2xl overflow-hidden h-full w-full min-h-[240px] sm:min-h-[280px] md:min-h-0 group cursor-pointer">
      <div className="relative w-full h-full min-h-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-4 lg:p-5">
        {/* Category Tag */}
        <div className="mb-2 md:mb-3">
          <Button
            variant="light"
            className="px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm"
          >
            {category}
          </Button>
        </div>

        {/* Title */}
        <h3 className="text-light text-base md:text-xl lg:text-2xl font-inclusive font-bold mb-2 md:mb-3 leading-tight">
          {title}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-2 text-light text-xs md:text-sm font-inclusive font-medium">
          <IconCalendar size={14} fill="text-light" />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
