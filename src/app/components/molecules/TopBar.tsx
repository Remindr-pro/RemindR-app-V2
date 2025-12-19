"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";

const TopBar = () => {
  const pathName = usePathname();

  const dynamicTitle = useMemo(() => {
    switch (pathName) {
      case "/dashboard":
        return "Tableau de bord";
      case "/calendrier":
        return "Calendrier";
      case "/mes-proches-et-moi":
        return "Mes proches & moi";
      case "/mon-magazine":
        return "Mon magazine";
      default:
        return "Remindr";
    }
  }, [pathName]);

  return (
    <div className="flex flex-col gap-4">
      <div className="px-6 xl:px-10 h-16 flex items-center justify-between border-b border-gray-2">
        <h1 className="text-2xl font-semibold">{dynamicTitle}</h1>
      </div>
    </div>
  );
};

export default TopBar;
