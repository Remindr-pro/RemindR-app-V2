"use client";

import { useState, useEffect, useRef } from "react";
import ArticleCard, { ArticleCardProps } from "@/app/components/molecules/ArticleCard";
import ArticlePin from "@/app/components/molecules/ArticlePin";

interface ArticlesCarouselProps {
  articles: ArticleCardProps[];
}

export default function ArticlesCarousel({ articles }: ArticlesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState<number | "auto">("auto");
  const [isPaused, setIsPaused] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoSlideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Group articles into slides (5 articles per slide max)
  const articlesPerSlide = 5;
  const totalSlides = Math.ceil(articles.length / articlesPerSlide);

  // Render layout based on number of articles
  const renderDesktopLayout = (slideArticles: ArticleCardProps[]) => {
    const count = slideArticles.length;

    // 1 article: Large format like ArticlePin
    if (count === 1) {
      return (
        <div className="hidden md:block w-full max-w-5xl mx-auto">
          <ArticlePin
            category={slideArticles[0].category}
            imageSrc={slideArticles[0].image}
            imageAlt={slideArticles[0].title}
            title={slideArticles[0].title}
            date={slideArticles[0].date}
            priority={false}
          />
        </div>
      );
    }

    // 2 articles: 2 columns
    if (count === 2) {
      return (
        <div className="hidden md:grid md:grid-cols-2 md:gap-4">
          {slideArticles.map((article, index) => (
            <div key={`article-${index}`} className="min-h-[400px]">
              <ArticleCard {...article} />
            </div>
          ))}
        </div>
      );
    }

    // 3 articles: 3 columns
    if (count === 3) {
      return (
        <div className="hidden md:grid md:grid-cols-3 md:gap-4">
          {slideArticles.map((article, index) => (
            <div key={`article-${index}`} className="min-h-[400px]">
              <ArticleCard {...article} />
            </div>
          ))}
        </div>
      );
    }

    // 4 articles: 2x2 grid
    if (count === 4) {
      return (
        <div className="hidden md:grid md:grid-cols-2 md:gap-4">
          {slideArticles.map((article, index) => (
            <div key={`article-${index}`} className="min-h-[400px]">
              <ArticleCard {...article} />
            </div>
          ))}
        </div>
      );
    }

    // 5 articles: Masonry layout
    if (count === 5) {
      return (
        <div
          className="hidden md:grid md:grid-cols-6 md:gap-4"
          style={{
            gridTemplateRows: "repeat(6, minmax(140px, 1fr))",
            height: "auto",
            minHeight: "840px",
          }}
        >
          {/* Article 0 - Top Left: 2 cols, 3 rows */}
          {slideArticles[0] && (
            <div className="col-span-2 row-span-3 w-full h-full min-h-0">
              <ArticleCard key="col1-top" {...slideArticles[0]} />
            </div>
          )}

          {/* Article 3 - Bottom Left: 2 cols, 3 rows, starts at row 4 */}
          {slideArticles[3] && (
            <div className="col-span-2 row-span-3 col-start-1 row-start-4 w-full h-full min-h-0">
              <ArticleCard key="col1-bottom" {...slideArticles[3]} />
            </div>
          )}

          {/* Article 1 - Center: 2 cols, 6 rows (full height) */}
          {slideArticles[1] && (
            <div className="col-span-2 row-span-6 col-start-3 row-start-1 w-full h-full min-h-0">
              <ArticleCard key="col2-full" {...slideArticles[1]} />
            </div>
          )}

          {/* Article 2 - Top Right: 2 cols, 3 rows */}
          {slideArticles[2] && (
            <div className="col-span-2 row-span-3 col-start-5 row-start-1 w-full h-full min-h-0">
              <ArticleCard key="col3-top" {...slideArticles[2]} />
            </div>
          )}

          {/* Article 4 - Bottom Right: 2 cols, 3 rows, starts at row 4 */}
          {slideArticles[4] && (
            <div className="col-span-2 row-span-3 col-start-5 row-start-4 w-full h-full min-h-0">
              <ArticleCard key="col3-bottom" {...slideArticles[4]} />
            </div>
          )}
        </div>
      );
    }

    // Fallback: simple grid
    return (
      <div className="hidden md:grid md:grid-cols-3 md:gap-4">
        {slideArticles.map((article, index) => (
          <ArticleCard key={`article-${index}`} {...article} />
        ))}
      </div>
    );
  };

  // Update carousel height when currentIndex changes
  useEffect(() => {
    const currentSlide = slideRefs.current[currentIndex];

    if (!currentSlide) return;

    const updateHeight = () => {
      // Wait for next frame to ensure layout is calculated
      requestAnimationFrame(() => {
        // Find the visible content (mobile or desktop)
        const mobileContent = currentSlide.querySelector(".md\\:hidden");
        const desktopContent = currentSlide.querySelector(
          '[class*="md:grid"], [class*="md:block"]'
        );

        let targetElement: Element | null = null;

        // Select the visible content based on screen size
        if (window.innerWidth >= 768) {
          // Desktop: use desktop content
          targetElement = desktopContent;
        } else {
          // Mobile: use mobile content
          targetElement = mobileContent;
        }

        // Fallback to slide if no specific content found
        if (!targetElement) {
          targetElement = currentSlide;
        }

        // Measure the actual height
        const rect = targetElement.getBoundingClientRect();
        const height = rect.height;

        if (height > 0) {
          setCarouselHeight(height);
        }
      });
    };

    // Use ResizeObserver to watch for size changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;

        if (height > 0) {
          setCarouselHeight(height);
        }
      }
    });

    // Observe the visible content
    if (window.innerWidth >= 768) {
      const desktopContent = currentSlide.querySelector(
        '[class*="md:grid"], [class*="md:block"]'
      );

      if (desktopContent) {
        resizeObserver.observe(desktopContent);
      }
    } else {
      const mobileContent = currentSlide.querySelector(".md\\:hidden");

      if (mobileContent) {
        resizeObserver.observe(mobileContent);
      }
    }

    // Also observe the slide itself as fallback
    resizeObserver.observe(currentSlide);

    // Initial measurement with multiple attempts to catch image loading
    updateHeight();
    const timeout1 = setTimeout(updateHeight, 100);
    const timeout2 = setTimeout(updateHeight, 600); // After transition

    // Also update on window resize
    window.addEventListener("resize", updateHeight);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      window.removeEventListener("resize", updateHeight);
      resizeObserver.disconnect();
    };
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    // Pause auto-slide when user manually navigates
    setIsPaused(true);
    // Resume after 8 seconds of inactivity
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 8000);
  };

  // Auto-slide functionality
  useEffect(() => {
    // Only auto-slide if there's more than one slide
    if (totalSlides <= 1) return;

    // Clear any existing interval
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
    }

    // Start auto-slide if not paused
    if (!isPaused) {
      autoSlideIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }, 5000);
    }

    // Cleanup
    return () => {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current);
      }
    };
  }, [isPaused, totalSlides]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        // Resume after a short delay when mouse leaves
        if (pauseTimeoutRef.current) {
          clearTimeout(pauseTimeoutRef.current);
        }
        pauseTimeoutRef.current = setTimeout(() => {
          setIsPaused(false);
        }, 1000);
      }}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => {
        // Resume after a delay on touch devices
        if (pauseTimeoutRef.current) {
          clearTimeout(pauseTimeoutRef.current);
        }
        pauseTimeoutRef.current = setTimeout(() => {
          setIsPaused(false);
        }, 5000);
      }}
    >
      {/* Carousel Container with Navigation Buttons */}
      <div
        className="relative w-full transition-all duration-500 ease-in-out pointer-events-none"
        style={{
          height: carouselHeight === "auto" ? "auto" : `${carouselHeight}px`,
        }}
      >
        <div className="overflow-hidden pointer-events-none">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {/* Generate slides */}
            {Array.from({ length: totalSlides }).map((_, slideIndex) => {
              const slideArticles = articles.slice(
                slideIndex * articlesPerSlide,
                slideIndex * articlesPerSlide + articlesPerSlide
              );

              return (
                <div
                  key={slideIndex}
                  ref={(el) => {
                    slideRefs.current[slideIndex] = el;
                  }}
                  className="min-w-full px-4 sm:px-6 md:px-0 pointer-events-auto"
                >
                  {/* Mobile/Tablet: Adaptive grid */}
                  <div className="md:hidden">
                    {slideArticles.length === 1 ? (
                      // 1 article on mobile: full width
                      <ArticleCard {...slideArticles[0]} />
                    ) : (
                      // 2+ articles: responsive grid
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {slideArticles.map((article, index) => (
                          <ArticleCard key={`mobile-${index}`} {...article} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Desktop: Dynamic layout based on article count */}
                  {renderDesktopLayout(slideArticles)}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8 md:mt-12 relative z-20">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 relative z-20 pointer-events-auto ${
              index === currentIndex
                ? "bg-greenMain w-8"
                : "bg-gray-3 w-2 hover:bg-gray-4"
            }`}
            aria-label={`Aller à la slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
