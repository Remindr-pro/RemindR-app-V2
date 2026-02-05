import Image from "next/image";

export interface StepCardProps {
  number: number;
  title: string;
  description: string;
  image?: string;
}

export default function StepCard({
  number,
  title,
  description,
  image,
}: StepCardProps) {
  const getNumberIcon = (num: number) => {
    if (num >= 1 && num <= 3) {
      return `/images/icons/number-${num}.png`;
    }

    return null;
  };

  const numberIcon = getNumberIcon(number);

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-6xl">
      {/* Élément visuel à gauche */}
      <div className="w-full md:w-1/2 flex items-center justify-center order-2 md:order-1">
        <div className="w-full max-w-md aspect-4/3 md:aspect-5/4 relative bg-light border-6 md:border-8 border-gray-2 rounded-xl overflow-hidden shadow-sm">
          {image && (
            <div className="absolute inset-0 p-1 md:p-2">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-contain drop-shadow-sm"
              />
            </div>
          )}
        </div>
      </div>

      {/* Contenu à droite */}
      <div className="w-full md:w-1/2 flex flex-col gap-4 order-1 md:order-2">
        {/* Numéro avec icône */}
        <div className="flex items-center gap-4">
          {numberIcon && (
            <div className="w-12 h-12 md:w-14 md:h-14 shrink-0">
              <Image
                src={numberIcon}
                alt={`Étape ${number}`}
                width={56}
                height={56}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        {/* Titre */}
        <h3 className="text-2xl md:text-3xl font-inclusive font-bold text-dark">
          {title}
        </h3>

        {/* Description */}
        <p className="text-base md:text-lg font-inclusive font-regular text-dark">
          {description}
        </p>
      </div>
    </div>
  );
}
