export interface ArticleSection {
  type: "paragraph" | "heading" | "subheading";
  content: string;
}

export interface ArticleAuthor {
  name: string;
  specialty: string;
  avatar: string;
  instagram?: string;
  linkedin?: string;
}

export interface RelatedArticle {
  image: string;
  category: string;
  title: string;
  date: string;
  slug: string;
  categorySlug: string;
}

export interface Article {
  slug: string;
  category: string;
  categorySlug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  imageAlt: string;
  readingTime: number; // minutes
  intro: string;
  sections: ArticleSection[];
  tags: string[];
  author: ArticleAuthor;
  relatedArticles: RelatedArticle[];
}

export const articles: Article[] = [
  {
    slug: "octobre-rose",
    category: "Prévention au quotidien",
    categorySlug: "prevention-au-quotidien",
    title: "Octobre Rose : dépister tôt pour mieux se protéger",
    description:
      "Les gestes simples recommandés pour anticiper et agir face au cancer du sein.",
    date: "01 octobre 2025",
    image: "/images/articles/article-octobre-rose.jpg",
    imageAlt: "Article Octobre Rose",
    readingTime: 4,
    intro:
      "Chaque année, le mois d'octobre est marqué par la campagne Octobre Rose, qui rappelle l'importance de la prévention et du dépistage du cancer du sein. Ce moment de sensibilisation nous invite à prendre soin de nous et à ne pas négliger les examens qui peuvent sauver des vies. Détecté à un stade précoce, le cancer du sein se soigne beaucoup mieux et les chances de guérison sont nettement améliorées. Mais comment agir concrètement, au quotidien, pour se protéger ?",
    sections: [
      {
        type: "heading",
        content: "Comprendre le dépistage et son importance",
      },
      {
        type: "paragraph",
        content:
          "Le dépistage a pour objectif de détecter des anomalies avant même que des symptômes apparaissent. La mammographie est l'examen le plus courant et permet d'identifier des cancers à un stade précoce. Pour les femmes entre 50 et 74 ans, il est recommandé de réaliser une mammographie tous les deux ans. Toutefois, certaines femmes présentent un risque plus élevé, en raison d'antécédents familiaux ou génétiques, et doivent alors commencer le suivi plus tôt, parfois dès 40 ans, et bénéficier d'un suivi plus rapproché.",
      },
      {
        type: "paragraph",
        content:
          "Mais le dépistage ne se limite pas à la mammographie. L'auto-examen des seins reste un geste simple mais essentiel. Le fait de se familiariser avec son corps permet de repérer rapidement tout changement inhabituel, comme une masse, une modification de la forme ou de la texture du sein, ou encore un écoulement. Dès qu'un changement est détecté, il est primordial de consulter un professionnel de santé, sans attendre.",
      },
      {
        type: "heading",
        content: "Des gestes simples pour renforcer sa protection",
      },
      {
        type: "paragraph",
        content:
          "Au-delà des examens médicaux, certaines habitudes du quotidien peuvent contribuer à réduire le risque de cancer du sein et améliorer la santé générale. L'activité physique régulière joue un rôle clé : marcher, courir, pratiquer une activité sportive ou même faire quelques exercices d'étirement favorisent la circulation sanguine et aident à maintenir un poids santé, ce qui est un facteur important dans la prévention.",
      },
      {
        type: "paragraph",
        content:
          "L'alimentation est également un levier de prévention puissant. Les fruits et légumes frais, les aliments riches en fibres et les protéines maigres apportent les nutriments nécessaires pour soutenir le corps. À l'inverse, limiter l'alcool et les aliments ultra-transformés contribue à réduire certains risques. Maintenir un poids stable, surtout après la ménopause, est un autre élément essentiel pour la santé du sein.",
      },
      {
        type: "paragraph",
        content:
          "Mais la prévention ne se résume pas à l'alimentation et à l'exercice. Connaître son corps et écouter les signaux qu'il envoie est tout aussi crucial. Prendre quelques minutes chaque mois pour vérifier l'état de ses seins permet de détecter rapidement un changement et d'agir avant que la situation ne s'aggrave. Participer à des campagnes comme Octobre Rose, discuter avec ses proches ou s'informer sur les avancées médicales sont également des moyens de rester proactive et de s'approprier sa santé.",
      },
      {
        type: "heading",
        content: "Intégrer la prévention dans son quotidien avec Remindr",
      },
      {
        type: "paragraph",
        content:
          "Pour que ces gestes de prévention deviennent une habitude, des outils pratiques peuvent aider. Avec Remindr, il est possible de programmer des rappels pour ses rendez-vous médicaux, pour ne pas oublier sa mammographie ou son examen gynécologique. L'application permet également de suivre l'auto-examen mensuel et de recevoir des conseils pour intégrer l'activité physique et une alimentation équilibrée dans son quotidien. Ainsi, la prévention devient simple et structurée, sans pression, mais avec efficacité.",
      },
      {
        type: "heading",
        content: "Conclusion",
      },
      {
        type: "paragraph",
        content:
          "Le cancer du sein reste l'un des cancers les plus fréquents, mais détecté tôt, il se soigne très bien. Octobre Rose est un rappel que prévenir et agir chaque jour, c'est se donner toutes les chances de rester en bonne santé. Entre examens réguliers, auto-surveillance et habitudes de vie saines, chacun peut prendre des mesures concrètes pour protéger sa santé et se sentir en confiance. L'essentiel est de rester attentif à son corps et de ne jamais hésiter à consulter dès qu'un changement est observé.",
      },
    ],
    tags: ["SANTÉ FÉMININE", "PRÉVENTION CANCER DU SEIN", "OCTOBRE ROSE"],
    author: {
      name: "Jane Doe",
      specialty: "Gynécologue",
      avatar: "/images/articles/author-jane-doe.jpg",
    },
    relatedArticles: [
      {
        image: "/images/articles/article-semaine-2.jpg",
        category: "Prévention au quotidien",
        categorySlug: "prevention-au-quotidien",
        title:
          "Auto-examen des seins : comment l'intégrer facilement à sa routine mensuelle",
        date: "2 octobre 2025",
        slug: "auto-examen-des-seins",
      },
      {
        image: "/images/articles/article-semaine-4.jpg",
        category: "Comprendre & agir",
        categorySlug: "comprendre-et-agir",
        title:
          "Movember : comprendre les enjeux du dépistage du cancer de la prostate",
        date: "25 octobre 2025",
        slug: "movember-depistage-cancer-prostate",
      },
      {
        image: "/images/articles/article-semaine-3.jpg",
        category: "Prévention au quotidien",
        categorySlug: "prevention-au-quotidien",
        title:
          "Alimentation & prévention : ces habitudes qui soutiennent la santé du sein",
        date: "17 octobre 2025",
        slug: "alimentation-prevention-sante-sein",
      },
    ],
  },
];

export function getArticleBySlug(
  categorySlug: string,
  slug: string
): Article | undefined {
  return articles.find(
    (a) => a.categorySlug === categorySlug && a.slug === slug
  );
}

export function getAllArticleSlugs() {
  return articles.map((a) => ({
    category: a.categorySlug,
    slug: a.slug,
  }));
}
