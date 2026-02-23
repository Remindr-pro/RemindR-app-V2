"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import ChatIcon from "../components/atoms/icons/Chat";
import Chat from "../components/molecules/Chat";
import ToggleRoundedButton from "../components/atoms/ToggleRoundedButton";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isChatActive, setChatActive] = useState(false);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>

      {isChatActive && (
        <button
          type="button"
          aria-label="Fermer le chat"
          className="fixed inset-0 z-9998 bg-dark/50  animate-fade-in"
          onClick={() => setChatActive(false)}
        />
      )}
      <div className="fixed bottom-6 right-3 md:bottom-8 md:right-4 z-9999">
        {isChatActive && (
          <Chat
            onClose={() => setChatActive(false)}
            variant={
              pathname?.includes("/professionnels")
                ? "professionnels"
                : "particuliers"
            }
          />
        )}
        <ToggleRoundedButton
          className="w-12 h-12 md:w-auto md:h-auto relative flex items-center justify-center border-2 border-light"
          onClick={(active) => setChatActive(active)}
          updateField={isChatActive}
          inactiveBackground="primary"
          activeBackground="steel"
          activeTooltipContent="Discussion"
          inactiveTooltipContent="Fermer la discussion"
          tooltipPosition="left"
        >
          <ChatIcon fill="fill-light" />
        </ToggleRoundedButton>
      </div>

      <Footer />
    </>
  );
}
