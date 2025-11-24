import Button from "./Button";
import { ReactNode } from "react";

interface BannerCtaProps {
  content?: ReactNode;
  button?: string | ReactNode;
  buttonLink?: string;
}

export default function BannerCta({
  content = (
    <>
      Un pas simple vers <br /> une meilleure prévention.
    </>
  ),
  button = "Je crée mon tableau de bord santé",
  buttonLink = "/particuliers/inscription",
}: BannerCtaProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-greenMain text-light">
      <div className="flex flex-col items-start justify-center gap-4 px-8 md:px-5 lg:px-0 py-16">
        <h3 className="text-2xl md:text-5xl font-inclusive font-medium">
          {content}
        </h3>
        <Button href={buttonLink} variant="light">
          {button}
        </Button>
      </div>
    </div>
  );
}
