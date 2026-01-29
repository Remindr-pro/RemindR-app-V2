import QuestionnaireStepNavigation from "@/app/components/molecules/QuestionnaireStepNavigation";
import { BASE_PATH } from "../constants";

export default function QuestionnaireMaladiesPage() {
  return (
    <>
      <p className="text-dark font-inclusive text-center">
        Étape Maladies — Contenu à venir.
      </p>

      <QuestionnaireStepNavigation
        previousHref={`${BASE_PATH}/mesures`}
        nextHref={`${BASE_PATH}/habitudes`}
      />
    </>
  );
}
