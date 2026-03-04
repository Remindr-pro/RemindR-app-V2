import ArticlePin from "@/app/components/molecules/ArticlePin";
import ArticlesCarousel from "@/app/components/organisms/ArticlesCarousel";
import ArticlesGrid from "@/app/components/organisms/ArticlesGrid";
import { ArticleCardProps } from "@/app/components/molecules/ArticleCard";

const articles: ArticleCardProps[] = [
  {
    image: "/images/articles/article-semaine-1.jpg",
    category: "Prévention",
    title: "Automne : 5 réflexes santé pour vous et vos proches",
    date: "20 octobre 2025",
  },
  {
    image: "/images/articles/article-semaine-2.jpg",
    category: "Bien-être global",
    title: "5 gestes pour alléger votre charge mentale santé",
    date: "16 octobre 2025",
  },
  {
    image: "/images/articles/article-semaine-3.jpg",
    category: "Prendre soin des siens",
    title: "Simplifier les rendez-vous santé de votre famille",
    date: "17 octobre 2025",
  },
  {
    image: "/images/articles/article-semaine-4.jpg",
    category: "Comprendre & agir",
    title: "Vaccins et rappels : où en êtes-vous ?",
    date: "18 octobre 2025",
  },
  {
    image: "/images/articles/article-semaine-5.jpg",
    category: "Prévention",
    title: "Vos droits santé simplifiés",
    date: "15 octobre 2025",
  },
];

const allArticles: ArticleCardProps[] = [
  {
    image: "/images/articles/article-semaine-1.jpg",
    category: "Prévention",
    title: "Check-up de rentrée : ce qu'il ne faut pas oublier",
    date: "1 septembre 2025",
  },
  {
    image: "/images/articles/article-semaine-2.jpg",
    category: "Prévention",
    title: "Les bons gestes pour renforcer l'immunité en hiver",
    date: "1 novembre 2025",
  },
  {
    image: "/images/articles/article-semaine-3.jpg",
    category: "Prendre soin des siens",
    title: "Prévenir les chutes à domicile : astuces et recommandations",
    date: "26 octobre 2025",
  },
  {
    image: "/images/articles/article-semaine-4.jpg",
    category: "Prendre soin des siens",
    title: "Bien vieillir à domicile : conseils pour les aidants",
    date: "24 octobre 2025",
  },
  {
    image: "/images/articles/article-semaine-5.jpg",
    category: "Bien-être global",
    title: "Prévenir l'anxiété grâce à de petits rituels quotidiens",
    date: "23 octobre 2025",
  },
  {
    image: "/images/articles/article-semaine-1.jpg",
    category: "Prévention",
    title: "Prévention et nutrition : ajuster son assiette selon les saisons",
    date: "25 octobre 2025",
  },
  {
    image: "/images/articles/article-semaine-2.jpg",
    category: "Comprendre & agir",
    title: "Décryptage : dépistage du cancer du col de l'utérus",
    date: "22 octobre 2025",
  },
  {
    image: "/images/articles/article-semaine-3.jpg",
    category: "Vos droits et démarches",
    title: "Comment transmettre facilement vos factures à votre mutuelle",
    date: "21 octobre 2025",
  },
  {
    image: "/images/articles/article-semaine-4.jpg",
    category: "Prévention",
    title: "Ces rappels santé qu'on oublie (et qui comptent vraiment)",
    date: "20 octobre 2025",
  },
  {
    image: "/images/articles/article-semaine-5.jpg",
    category: "Bien-être global",
    title: "L'importance du sommeil pour petits et grands",
    date: "18 octobre 2025",
  },
];

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

        {/* === Article Pin === */}
        <ArticlePin
          category="Prévention au quotidien"
          imageSrc="/images/articles/article-octobre-rose.jpg"
          imageAlt="Article Octobre Rose"
          title="Octobre Rose : dépister tôt pour mieux se protéger"
          date="01 octobre 2025"
          description="Les gestes simples recommandés pour anticiper et agir face au cancer du sein."
          href="/particuliers/magazine/prevention-au-quotidien/octobre-rose"
        />
      </section>

      {/* === Section Articles of the week === */}
      <section className="min-h-screen flex items-center justify-center py-24">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-inclusive font-bold text-dark mb-4">
              À la <span className="text-greenMain">une</span> <br /> cette
              semaine.
            </h2>
            <p className="text-base md:text-lg font-inclusive font-medium text-dark">
              Des articles récents et pertinents pour vous guider dans votre
              santé et celle de vos proches. Des conseils et astuces concrets
              faciles à mettre en place, pour prévenir et agir au bon moment.
            </p>
          </div>

          <div className="w-full">
            <ArticlesCarousel articles={articles} />
          </div>
        </div>
      </section>

      {/* === Section prevention === */}
      <section className="min-h-screen flex items-center justify-center py-24">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-inclusive font-bold text-dark mb-4">
              Explorer nos <span className="text-greenMain">conseils</span>{" "}
              santé.
            </h2>
            <p className="text-base md:text-lg font-inclusive font-medium text-dark">
              Tout est réuni au même endroit pour prendre soin de vous, et de
              ceux que vous aimez. Tout en simplicité et avec sérénité.
            </p>
          </div>

          {/* Grid articles */}
          <div className="w-full">
            <ArticlesGrid articles={allArticles} />
          </div>
        </div>
      </section>
    </>
  );
}
