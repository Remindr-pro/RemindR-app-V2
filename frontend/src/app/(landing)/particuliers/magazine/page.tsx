export default function MagazinePage() {
  return (
    <>
      {/* === Section Hero === */}
      <section className="min-h-screen flex flex-col items-center justify-center gap-8 px-5 lg:px-0 max-w-full md:max-w-3/4 mx-auto text-center">
        <div className="max-w-2xl mx-auto w-full flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl md:text-6xl font-inclusive font-bold">
            Le magazine prévention Santé.
          </h1>
          <p className="text-base md:text-lg font-inclusive font-medium">
            Prenez soin de vous et de vos proches grâce à des informations
            claires, basées sur les recommandations officielles.
          </p>
        </div>
      </section>
    </>
  );
}
