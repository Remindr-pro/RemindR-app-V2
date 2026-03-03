import IconBell from "@/app/components/atoms/icons/Bell";
import IconCheck from "@/app/components/atoms/icons/Check";
import IconX from "@/app/components/atoms/icons/X";
import IconArrowRight from "@/app/components/atoms/icons/ArrowRight";
import Link from "next/link";
import IconBellHeart from "@/app/components/atoms/icons/BellHeart";

interface ReminderItem {
  id: string;
  title: string;
  person: string;
  date: string;
  source: string;
  color: "green" | "orange" | "purple" | "blue" | "pink";
  learnMoreUrl?: string;
}

interface RecommendedRemindersCardProps {
  reminders: ReminderItem[];
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
}

const colorClasses = {
  green: {
    bg: "bg-greenMain/10",
    border: "border-greenMain",
    text: "text-greenMain",
  },
  orange: {
    bg: "bg-orange/10",
    border: "border-orange",
    text: "text-orange",
  },
  purple: {
    bg: "bg-purple/10",
    border: "border-purple",
    text: "text-purple",
  },
  blue: {
    bg: "bg-blue/10",
    border: "border-blue",
    text: "text-blue",
  },
  pink: {
    bg: "bg-pink-1/10",
    border: "border-pink-1",
    text: "text-pink-1",
  },
} as const;

export default function RecommendedRemindersCard({
  reminders,
  onAccept,
  onReject,
}: RecommendedRemindersCardProps) {
  return (
    <div className="bg-light rounded-2xl p-6 xl:p-8 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <IconBellHeart size={24} className="text-greenMain" />
        <h3 className="text-base font-bold text-dark font-inclusive">
          Prévention - Rappels recommandés pour vous et vos proches
        </h3>
      </div>
      <p className="text-sm text-gray-4 font-inclusive mb-6">
        Je retrouve ici des propositions de rappels selon les recommandations
        officielles de santé pour moi et mes proches.{" "}
        <Link href="#" className="text-greenMain underline font-semibold">
          Voir tout.
        </Link>
      </p>

      <div className="flex flex-col gap-4">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className={`rounded-lg p-4 border-l-4 ${
              colorClasses[reminder.color].bg
            } ${
              colorClasses[reminder.color].border
            } flex items-start justify-between gap-4`}
          >
            <div className="flex items-start gap-3 flex-1">
              <div className="mt-1">
                <IconBell
                  size={20}
                  className={`${colorClasses[reminder.color].text}`}
                />
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm font-semibold font-inclusive mb-1 ${
                    colorClasses[reminder.color].text
                  }`}
                >
                  {reminder.title}
                </p>
                <p className="text-xs xl:text-sm text-gray-4 font-inclusive mb-2">
                  Source: {reminder.source}
                </p>
                {reminder.learnMoreUrl && (
                  <Link
                    href={reminder.learnMoreUrl}
                    className="text-xs xl:text-sm text-greenMain hover:underline font-inclusive inline-flex items-center gap-1"
                  >
                    En savoir plus
                    <IconArrowRight size={12} />
                  </Link>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs xl:text-sm text-gray-5 font-inclusive">
                  {reminder.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAccept?.(reminder.id)}
                  className={`p-0.5 rounded-full border-2 ${
                    colorClasses[reminder.color].border
                  }`}
                  aria-label="Accepter le rappel"
                >
                  <IconCheck
                    size={18}
                    className={colorClasses[reminder.color].text}
                  />
                </button>
                <button
                  onClick={() => onReject?.(reminder.id)}
                  className={`p-0.5 rounded-full border-2 ${
                    colorClasses[reminder.color].border
                  }`}
                  aria-label="Refuser le rappel"
                >
                  <IconX
                    size={18}
                    className={colorClasses[reminder.color].text}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
