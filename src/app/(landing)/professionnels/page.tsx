import Button from "@/app/components/atoms/Button";
import Companies from "@/app/components/organisms/Companies";
import FeatureCard from "@/app/components/molecules/FeatureCard";
import StepCard from "@/app/components/molecules/StepCard";
import Image from "next/image";

export default function ProfessionnelsPage() {
  const features = [
    {
      image: "/images/icons/pepicons-print_bell-circle.png",
      title: "Rappels automatisés",
      description:
        "Basés sur les recommandations officielles. Adaptés à l'âge, au contexte familial et au mode de vie.",
    },
    {
      image: "/images/icons/pepicons-print_grid-circle.png",
      title: " Dashboard B2B clair & pilotable",
      description:
        "KPIs personnalisés, segmentation par profil, impact mesurable en temps réel.",
    },
    {
      image: "/images/icons/pepicons-print_letter-circle.png",
      title: "Communication ciblée & instantanée",
      description:
        "Envoyez des messages, alertes et campagnes directement dans l’espace adhérent.",
    },
  ];
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
          <div className="bg-light border-6 md:border-8 border-gray-2 rounded-lg sm:rounded-xl overflow-hidden shadow-md w-full max-w-[1140px]">
            <Image
              src="/images/illustrations/dashboard-mutuelle.png"
              alt="Tableau de bord professionnel Remindr"
              width={1140}
              height={662}
              className="w-full h-auto block"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1140px"
              priority
            />
          </div>
        </div>
      </section>

      {/* === Section Explaination === */}
      <section className="min-h-screen flex flex-col items-center justify-center py-0 md:py-24">
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-inclusive font-bold text-center">
            Une solution pensée pour la{" "}
            <span className="text-greenMain">prévention santé</span>… et la{" "}
            <span className="text-greenMain">performance</span> de votre
            mutuelle.
          </h2>

          <div className="flex flex-wrap gap-4 w-full justify-center my-10">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                image={feature.image}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
          <div>
            <Button variant="green" href="/professionnels/contact">
              Demander une démo
            </Button>
          </div>
        </div>
      </section>

      {/* === Section Presentation === */}
      <section className="min-h-screen flex flex-col items-center justify-center gap-20 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 text-center">
          <h2 className="text-3xl md:text-5xl font-inclusive font-bold">
            Comment nous <span className="text-greenMain">fonctionnons</span>.
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg font-inclusive font-regular">
            Nous avons développé un outil unique pour centraliser vos actions,
            comprendre vos adhérents et renforcer l’impact de votre stratégie de
            prévention.
          </p>
        </div>

        {/* Étapes */}
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
          <StepCard
            number={1}
            title="Analyse intelligente & segmentation santé personnalisée."
            description="Remindr dresse automatiquement un portrait santé global pour chaque adhérent : âge, situation, habitudes de vie, besoins déclarés... Cette analyse permet d'identifier les priorités de prévention et d'activer les bons contenus au bon moment."
          />
          <StepCard
            number={2}
            title="Recommandations & rappels automatiques."
            description="La plateforme envoie aux adhérents des rappels adaptés : vaccins, examens, dépistages, conseils nutrition/sommeil, moments clés de croissance (puberté, entrée à l'école...), bien-être mental, hygiène de vie... Toutes les recommandations sont fiables, vérifiées, et personnalisées selon les profils."
          />
          <StepCard
            number={3}
            title="Tableau de bord B2B : vos KPIs, vos actions, votre impact"
            description="Suivez en temps réel l'engagement de vos adhérents, mesurez l'impact de vos campagnes de prévention, et pilotez votre stratégie santé grâce à des indicateurs clés personnalisés. Visualisez vos actions et leur efficacité pour optimiser continuellement votre approche de la prévention."
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button href="/professionnels/inscription" variant="dark">
            Télécharger la documentation
          </Button>
          <Button href="/professionnels/contact" variant="green">
            Contacter un commercial
          </Button>
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
