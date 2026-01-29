"use client";

import Button from "../atoms/Button";

interface QuestionnaireStepNavigationProps {
  previousHref?: string;
  nextHref?: string;
  quitterHref?: string;
  previousLabel?: string;
  nextLabel?: string;
  quitterLabel?: string;
}

export default function QuestionnaireStepNavigation({
  previousHref,
  nextHref,
  quitterHref,
  previousLabel = "Précédent",
  nextLabel = "Suivant",
  quitterLabel = "Quitter",
}: QuestionnaireStepNavigationProps) {
  const leftButton = previousHref ? (
    <Button variant="outline" href={previousHref} className="min-w-[120px]">
      {previousLabel}
    </Button>
  ) : quitterHref ? (
    <Button
      variant="outline"
      href={quitterHref}
      className="min-w-[120px] text-gray-4 hover:text-dark"
    >
      {quitterLabel}
    </Button>
  ) : (
    <span className="min-w-[120px]" />
  );

  return (
    <div className="fixed bottom-0 left-0 md:left-32 right-0 z-30 bg-light border-t border-gray-2 py-4">
      <div className="max-w-4xl mx-auto px-6 xl:px-10 flex items-center justify-center gap-4">
        {leftButton}
        {nextHref ? (
          <Button variant="green" href={nextHref} className="min-w-[120px]">
            {nextLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
