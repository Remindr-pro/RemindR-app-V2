import QuestionnaireStepNavigation from "@/app/components/molecules/QuestionnaireStepNavigation";
import { BASE_PATH } from "../constants";

export default function QuestionnaireHabitudesPage() {
  return (
    <>
      <p className="text-dark font-inclusive text-center mb-6">
        Étape Habitudes — Contenu à venir.
      </p>

      <QuestionnaireStepNavigation
        previousHref={`${BASE_PATH}/maladies`}
        nextHref="/dashboard"
        nextLabel="Terminer le questionnaire"
      />
    </>
  );
}
