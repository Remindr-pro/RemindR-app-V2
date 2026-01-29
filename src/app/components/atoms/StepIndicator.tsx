import IconCheck from "./icons/Check";

interface StepIndicatorProps {
  currentStep: number;
  stepLabels?: string[];
}

export default function StepIndicator({
  currentStep,
  stepLabels,
}: StepIndicatorProps) {
  const visualSteps = stepLabels?.length ?? 4;
  const hasLabels = Boolean(stepLabels?.length);

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
        const label = stepLabels?.[index];

        return (
          <div key={stepNumber} className="flex items-center">
            {/* Étape + libellé */}
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                {state === "completed" ? (
                  <div className="w-8 h-8 rounded-full border-2 border-greenMain bg-white flex items-center justify-center text-greenMain">
                    <IconCheck size={16} />
                  </div>
                ) : state === "active" ? (
                  <div className="w-10 h-10 rounded-full bg-greenMain flex items-center justify-center">
                    <span className="text-light font-inclusive font-bold text-lg">
                      {stepNumber}
                    </span>
                  </div>
                ) : (
                  <div
                    className={`w-4.5 h-4.5 rounded-full ${
                      hasLabels ? "bg-gray-3" : "bg-greenMain"
                    }`}
                  />
                )}
              </div>
              {label && (
                <span
                  className={`mt-2 text-sm font-inclusive font-medium whitespace-nowrap ${
                    state === "active" || state === "completed"
                      ? "text-greenMain"
                      : "text-gray-3"
                  }`}
                >
                  {label}
                </span>
              )}
            </div>
            {/* Ligne de connexion (sauf pour le dernier) */}
            {!isLast && (
              <div
                className={`w-6 h-0.5 mx-2 transition-all duration-300 ${
                  hasLabels ? "bg-gray-3" : "bg-greenMain"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
