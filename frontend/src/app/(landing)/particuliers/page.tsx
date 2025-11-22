import Button from "@/app/components/Button";
import Preview from "@/app/components/Preview";
import PreventionCollapse from "@/app/components/PreventionCollapse";

export default function ParticuliersPage() {
  return (
    <>
      {/* === Section Hero === */}
      <section className="min-h-screen flex flex-col items-center justify-center gap-8 px-5 lg:px-0 max-w-full md:max-w-3/4 mx-auto text-center">
        <h1 className="text-3xl md:text-6xl font-inclusive font-bold">
          Prenez soin de vous et de ceux que vous aimez, sans avoir à y penser.
        </h1>
        <p className="text-base md:text-lg font-inclusive font-medium">
          Remindr vous aide à ne rien oublier pour votre santé et celle de vos
          proches. Des rappels simples, un espace clair de prévention et de
          suivi pour toute la famille, et l’esprit enfin léger.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button href="/particuliers/inscription" variant="dark">
            Je crée mon compte
          </Button>
          <Button href="/particuliers/connexion" variant="green">
            Je me connecte
          </Button>
        </div>
      </section>

      {/* === Section Preview === */}
      <section className="min-h-screen flex flex-col items-center justify-center py-0 md:py-24">
        <Preview />
      </section>

      {/* === Section Prevention === */}
      <section className="min-h-screen flex items-center justify-center md:py-24 px-5 lg:px-0">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-6xl font-inclusive font-bold text-dark mb-4">
              La santé <span className="text-greenMain">regroupée</span> pour
              toute la famille.
            </h2>
            <p className="text-base md:text-lg font-inclusive font-medium text-dark">
              Tout est réuni au même endroit pour prendre soin de vous, et de
              ceux que vous aimez. Tout en simplicité et avec sérénité.
            </p>
          </div>

          <PreventionCollapse />
        </div>
      </section>
    </>
  );
}
