import ArticlePin from "@/app/components/ArticlePin";
import ArticlesCarousel from "@/app/components/ArticlesCarousel";
import { ArticleCardProps } from "@/app/components/ArticleCard";

const articles: ArticleCardProps[] = [
  {
    image: "/images/articles/article-semaine-1.jpg",
    category: "Prévention au quotidien",
    title: "Automne : 5 réflexes santé pour vous et vos proches",
    date: "20 octobre 2025",
  },
  {
    image: "/images/articles/articles-semaine-2.jpg",
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
    category: "Prévention au quotidien",
    title: "Vos droits santé simplifiés",
    date: "15 octobre 2025",
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
        />
      </section>

      {/* === Section Articles of the week === */}
      <section className="min-h-screen flex items-center justify-center py-24">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-6xl font-inclusive font-bold text-dark mb-4">
              À la <span className="text-greenMain">une</span> <br /> cette
              semaine.
            </h2>
            <p className="text-base md:text-lg font-inclusive font-medium text-dark">
              Des articles récents et pertinents pour vous guider au quotidien
              dans votre santé et celle de vos proches. Des conseils et astuces
              concrets faciles à mettre en place, pour prévenir et agir au bon
              moment.
            </p>
          </div>

          <div className="w-full">
            <ArticlesCarousel articles={articles} />
          </div>
        </div>
      </section>
    </>
  );
}
