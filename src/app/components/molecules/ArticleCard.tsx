import Image from "next/image";
import Link from "next/link";
import IconCalendar from "@/app/components/atoms/icons/Calendar";

export type ArticleVariant = "spotlight" | "advice";
export type ArticlePosition = "vertical" | "horizontal";

export interface ArticleCardProps {
  image: string;
  category: string;
  title: string;
  date: string;
  variant?: ArticleVariant;
  position?: ArticlePosition;
  isForward?: boolean;
  href?: string;
}

export default function ArticleCard({
  image,
  category,
  title,
  date,
  variant = "advice",
  position = "vertical",
  isForward = false,
  href,
}: ArticleCardProps) {
  // Styles conditionnels selon les props
  const containerClasses = [
    "relative rounded-xl md:rounded-2xl overflow-hidden h-full w-full group cursor-pointer",
    position === "horizontal" && "flex flex-row",
    variant === "spotlight"
      ? "shadow-lg"
      : isForward
      ? "shadow-xl"
      : "shadow-md",
    isForward &&
      variant === "spotlight" &&
      "ring-2 ring-greenMain ring-offset-2",
    position === "vertical"
      ? "min-h-[240px] sm:min-h-[280px] md:min-h-0"
      : "min-h-[200px] md:min-h-[250px]",
  ]
    .filter(Boolean)
    .join(" ");

  const imageContainerClasses = [
    "relative",
    position === "horizontal" ? "w-1/2 min-w-[200px]" : "w-full h-full min-h-0",
  ]
    .filter(Boolean)
    .join(" ");

  const contentClasses = [
    "absolute inset-0",
    position === "horizontal"
      ? "flex flex-row items-center justify-start p-4 md:p-6 lg:p-8"
      : isForward && variant === "advice"
      ? "flex flex-col justify-start items-start text-left"
      : "flex flex-col justify-center items-center p-3 md:p-4 lg:p-5",
  ]
    .filter(Boolean)
    .join(" ");

  const overlayClasses = [
    "absolute inset-0 transition-all duration-300",
    position === "horizontal"
      ? "bg-gradient-to-r from-dark/80 via-dark/60 to-dark/40 group-hover:from-dark/90 group-hover:via-dark/70 group-hover:to-dark/50"
      : isForward && variant === "advice"
      ? "bg-gradient-to-t from-dark/75 via-dark/55 to-dark/35 group-hover:from-dark/85 group-hover:via-dark/65 group-hover:to-dark/45"
      : "bg-gradient-to-t from-dark/75 via-dark/50 to-dark/30 group-hover:from-dark/90 group-hover:via-dark/70 group-hover:to-dark/50",
  ]
    .filter(Boolean)
    .join(" ");

  const categoryTagClasses = [
    variant === "spotlight"
      ? "bg-greenMain border border-greenMain-2 text-light"
      : "bg-light border border-gray-3 text-dark",
    "rounded-lg px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-inclusive font-medium",
    position === "horizontal" ? "mb-3" : "mb-2 md:mb-3",
  ]
    .filter(Boolean)
    .join(" ");

  const titleClasses = [
    "text-light font-inclusive font-bold leading-tight",
    position === "horizontal"
      ? "text-lg md:text-xl lg:text-2xl mb-3"
      : "text-base md:text-xl lg:text-2xl mb-2 md:mb-3",
    variant === "spotlight" && "text-xl md:text-2xl lg:text-3xl",
  ]
    .filter(Boolean)
    .join(" ");

  const cardContent = (
    <div className={containerClasses}>
      <div className={imageContainerClasses}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      {/* Overlay Gradient */}
      <div className={overlayClasses} />

      {/* Content */}
      <div className={contentClasses}>
        {/* Category Tag - Top Left */}
        {position === "vertical" && isForward && variant === "advice" ? (
          <>
            <div className="absolute top-3 md:top-4 left-3 md:left-4">
              <span className={categoryTagClasses}>{category}</span>
            </div>
            {/* Title and Date - Bottom Left */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-start justify-end p-3 md:p-4 lg:p-5">
              <h3 className={titleClasses}>{title}</h3>
              <div className="flex items-center gap-2 text-light text-xs md:text-sm font-inclusive font-medium">
                <IconCalendar size={14} fill="text-light" />
                <span>{date}</span>
              </div>
            </div>
          </>
        ) : (
          <div
            className={`flex flex-col ${
              position === "horizontal"
                ? "items-start max-w-md"
                : "items-center"
            }`}
          >
            {/* Category Tag */}
            <div
              className={position === "horizontal" ? "mb-3" : "mb-2 md:mb-3"}
            >
              <span className={categoryTagClasses}>{category}</span>
            </div>

            {/* Title */}
            <h3 className={titleClasses}>{title}</h3>

            {/* Date */}
            <div className="flex items-center gap-2 text-light text-xs md:text-sm font-inclusive font-medium">
              <IconCalendar size={14} fill="text-light" />
              <span>{date}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
