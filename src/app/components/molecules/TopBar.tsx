"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import IconPlus from "../atoms/icons/Plus";
import IconFilter from "../atoms/icons/Filter";
import Button from "../atoms/Button";
import SearchInput from "../atoms/SearchInput";

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

  const isFamilyPage = pathName === "/dashboard/mes-proches-et-moi";

  return (
    <div className="flex flex-col gap-4">
      <div className="px-6 xl:px-10 h-16 flex items-center justify-between border-b border-gray-2">
        <div className="flex items-center gap-4 flex-1">
          <h1 className="text-2xl font-semibold">{dynamicTitle}</h1>
          {isFamilyPage && (
            <div className="flex items-center gap-4">
              <Button
                variant="green"
                roundedFull
                size="sm"
                icon={<IconPlus size={16} />}
                className="px-4 py-2"
              >
                Ajouter un proche
              </Button>
            </div>
          )}
        </div>
        {isFamilyPage && (
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              icon={<IconFilter size={20} />}
              className="px-4 py-2"
            >
              Filtres
            </Button>
            <SearchInput placeholder="Rechercher" size="sm" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
