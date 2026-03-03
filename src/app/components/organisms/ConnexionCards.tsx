"use client";

import { useState } from "react";
import LoginForm from "@/app/components/molecules/LoginForm";
import ActivationInfo from "@/app/components/molecules/ActivationInfo";

export default function ConnexionCards() {
  const [showActivation, setShowActivation] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Desktop: affichage côte à côte */}
      <div className="hidden md:flex flex-row items-center justify-center gap-8 md:gap-12">
        <LoginForm onSwitchToActivation={() => {}} />
        <ActivationInfo onSwitchToLogin={() => {}} />
      </div>

      {/* Mobile: affichage avec swipe */}
      <div className="md:hidden relative overflow-hidden w-full">
        <div
          className="flex transition-transform duration-300 ease-in-out w-[200%]"
          style={{
            transform: `translateX(${showActivation ? "-50%" : "0%"})`,
          }}
        >
          <div className="w-1/2 shrink-0 flex justify-center px-4">
            <LoginForm onSwitchToActivation={() => setShowActivation(true)} />
          </div>
          <div className="w-1/2 shrink-0 flex justify-center px-4">
            <ActivationInfo onSwitchToLogin={() => setShowActivation(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}
