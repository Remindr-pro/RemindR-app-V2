"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import IconPlus from "../atoms/icons/Plus";
import IconFilter from "../atoms/icons/Filter";
import IconBell from "../atoms/icons/Bell";
import Button from "../atoms/Button";
import SearchInput from "../atoms/SearchInput";
import { IconLayoutSidebarRightCollapseFilled } from "@tabler/icons-react";

interface TopBarProps {
  onMenuClick?: () => void;
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
  const pathName = usePathname();

  const dynamicTitle = useMemo(() => {
    switch (pathName) {
      case "/dashboard":
        return "Tableau de bord";
      case "/dashboard/calendrier":
        return "Calendrier";
      case "/dashboard/membres":
        return "Mes proches et moi";
      case "/dashboard/mon-magazine":
        return "Mon magazine prévention santé";
      default:
        return "Mon compte";
    }
  }, [pathName]);

  const isFamilyPage = pathName === "/dashboard/membres";
  const isCalendarPage = pathName === "/dashboard/calendrier";

  return (
    <div className="flex flex-col gap-4">
      <div className="px-6 xl:px-10 h-16 flex items-center justify-between border-b border-gray-2">
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile menu button - only shown when sidebar is collapsed */}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-1 transition-colors"
              aria-label="Ouvrir le menu"
            >
              <IconLayoutSidebarRightCollapseFilled className="fill-greenMain w-8 h-8" />
            </button>
          )}
          <h1 className="text-2xl font-semibold">{dynamicTitle}</h1>
          {(isFamilyPage || isCalendarPage) && (
            <div className="flex items-center gap-4">
              <Button
                variant="green"
                roundedFull
                size="sm"
                icon={<IconPlus size={16} />}
                className="px-4 py-2"
              >
                {isFamilyPage ? "Ajouter un proche" : "Ajouter"}
              </Button>

              {/* Notifications */}
              {isCalendarPage && (
                <button className="relative w-7 h-7 bg-greenMain rounded-full flex items-center justify-center hover:bg-greenMain-2 transition-colors">
                  <IconBell size={20} className="fill-light" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-1 rounded-full flex items-center justify-center text-light text-xs font-semibold">
                    3
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
        {(isFamilyPage || isCalendarPage) && (
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
