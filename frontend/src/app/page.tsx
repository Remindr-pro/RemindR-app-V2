import Logo from "./components/Logo";
import UserTypeCard from "./components/UserTypeCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-1 relative">
      <main className="max-w-6xl mx-auto px-8 py-16 relative z-10">
        <Logo size={50} />

        <h1 className="text-2xl md:text-5xl font-inclusive w-full md:max-w-3/4 mx-auto text-dark text-center mb-16 font-bold leading-tight">
          Simplifions la santé du quotidien, pour tous.
        </h1>

        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-2 max-w-4xl mx-auto">
            <UserTypeCard
              illustration="/images/illustrations/particulier.svg"
              title="Je suis un particulier"
              description="Je prends soin de ma santé et celle de mes proches"
              link="/particuliers"
            />

            <UserTypeCard
              illustration="/images/illustrations/professionnel.svg"
              title="Je suis un professionnel"
              description="Je suis une mutuelle, une assurance santé ou un organisme de prévoyance"
              link="/professionnels"
            />
          </div>

          <div
            className="hidden md:block absolute inset-0 -z-10 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/bg/bg-with-cross.png')",
            }}
          />
        </div>
      </main>
    </div>
  );
}
