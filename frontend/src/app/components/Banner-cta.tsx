import Button from "./Button";

export default function BannerCta() {
  return (
    <div className="flex flex-col items-center justify-center bg-greenMain text-light">
      <div className="flex flex-col items-start justify-center gap-4 px-16 md:px-5 lg:px-0 py-16">
        <h3 className="text-2xl md:text-5xl font-inclusive font-medium">
          Un pas simple vers <br /> une meilleure prévention.
        </h3>
        <Button href="/particuliers/inscription" variant="light">
          Je crée mon tableau de bord santé
        </Button>
      </div>
    </div>
  );
}
