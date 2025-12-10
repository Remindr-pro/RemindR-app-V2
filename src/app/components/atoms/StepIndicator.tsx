interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps = 4,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-1.5 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        const isLast = stepNumber === totalSteps;

        return (
          <div key={stepNumber} className="flex items-center">
            {/* Cercle */}
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                isActive ? "bg-greenMain" : "bg-gray-3"
              }`}
            />
            {/* Ligne de connexion (sauf pour le dernier) */}
            {!isLast && (
              <div
                className={`w-6 h-0.5 transition-all duration-300 ${
                  isActive ? "bg-greenMain" : "bg-gray-3"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
