"use client";

import { useRef, useState } from "react";
import Textarea from "@/app/components/atoms/Textarea";
import Button from "@/app/components/atoms/Button";
import IconX from "@/app/components/atoms/icons/X";
import IconArrowRight from "@/app/components/atoms/icons/ArrowRight";
import IconArrowUpRight from "@/app/components/atoms/icons/ArrowUpRight";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatProps {
  onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
  "Qu’est-ce que Remindr et à qui s’adresse la plateforme ?",
  "Comment Remindr aide-t-il les mutuelles dans la prévention santé ?",
  "Comment créer mon tableau de bord santé avec Remindr ?",
] as const;

const DEFAULT_PLACEHOLDER = "Posez votre question ici...";

const Chat = ({ onClose }: ChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [placeholder, setPlaceholder] = useState(DEFAULT_PLACEHOLDER);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendQuestion = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setPlaceholder(DEFAULT_PLACEHOLDER);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text.trim() }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMsg =
          json?.error ?? "Le service de chat est temporairement indisponible.";
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: errorMsg,
          },
        ]);
        return;
      }

      const answer = json?.answer ?? "Aucune réponse reçue.";
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: answer,
        },
      ]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleSend = () => sendQuestion(input);
  const handleSuggestedClick = (question: string) => sendQuestion(question);

  return (
    <div className="z-9999 animate-fade-in ease-out duration-300 fixed bottom-25 mobileLandscape:bottom-28 right-2 mobileLandscape:w-[95vw] md:w-[450px] bg-light rounded-xl p-4 sm:p-6 md:pt-4 md:mb-0 mobileLandscape:p-2 flex flex-col shadow-lg border border-gray-2 min-h-2/3">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-2">
        <h2 className="font-inclusive font-bold text-lg text-dark">
          Discussion
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-2 text-dark transition-colors cursor-pointer"
          aria-label="Fermer le chat"
        >
          <IconX size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-auto flex flex-col gap-3 min-h-[200px] max-h-[320px] pr-1">
        {messages.length === 0 && (
          <>
            <p className="text-dark font-inclusive text-sm">
              <span className="font-bold text-greenMain">Bonjour 👋</span>
              <br />
              Comment puis-je vous aider aujourd’hui ?
            </p>
            <ul className="flex flex-col border-t border-gray-2">
              {SUGGESTED_QUESTIONS.map((question) => (
                <li
                  key={question}
                  className="border-b border-gray-2 last:border-b-0"
                >
                  <button
                    type="button"
                    className="w-full text-left font-inclusive text-sm py-3 px-1 flex items-center gap-2 text-gray-5 group hover:bg-gray-2 hover:text-greenMain transition-colors cursor-pointer"
                    onMouseEnter={() => setPlaceholder(question)}
                    onMouseLeave={() => setPlaceholder(DEFAULT_PLACEHOLDER)}
                    onClick={() => handleSuggestedClick(question)}
                  >
                    <IconArrowUpRight
                      size={24}
                      className="shrink-0 text-gray-5 group-hover:text-greenMain transition-colors"
                    />
                    <span>{question}</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-4 py-2.5 font-inclusive text-sm ${
                msg.role === "user"
                  ? "bg-greenMain text-light"
                  : "bg-gray-2 text-dark"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-2 text-dark rounded-xl px-4 py-2.5 text-sm font-inclusive">
              <span className="animate-pulse">Réflexion…</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-gray-2">
        <p className="text-gray-5 font-inclusive text-xs">
          L’IA peut générer des informations inexactes.
        </p>
        <Textarea
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 min-w-0 min-h-0 [&_textarea]:min-h-[44px] [&_textarea]:resize-none"
        />
        <Button
          type="button"
          variant="green"
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="shrink-0 min-h-[44px] px-4 self-end"
          icon={<IconArrowRight size={18} className="text-light" />}
        >
          <span className="sr-only md:not-sr-only md:inline">Envoyer</span>
        </Button>
      </div>
    </div>
  );
};

export default Chat;
