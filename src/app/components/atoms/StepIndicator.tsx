import IconCheck from "./icons/Check";

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const visualSteps = 4;

  const getStepState = (stepNumber: number) => {
    if (currentStep >= 5) {
      return "completed";
    }

    if (currentStep === 0) {
      return "future";
    }

    if (stepNumber < currentStep) {
      return "completed";
    }

    if (stepNumber === currentStep) {
      return "active";
    }

    return "future";
  };

  return (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: visualSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const state = getStepState(stepNumber);
        const isLast = stepNumber === visualSteps;

        return (
          <div key={stepNumber} className="flex items-center">
            {/* Étape */}
            <div className="relative flex items-center justify-center">
              {state === "completed" ? (
                // Étape complétée : cercle avec bordure et coche
                <div className="w-8 h-8 rounded-full border-2 border-greenMain bg-white flex items-center justify-center text-greenMain">
                  <IconCheck size={16} />
                </div>
              ) : state === "active" ? (
                // Étape active : grand cercle plein avec numéro
                <div className="w-10 h-10 rounded-full bg-greenMain flex items-center justify-center">
                  <span className="text-light font-inclusive font-bold text-lg">
                    {stepNumber}
                  </span>
                </div>
              ) : (
                // Étape future : petit cercle plein
                <div className="w-4.5 h-4.5 rounded-full bg-greenMain" />
              )}
            </div>
            {/* Ligne de connexion (sauf pour le dernier) */}
            {!isLast && (
              <div className="w-6 h-0.5 mx-2 bg-greenMain transition-all duration-300" />
            )}
          </div>
        );
      })}
    </div>
  );
}
