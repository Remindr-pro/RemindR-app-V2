import Button from "@/app/components/Button";

export default function ParticuliersPage() {
  return (
    <>
      {/* === Section Hero === */}
      <section className="min-h-screen flex flex-col items-center justify-center gap-8 px-16 md:px-5 lg:px-0 max-w-full md:max-w-3/4 mx-auto text-center">
        <h1 className="text-3xl md:text-6xl font-inclusive font-bold">
          Prenez soin de vous et de ceux que vous aimez, sans avoir à y penser.
        </h1>
        <p className="text-base md:text-lg font-inclusive font-medium">
          Remindr vous aide à ne rien oublier pour votre santé et celle de vos
          proches. Des rappels simples, un espace clair de prévention et de
          suivi pour toute la famille, et l’esprit enfin léger.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button href="/particuliers/inscription" variant="green">
            Je crée mon compte
          </Button>
          <Button href="/particuliers/connexion" variant="dark">
            Je me connecte
          </Button>
        </div>
      </section>
    </>
  );
}
