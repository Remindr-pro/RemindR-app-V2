import Link from "next/link";
import IconX from "@/app/components/atoms/icons/X";
import IconArrowRight from "@/app/components/atoms/icons/ArrowRight";
import Button from "@/app/components/atoms/Button";
import IconBubbleChatNotification from "@/app/components/atoms/icons/BubbleChatNotification";

interface MessageItem {
  id: string;
  day: string;
  month: string;
  content: string;
  actionText?: string;
  actionUrl?: string;
  onDismiss?: (id: string) => void;
}

interface CommunicationCardProps {
  messages: MessageItem[];
}

export default function CommunicationCard({
  messages,
}: CommunicationCardProps) {
  return (
    <div className="bg-light rounded-2xl p-6 xl:p-8 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <IconBubbleChatNotification size={24} className="text-greenMain" />
        <h3 className="text-base font-bold text-dark font-inclusive">
          Communiquer avec nous
        </h3>
      </div>
      <p className="text-sm text-gray-4 font-inclusive mb-6">
        Un espace d&apos;échange direct avec votre mutuelle : conseils de
        prévention, envoi de vos documents et suivi simplifié.
      </p>

      <div className="flex flex-col gap-4 mb-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-gray-1 rounded-xl p-4 border border-gray-2 relative"
          >
            <button
              onClick={() => message.onDismiss?.(message.id)}
              className="absolute top-3 right-3 p-1 hover:bg-gray-2 rounded-full transition-colors"
              aria-label="Fermer le message"
            >
              <IconX size={14} className="text-gray-4" />
            </button>

            <div className="flex items-start gap-5">
              <div className="flex flex-col items-center shrink-0 text-lg text-gray-5 font-semibold font-inclusive">
                <p>{message.day}</p>
                <p>{message.month}</p>
              </div>

              <div className="flex-1">
                <p className="text-sm text-dark font-inclusive mb-2">
                  {message.content}
                </p>
                {message.actionText && message.actionUrl && (
                  <Link
                    href={message.actionUrl}
                    className="text-sm text-greenMain hover:underline font-inclusive inline-flex items-center gap-1"
                  >
                    {message.actionText}
                    <IconArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button variant="outline" size="sm">
          Voir tous les messages
        </Button>
        <Button variant="green" size="sm">
          Envoyer un document
        </Button>
      </div>
    </div>
  );
}
