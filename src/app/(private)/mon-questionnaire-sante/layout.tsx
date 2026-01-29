import { Metadata } from "next";
import QuestionnaireLayoutClient from "./QuestionnaireLayoutClient";

export const metadata: Metadata = {
  title: "Mon questionnaire santé - RemindR",
  description: "Renseignez votre profil santé et celui de vos proches.",
};

export default function QuestionnaireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QuestionnaireLayoutClient>{children}</QuestionnaireLayoutClient>;
}
