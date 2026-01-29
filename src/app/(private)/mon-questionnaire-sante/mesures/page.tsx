import QuestionnaireStepNavigation from "@/app/components/molecules/QuestionnaireStepNavigation";
import { BASE_PATH } from "../constants";

export default function QuestionnaireMesuresPage() {
  return (
    <>
      <p className="text-dark font-inclusive text-center">
        Étape Mesures — Contenu à venir.
      </p>

      <QuestionnaireStepNavigation
        previousHref={BASE_PATH}
        nextHref={`${BASE_PATH}/maladies`}
      />
    </>
  );
}
