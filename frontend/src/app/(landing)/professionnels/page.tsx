import Button from "@/app/components/Button";
import Companies from "@/app/components/Companies";

export default function ProfessionnelsPage() {
  return (
    <>
      {/* === Section Hero === */}
      <section className="min-h-screen flex flex-col items-center justify-center gap-8 px-5 lg:px-0 max-w-full md:max-w-3/5 mx-auto text-center">
        <h1 className="text-3xl md:text-6xl font-inclusive font-bold">
          La prévention familiale, réinventée pour vos adhérents.
        </h1>
        <p className="text-base md:text-lg font-inclusive font-medium">
          Un accompagnement santé personnalisé, évolutif et engageant, qui aide
          vos adhérents à adopter les bons réflexes au bon moment et vous permet
          de réduire vos coûts tout en renforçant la fidélisation.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button href="/professionnels/inscription" variant="dark">
            Télécharger la documentation
          </Button>
          <Button href="/professionnels/contact" variant="green">
            Demander une démo
          </Button>
        </div>
      </section>

      {/* === Section Preview === */}
      <section className="min-h-screen flex flex-col items-center justify-center py-0 md:py-24">
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
          {/* Image */}
          <div className="bg-light border-6 md:border-8 border-gray-2 w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[660px] rounded-lg sm:rounded-xl overflow-hidden flex items-center justify-center shadow-md transition-all duration-300"></div>
        </div>
      </section>

      {/* === Section Companies === */}
      <section className="min-h-screen flex flex-col items-center justify-center gap-20 py-24">
        <div className="max-w-3xl w-full mx-auto flex flex-col gap-16 text-center">
          <h2 className="text-3xl md:text-6xl font-inclusive font-bold">
            Des sources <span className="text-greenMain">fiables</span> pour une
            santé au top.
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg font-inclusive font-regular">
            Toutes nos recommandations et rappels automatiques sont basés sur
            les recommandations officielles des organismes de santé.
          </p>
        </div>

        <Companies />
      </section>
    </>
  );
}
