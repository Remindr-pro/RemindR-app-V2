"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  IconLayoutSidebarLeftCollapseFilled,
  IconLayoutSidebarRightCollapseFilled,
} from "@tabler/icons-react";
import { useAuth } from "@/lib/auth-provider";

import IconLayout from "@/app/components/atoms/icons/Layout";
import IconCalendar from "@/app/components/atoms/icons/Calendar2";
import IconHouse from "@/app/components/atoms/icons/House";
import IconHeart from "@/app/components/atoms/icons/Heart";
import IconContract from "@/app/components/atoms/icons/Contract";
import IconNotification from "@/app/components/atoms/icons/Notification";
import IconGear from "@/app/components/atoms/icons/Gear";
import IconHelp from "@/app/components/atoms/icons/Help";
import IconPerson from "@/app/components/atoms/icons/Person";
import AccountMenu from "@/app/components/atoms/AccountMenu";
import UserProfile from "@/app/components/molecules/UserProfile";

// Types
type IconComponent = (props: {
  size?: number;
  fill?: string;
}) => React.ReactElement;

interface NavItem {
  label: string;
  href: string;
  Icon: IconComponent;
}

interface SideBarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

// Constants
const DESKTOP_BREAKPOINT = 1024;
const LOGO_SIZE_OPEN = 61;
const LOGO_SIZE_COLLAPSED = 40;
const ICON_SIZE_OPEN = 18;
const ICON_SIZE_COLLAPSED = 20;

const MAIN_NAV_ITEMS: NavItem[] = [
  {
    label: "Tableau de bord",
    href: "/dashboard",
    Icon: IconLayout,
  },
  {
    label: "Calendrier",
    href: "/dashboard/calendrier",
    Icon: IconCalendar,
  },
  {
    label: "Mes proches & moi",
    href: "/dashboard/membres",
    Icon: IconHouse,
  },
  {
    label: "Mon magazine",
    href: "/dashboard/mon-magazine",
    Icon: IconHeart,
  },
];

const ACCOUNT_NAV_ITEMS: NavItem[] = [
  {
    label: "Mon compte",
    href: "/dashboard/mon-compte",
    Icon: IconPerson,
  },
  {
    label: "Mon contrat",
    href: "/dashboard/mon-compte/contrat",
    Icon: IconContract,
  },
  {
    label: "Notifications",
    href: "/dashboard/mon-compte/notifications",
    Icon: IconNotification,
  },
  {
    label: "Paramètres",
    href: "/dashboard/mon-compte/parametres",
    Icon: IconGear,
  },
  {
    label: "Nous contacter",
    href: "/dashboard/mon-compte/contact",
    Icon: IconHelp,
  },
];

// Utility functions
const isPathActive = (pathname: string, href: string): boolean => {
  if (href === "/dashboard") {
    return (
      pathname === "/dashboard" ||
      pathname === "/dashboard/" ||
      /^\/dashboard\/membres\/[^/]+\/?$/.test(pathname)
    );
  }

  if (href === "/dashboard/membres") {
    return pathname === "/dashboard/membres" || pathname === "/dashboard/membres/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

const getIconFill = (isActive: boolean): string => {
  return isActive
    ? "fill-greenMain"
    : "fill-[#B4B4B4] group-hover:fill-greenMain";
};

const getNavLinkClasses = (isOpen: boolean, isActive: boolean): string => {
  const baseClasses =
    "group relative flex items-center rounded-sm text-sm transition-all duration-150 ease-in whitespace-nowrap";
  const openClasses = isOpen
    ? "gap-3 pl-4 pr-5 py-3"
    : "justify-center px-2 py-3 w-full";
  const activeClasses = isActive
    ? "bg-gray-1 text-greenMain"
    : "text-[#7E7E7E] hover:bg-gray-1";

  return `${baseClasses} ${openClasses} ${activeClasses}`;
};

// Components
interface NavItemLinkProps {
  item: NavItem;
  isOpen: boolean;
  isActive: boolean;
}

const NavItemLink = ({ item, isOpen, isActive }: NavItemLinkProps) => {
  const { Icon, href, label } = item;

  return (
    <Link
      href={href}
      className={getNavLinkClasses(isOpen, isActive)}
      title={isOpen ? undefined : label}
    >
      {isOpen && (
        <span
          className={`absolute left-0 top-1/2 h-full w-[5px] -translate-y-1/2 rounded-l-full ${
            isActive ? "bg-greenMain" : "bg-transparent"
          }`}
        />
      )}
      <span className="shrink-0 flex items-center justify-center">
        <Icon
          size={isOpen ? ICON_SIZE_OPEN : ICON_SIZE_COLLAPSED}
          fill={getIconFill(isActive)}
        />
      </span>
      {isOpen && <span className="font-inclusive">{label}</span>}
    </Link>
  );
};

interface CollapsedNavItemLinkProps {
  item: NavItem;
  isActive: boolean;
}

const CollapsedNavItemLink = ({
  item,
  isActive,
}: CollapsedNavItemLinkProps) => {
  const { Icon, href, label } = item;

  return (
    <Link
      href={href}
      className={`group relative flex items-center justify-center rounded-sm py-3 text-sm transition-all duration-150 ease-in whitespace-nowrap px-2 ${
        isActive ? "bg-gray-1 text-greenMain" : "text-[#7E7E7E] hover:bg-gray-1"
      }`}
      title={label}
    >
      <span className="shrink-0">
        <Icon size={ICON_SIZE_OPEN} fill={getIconFill(isActive)} />
      </span>
    </Link>
  );
};

interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton = ({ onClose }: CloseButtonProps) => (
  <button
    onClick={onClose}
    className="lg:hidden absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-1 transition-colors"
    aria-label="Fermer la sidebar"
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-dark"
    >
      <path
        d="M12 4L4 12M4 4L12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

interface ToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ToggleButton = ({ isOpen, onToggle }: ToggleButtonProps) => (
  <button
    onClick={onToggle}
    className="hidden lg:flex absolute -right-7 top-20 bg-light p-3 rounded-full hover:bg-gray-1 transition-colors duration-150 cursor-pointer shadow-md z-10 items-center justify-center"
    aria-label={isOpen ? "Réduire le menu" : "Développer le menu"}
  >
    {isOpen ? (
      <IconLayoutSidebarLeftCollapseFilled className="fill-greenMain w-8 h-8" />
    ) : (
      <IconLayoutSidebarRightCollapseFilled className="fill-greenMain w-8 h-8" />
    )}
  </button>
);

interface SidebarLogoProps {
  isOpen: boolean;
}

const SidebarLogo = ({ isOpen }: SidebarLogoProps) => {
  const logoSize = isOpen ? LOGO_SIZE_OPEN : LOGO_SIZE_COLLAPSED;
  const logoClass = "transition-opacity duration-300";

  return (
    <div className="flex items-center justify-center h-[96px]">
      <Image
        src="/images/logos/logo-dashboard.svg"
        alt="Logo Remindr"
        width={logoSize}
        height={logoSize}
        className={logoClass}
      />
    </div>
  );
};

interface OverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

const Overlay = ({ isVisible, onClose }: OverlayProps) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
      onClick={onClose}
      aria-hidden="true"
    />
  );
};

// Main Component
const SideBar = ({ isOpen: externalIsOpen, onToggle }: SideBarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Determine if sidebar is open (external state takes precedence)
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  // Handle toggle
  const handleToggle = useCallback(() => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen((prev) => !prev);
    }
  }, [onToggle]);

  // Initialize sidebar state based on screen size
  useEffect(() => {
    if (externalIsOpen !== undefined) return;

    const checkScreenSize = () => {
      const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;

      setInternalIsOpen(isDesktop);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [externalIsOpen]);

  const accountItemsCollapsed = useMemo(() => ACCOUNT_NAV_ITEMS.slice(1), []);

  // Handler pour le logout
  const handleLogout = useCallback(async () => {
    try {
      await logout();

      router.push("/connexion?logout=true");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);

      router.push("/connexion?logout=true");
    }
  }, [logout, router]);

  // Préparer les données utilisateur pour UserProfile
  const userName = user ? `${user.firstName} ${user.lastName}` : "";
  const accountType =
    user?.userType === "family"
      ? "Compte famille"
      : user?.userType === "individual"
        ? "Compte individuel"
        : "";

  const sidebarClasses = useMemo(() => {
    const baseClasses =
      "sticky top-0 h-screen max-h-screen flex-col justify-between bg-light text-dark font-syne border-r border-gray-2 z-50 transition-all duration-300 ease-in-out flex lg:shadow-none shadow-xl lg:rounded-none rounded-r-2xl self-start";
    const widthClasses = isOpen
      ? "translate-x-0 w-[220px] lg:w-[220px]"
      : "-translate-x-full lg:translate-x-0 lg:w-[80px]";

    return `${baseClasses} ${widthClasses}`;
  }, [isOpen]);

  return (
    <>
      <Overlay isVisible={isOpen} onClose={handleToggle} />

      <aside className={sidebarClasses}>
        <ToggleButton isOpen={isOpen} onToggle={handleToggle} />
        {isOpen && <CloseButton onClose={handleToggle} />}

        <SidebarLogo isOpen={isOpen} />

        <div className="flex flex-1 flex-col justify-between py-6">
          <nav className={isOpen ? "px-4" : "px-2"}>
            {/* Main Navigation */}
            <ul className="space-y-1">
              {MAIN_NAV_ITEMS.map((item) => {
                const isActive = isPathActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <NavItemLink
                      item={item}
                      isOpen={isOpen}
                      isActive={isActive}
                    />
                  </li>
                );
              })}
            </ul>

            <div className="h-px bg-gray-2" />

            {/* Account Navigation */}
            {isOpen ? (
              <AccountMenu
                items={ACCOUNT_NAV_ITEMS}
                pathname={pathname}
                isCollapsed={false}
              />
            ) : (
              <ul className="mt-3 space-y-1">
                {accountItemsCollapsed.map((item) => {
                  const isActive = isPathActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <CollapsedNavItemLink item={item} isActive={isActive} />
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>

          {/* Advertisement Banner */}
          {isOpen && (
            <div className="mt-8 px-4">
              <div className="relative h-[190px] overflow-hidden">
                <Image
                  src="/images/illustrations/pub-mutuelle.png"
                  alt="Publicité mutuelle plus humaine"
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
            </div>
          )}

          {/* User Profile */}
          <UserProfile
            name={userName}
            accountType={accountType}
            isCollapsed={!isOpen}
            onLogout={handleLogout}
          />
        </div>
      </aside>
    </>
  );
};

export default SideBar;
