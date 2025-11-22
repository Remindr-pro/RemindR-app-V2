import Button from "@/app/components/Button";

export default function ProfessionnelsPage() {
  return (
    <>
      {/* === Section Hero === */}
      <section className="min-h-screen flex flex-col items-center justify-center gap-8 px-5 lg:px-0 max-w-full md:max-w-3/4 mx-auto text-center">
        <h1 className="text-3xl md:text-6xl font-inclusive font-bold">
          Ensemble, faisons de la prévention une force pour votre mutuelle.
        </h1>
        <p className="text-base md:text-lg font-inclusive font-medium">
          Remindr valorise votre engagement santé avec une solution
          personnalisée à l’image de votre mutuelle. En marque blanche, elle
          renforce le bien-être de vos adhérents et optimise vos coûts.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button href="/professionnels/contact" variant="green">
            Découvrir la solution Remindr
          </Button>
        </div>
      </section>
    </>
  );
}
