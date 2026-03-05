"use client";

import { useState } from "react";
import Button from "@/app/components/atoms/Button";
import FAQCollapseList from "@/app/components/organisms/FAQCollapseList";

const FAQ_CATEGORIES = {
  "Notre service": {
    questions: [
      {
        title: "Qu'est-ce que Remindr ?",
        content:
          "Remindr est votre compagnon de santé familial au quotidien. C'est une plateforme numérique conçue pour simplifier l'organisation médicale de tout votre foyer. Elle centralise vos rappels de santé (vaccins, bilans, rendez-vous), vous propose des conseils de prévention personnalisés et vous aide à ne plus oublier l'essentiel. Notre mission est d'alléger votre charge mentale tout en vous aidant à prendre soin de vous et de vos proches, de manière simple et bienveillante.",
      },
      {
        title: "Est-ce que Remindr remplace ma mutuelle ?",
        content:
          "Pas du tout ! Remindr ne remplace pas votre complémentaire santé, il la complète. Votre mutuelle s'occupe de vos remboursements et de votre couverture santé, tandis que Remindr est l'outil de service qu'elle met à votre disposition pour vous accompagner dans votre vie de tous les jours. Nous sommes le lien entre vous et votre mutuelle pour faire de la prévention un réflexe concret.",
      },
      {
        title: "À qui s'adresse Remindr ?",
        content:
          "Remindr a été pensé pour tous, mais il est particulièrement utile pour les « piliers » de la famille : les parents qui gèrent le calendrier médical des enfants, ou les aidants qui accompagnent des proches plus fragiles. Que vous soyez seul·e, en couple ou à la tête d'une famille nombreuse, l'interface est conçue pour être inclusive et facile d'utilisation, quel que soit votre âge ou votre aisance avec le numérique.",
      },
      {
        title:
          "Puis-je utiliser Remindr sans être adhérent·e d'une mutuelle partenaire ?",
        content:
          "Pour le moment, Remindr est distribué exclusivement via nos mutuelles partenaires. Ce modèle nous permet de vous offrir un service de haute qualité sans que vous ayez à payer d'abonnement individuel. Si votre mutuelle ne propose pas encore Remindr, n'hésitez pas à leur en parler ! Nous travaillons chaque jour pour étendre notre réseau et rendre la prévention accessible au plus grand nombre.",
      },
      {
        title: "Est-ce que Remindr est gratuit ?",
        content:
          "Oui, pour vous, c'est totalement gratuit ! Il n'y a aucun coût caché, aucun frais d'inscription, ni de publicité intrusive. C'est votre mutuelle qui prend en charge le coût du service dans le cadre de sa politique de prévention. Pour nous, la santé ne doit pas être une option payante, mais un service de proximité offert par votre partenaire de confiance.",
      },
    ],
  },
  "Rappels et prévention": {
    questions: [
      {
        title: "Comment fonctionnent les rappels de santé ?",
        content:
          "Le fonctionnement de Remindr repose sur un calendrier intelligent qui s'adapte à chaque membre de votre foyer. Une fois les profils créés, notre technologie croise vos données avec les recommandations officielles de santé publique pour générer des alertes automatiques concernant les vaccins, les bilans obligatoires ou les dépistages. Vous recevez ces notifications directement sur votre smartphone au moment opportun, vous permettant ainsi de libérer votre esprit de ces échéances administratives et médicales tout en garantissant un suivi rigoureux pour toute la famille.",
      },
      {
        title: "Puis-je personnaliser mes rappels ?",
        content:
          "Parce que chaque parcours de santé est unique, la personnalisation est au cœur de notre outil. En plus des rappels automatiques basés sur les standards nationaux, vous avez la main pour ajouter vos propres alertes sur mesure. Qu'il s'agisse d'une prise de médicament quotidienne, d'un renouvellement d'ordonnance spécifique ou d'un rendez-vous chez un spécialiste, vous définissez vous-même la fréquence et le mode de notification. Cette flexibilité vous permet de construire un assistant de santé qui ressemble vraiment à votre mode de vie et à vos besoins réels.",
      },
      {
        title: "Quels types de prévention sont couverts ?",
        content:
          "Remindr adopte une vision globale et bienveillante de la santé à travers quatre dimensions complémentaires. Nous couvrons la prévention physique classique, incluant le suivi vaccinal et les examens bucco-dentaires, mais aussi la santé mentale avec des conseils pour gérer le stress ou le sommeil. Nous intégrons également des thématiques de bien-être quotidien, comme la nutrition ou l'activité physique, ainsi qu'un volet dédié à l'organisation familiale pour accompagner les parents et les aidants. Cette approche transversale assure une protection complète qui évolue avec vous à chaque étape de votre vie.",
      },
    ],
  },
  "Tableau de bord": {
    questions: [
      {
        title: "Comment accéder à mon tableau de bord ?",
        content:
          "L'accès à votre espace Remindr est simplifié pour garantir votre sécurité. Vous n'avez pas besoin de créer un compte par vous-même : il vous suffit de cliquer sur le lien d'invitation personnel envoyé par votre mutuelle. Ce lien vous redirigera vers notre plateforme web où vous pourrez activer votre compte en quelques secondes grâce aux identifiants sécurisés de votre mutuelle (SSO). Une fois cette étape franchie, votre tableau de bord devient votre centre de pilotage, accessible d'un simple clic depuis n'importe quel navigateur sur ordinateur, tablette ou smartphone.",
      },
      {
        title: "Puis-je partager mon tableau de bord avec ma famille ?",
        content:
          "La gestion de la santé est souvent une affaire d'équipe, et Remindr facilite cette coordination. Une fois votre compte activé via le lien de votre mutuelle, vous avez la possibilité de créer un compte « foyer ». Vous pouvez alors inviter un autre adulte de votre famille à rejoindre cet espace partagé. Cela permet à chaque parent ou aidant de consulter les rappels des enfants ou des proches dépendants depuis son propre appareil. C'est l'outil idéal pour répartir la charge mentale au sein du couple et s'assurer qu'aucune information importante ne se perde.",
      },
      {
        title: "Quelles informations sont affichées sur le tableau de bord ?",
        content:
          "Votre tableau de bord, accessible via le portail sécurisé de votre mutuelle, est conçu comme un centre de pilotage clair et structuré. Il affiche en priorité les prochaines échéances de santé à ne pas manquer, comme les rappels de vaccins ou les dépistages recommandés pour chaque membre du foyer que vous avez enregistré. Vous y trouverez également un accès direct au Magazine Prévention pour consulter des articles adaptés à votre profil, ainsi qu'un résumé de vos routines de bien-être. Tout est organisé visuellement pour vous permettre de distinguer en un clin d'œil l'essentiel de votre actualité santé.",
      },
    ],
  },
  "Vos données": {
    questions: [
      {
        title: "Comment sont protégées mes données de santé ?",
        content:
          "La sécurité de vos informations est notre priorité absolue. Bien que Remindr se concentre principalement sur des données de prévention et d'organisation, nous appliquons les standards de sécurité les plus exigeants du secteur de la santé. Toutes vos données sont hébergées en France sur des serveurs certifiés HDS (Hébergeur de Données de Santé), un label rigoureux qui garantit une protection maximale contre les intrusions. De plus, les échanges entre votre navigateur et notre plateforme sont intégralement chiffrés pour assurer que vos informations restent confidentielles et inviolables durant leur consultation.",
      },
      {
        title: "Qui a accès à mes informations ?",
        content:
          "Vous êtes le seul maître de vos données. Remindr repose sur un principe de confidentialité stricte : votre mutuelle n'a jamais accès au détail de votre calendrier médical ni aux informations personnelles que vous saisissez. Elle reçoit uniquement des statistiques globales et anonymisées sur l'utilisation de la plateforme afin de mesurer l'efficacité de sa politique de prévention. Nos équipes techniques n'accèdent à vos données que dans des cas très limités de maintenance, et ce, sans jamais pouvoir consulter les détails liés à votre santé. Nous nous engageons formellement à ne jamais vendre ni partager vos informations à des tiers, qu'il s'agisse de laboratoires ou de régies publicitaires.",
      },
      {
        title: "Puis-je supprimer mes données ?",
        content:
          "Absolument. Conformément à la réglementation européenne sur la protection des données (RGPD), vous disposez d'un droit total à l'oubli. À tout moment, vous pouvez décider de supprimer votre compte et l'intégralité des informations qui y sont rattachées directement depuis les paramètres de votre tableau de bord. Une fois la demande validée, vos données sont définitivement effacées de nos serveurs sécurisés. Nous croyons que la confiance passe par la liberté, c'est pourquoi nous veillons à ce que vous puissiez quitter la plateforme aussi simplement que vous l'avez rejointe.",
      },
    ],
  },
  "Votre mutuelle et vous": {
    questions: [
      {
        title: "Quelles mutuelles sont partenaires de Remindr ?",
        content:
          "Remindr est une solution en plein déploiement auprès des acteurs de l'économie sociale et solidaire. Nous travaillons avec des mutuelles qui placent la prévention et l'innovation au cœur de leur engagement adhérent. Pour savoir si votre organisme est déjà partenaire, nous vous invitons à consulter votre espace adhérent habituel ou à vérifier si vous avez reçu une communication de leur part vous invitant à activer votre compte. Si Remindr n'est pas encore disponible chez vous, n'hésitez pas à le suggérer à votre mutuelle : nous sommes constamment en discussion avec de nouveaux partenaires pour étendre notre réseau.",
      },
      {
        title: "Comment Remindr s'intègre avec ma mutuelle ?",
        content:
          "L'intégration de Remindr est conçue pour être totalement transparente et sécurisée pour l'utilisateur. Grâce à une connexion technique directe avec les systèmes de votre mutuelle, vous n'avez pas de nouveau mot de passe à retenir : vous utilisez vos identifiants de mutuelle habituels pour accéder à votre tableau de bord. Cette intégration nous permet également de vous proposer des services et des conseils de prévention qui correspondent précisément aux garanties et aux programmes d'accompagnement déjà offerts par votre contrat santé, créant ainsi un écosystème cohérent et simple d'utilisation.",
      },
      {
        title: "Puis-je gérer mes remboursements via Remindr ?",
        content:
          "Non, Remindr est un outil exclusivement dédié à la prévention et à l'organisation de votre santé familiale. Pour toute question concernant vos remboursements, vos prises en charge ou vos garanties, vous devez continuer à utiliser l'application ou le portail web habituel de votre mutuelle. Notre rôle est de vous aider à ne pas oublier vos rendez-vous et vos soins importants, tandis que votre mutuelle reste votre interlocuteur unique pour la gestion administrative et financière de votre dossier santé. Ces deux espaces sont complémentaires pour vous offrir une protection complète.",
      },
    ],
  },
};

export default function FAQ() {
  const [currentCategory, setCurrentCategory] =
    useState<keyof typeof FAQ_CATEGORIES>("Notre service");
  const [openQuestionIndex, setOpenQuestionIndex] = useState<
    number | undefined
  >(undefined);

  const handleCategoryClick = (category: keyof typeof FAQ_CATEGORIES) => {
    setCurrentCategory(category);
    setOpenQuestionIndex(undefined);
  };

  const handleQuestionToggle = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? undefined : index);
  };

  const currentQuestions = FAQ_CATEGORIES[currentCategory].questions;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
      {/* Navigation par catégories */}
      <div className="w-full">
        <ul className="w-full flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-2 sm:gap-3 md:gap-4 bg-light border border-gray-2 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-sm">
          {Object.keys(FAQ_CATEGORIES).map((category) => (
            <li
              key={category}
              className="w-full sm:w-auto sm:flex-1 sm:min-w-[200px] sm:max-w-[300px]"
            >
              <Button
                variant="outline"
                onClick={() =>
                  handleCategoryClick(category as keyof typeof FAQ_CATEGORIES)
                }
                isActive={currentCategory === category}
                className="w-full text-sm sm:text-base"
              >
                {category}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Liste des questions */}
      <div className="max-w-3xl mx-auto w-full">
        <FAQCollapseList
          items={currentQuestions}
          openIndex={openQuestionIndex}
          onItemToggle={handleQuestionToggle}
        />
      </div>
    </div>
  );
}
