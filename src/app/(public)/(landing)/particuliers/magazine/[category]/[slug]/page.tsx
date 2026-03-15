import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  ArticleSection,
} from "@/lib/articles";
import Image from "next/image";
import IconCalendar from "@/app/components/atoms/icons/Calendar";
import IconInstagram from "@/app/components/atoms/icons/Instagram";
import IconLinkedIn from "@/app/components/atoms/icons/LinkedIn";
import IconRss from "@/app/components/atoms/icons/Rss";
import ArticleCard from "@/app/components/molecules/ArticleCard";

export async function generateStaticParams() {
  return getAllArticleSlugs().map((item) => ({
    category: item.category,
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticleBySlug(category, slug);
  if (!article)
    return {
      title: "Article | Remindr",
      description: "Article du magazine Remindr.",
    };
  return {
    title: `${article.title} | Remindr`,
    description: article.description || undefined,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = getArticleBySlug(category, slug);

  if (!article) notFound();

  return (
    <article className="min-h-screen bg-white">
      <section
        className="relative w-full"
        style={{ height: "min(520px, 65vw)" }}
      >
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-dark/20" />

        {/* === White overlay card === */}
        <div className="absolute inset-0 flex items-center justify-center px-3 sm:px-4">
          <div className="bg-light/60 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8 max-w-md w-full text-center shadow-xl">
            {/* Category */}
            <span className="bg-light inline-block border border-gray-1 rounded-lg px-3 py-1.5 text-xs font-inclusive font-medium text-dark mb-3 sm:mb-4">
              {article.category}
            </span>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-inclusive font-bold text-dark leading-tight mb-2 sm:mb-3">
              {article.title}
            </h1>

            {/* Description */}
            {article.description && (
              <p className="text-sm font-inclusive text-gray-4 mb-3 sm:mb-4 leading-relaxed">
                {article.description}
              </p>
            )}

            {/* Date */}
            <div className="flex items-center justify-center gap-2 text-gray-4 text-xs sm:text-sm font-inclusive">
              <IconCalendar size={14} fill="text-gray-4" />
              <span>{article.date}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-6 mb-10 pb-6 border-b border-gray-3">
            <span className="text-xs font-inclusive font-semibold text-dark uppercase tracking-wider whitespace-nowrap">
              Temps de lecture
            </span>
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-xs font-inclusive font-semibold text-dark whitespace-nowrap">
              {article.readingTime} minutes
            </span>
          </div>

          {/* Intro paragraph */}
          <p className="text-base font-inclusive text-dark leading-relaxed mb-8">
            {article.intro}
          </p>

          {/* Sections */}
          {article.sections.map((section: ArticleSection, idx: number) => {
            if (section.type === "heading") {
              return (
                <h2
                  key={idx}
                  className="text-xl font-inclusive font-bold text-greenMain mt-10 mb-4 leading-snug"
                >
                  {section.content}
                </h2>
              );
            }
            if (section.type === "subheading") {
              return (
                <h3
                  key={idx}
                  className="text-lg font-inclusive font-semibold text-dark mt-8 mb-3 leading-snug"
                >
                  {section.content}
                </h3>
              );
            }
            return (
              <p
                key={idx}
                className="text-base font-inclusive text-dark leading-relaxed mb-5"
              >
                {section.content}
              </p>
            );
          })}

          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-3">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="border border-gray-300 rounded px-3 py-1.5 text-xs font-inclusive font-medium text-dark tracking-wider uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-3 flex items-center justify-between">
            {/* Left: avatar + name */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-greenMain flex items-center justify-center flex-shrink-0">
                <span className="text-white font-inclusive font-bold text-base">
                  {article.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="text-sm font-inclusive font-semibold text-dark">
                  Écrit par {article.author.name}
                </p>
                <p className="text-xs font-inclusive text-gray-5">
                  {article.author.specialty}
                </p>
              </div>
            </div>

            {/* Right: social icons */}
            <div className="flex items-center gap-3 text-gray-5">
              {article.author.instagram && (
                <Link
                  href={article.author.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-dark transition-colors"
                  aria-label="Instagram"
                >
                  <IconInstagram size={24} className="w-6 h-6" />
                </Link>
              )}
              {article.author.linkedin && (
                <Link
                  href={article.author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-dark transition-colors"
                  aria-label="LinkedIn"
                >
                  <IconLinkedIn size={24} className="w-6 h-6" />
                </Link>
              )}
              <Link
                href="/rss"
                className="hover:text-dark transition-colors"
                aria-label="RSS"
              >
                <IconRss size={24} className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === Section related articles === */}
      {article.relatedArticles.length > 0 && (
        <section className="py-16 px-4 bg-gray-50 border-t border-gray-3">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-inclusive font-semibold text-dark mb-8">
              Autres articles qui pourraient vous intéresser
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {article.relatedArticles.map((related, idx) => (
                <div key={idx} className="w-full h-full min-h-[280px]">
                  <ArticleCard
                    variant="advice"
                    position="vertical"
                    isForward
                    image={related.image}
                    category={related.category}
                    title={related.title}
                    date={related.date}
                    href={`/particuliers/magazine/${related.categorySlug}/${related.slug}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
