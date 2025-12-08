import Image from "next/image";

export interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
}

export default function FeatureCard({
  image,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-light border-6 md:border-8 border-gray-2 rounded-lg sm:rounded-xl p-6 h-[250px] w-[350px]">
      <div className="w-full flex flex-col items-center justify-center mb-3">
        <Image src={image} alt={title} width={56} height={56} />
      </div>
      <h3 className="text-2xl font-inclusive font-medium mb-1">{title}</h3>
      <p className="text-base font-inclusive font-regular text-gray-4">
        {description}
      </p>
    </div>
  );
}
