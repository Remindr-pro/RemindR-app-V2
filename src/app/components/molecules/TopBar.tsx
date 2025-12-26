"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";

const TopBar = () => {
  const pathName = usePathname();

  const dynamicTitle = useMemo(() => {
    switch (pathName) {
      case "/dashboard":
        return "Tableau de bord";
      case "/dashboard/calendrier":
        return "Calendrier";
      case "/dashboard/mes-proches-et-moi":
        return "Mes proches & moi";
      case "/dashboard/mon-magazine":
        return "Mon magazine prévention santé";
      default:
        return "Mon compte";
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
