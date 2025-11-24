import Button from "@/app/components/Button";
import IconPin from "@/app/components/icons/Pin";
import Image from "next/image";

interface ArticlePinProps {
  category: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  date: string;
  description: string;
}

export default function ArticlePin({
  category,
  imageSrc,
  imageAlt,
  title,
  date,
  description,
}: ArticlePinProps) {
  return (
    <div className="w-full max-w-5xl mx-auto mt-4 md:mt-8 px-4 md:px-0">
      <div className="relative bg-pink-0 rounded-xl md:rounded-2xl overflow-hidden">
        <div className="absolute top-3 left-3 md:top-6 md:left-6 z-10 flex items-center gap-1.5 md:gap-2">
          <span className="bg-light rounded-lg px-1.5 py-1.5 md:px-2 md:py-2 flex items-center justify-center">
            <span className="md:hidden">
              <IconPin size={16} fill="text-dark" />
            </span>
            <span className="hidden md:block">
              <IconPin size={20} fill="text-dark" />
            </span>
          </span>

          {/* Category */}
          <Button
            variant="light"
            className="px-2.5 py-1.5 md:px-4 md:py-2 text-xs md:text-sm"
          >
            {category}
          </Button>
        </div>

        {/* Image Container */}
        <div className="relative w-full aspect-3/4 md:aspect-[2.2/1]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent md:from-black/60 md:via-black/20" />

          {/* Article info */}
          <div className="absolute top-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12 flex flex-col justify-center md:justify-end">
            <h2 className="text-xl md:text-4xl lg:text-5xl font-inclusive font-bold text-light mb-2 md:mb-3 leading-tight md:leading-normal">
              {title}
            </h2>
            <p className="text-sm md:text-base lg:text-lg font-inclusive font-medium text-light/95 md:text-light/90 leading-snug">
              {date} / {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
