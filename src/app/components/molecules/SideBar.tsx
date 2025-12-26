"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import IconLayout from "../atoms/icons/Layout";
import IconCalendar from "../atoms/icons/Calendar2";
import IconHouse from "../atoms/icons/House";
import IconHeart from "../atoms/icons/Heart";
import IconPerson from "../atoms/icons/Person";
import IconContract from "../atoms/icons/Contract";
import IconNotification from "../atoms/icons/Notification";
import IconGear from "../atoms/icons/Gear";
import IconHelp from "../atoms/icons/Help";
import AccountMenu from "../atoms/AccountMenu";

const SideBar = () => {
  const pathname = usePathname();

  const navItems = [
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
      href: "/dashboard/mes-proches-et-moi",
      Icon: IconHouse,
    },
    {
      label: "Mon magazine",
      href: "/dashboard/mon-magazine",
      Icon: IconHeart,
    },
  ];

  const navItemsAccount = [
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

  return (
    <aside className="hidden lg:flex h-full min-h-screen w-[220px] flex-col justify-between bg-light text-dark font-syne border-r border-gray-2">
      {/* Logo */}
      <div className="flex items-center justify-center h-[96px]">
        <Image
          src="/images/logos/logo-dashboard.svg"
          alt="Logo Remindr"
          width={61}
          height={61}
        />
      </div>

      {/* Navigation + bannière + profil */}
      <div className="flex flex-1 flex-col justify-between py-6">
        {/* Navigation */}
        <nav className="px-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const { Icon } = item;
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard" || pathname === "/dashboard/"
                  : pathname === item.href ||
                    pathname?.startsWith(`${item.href}/`);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group relative flex items-center gap-3 rounded-sm py-3 pl-4 pr-5 text-sm transition-all duration-150 ease-in whitespace-nowrap ${
                      isActive
                        ? "bg-gray-1 text-greenMain"
                        : "text-[#7E7E7E] hover:bg-gray-1"
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-1/2 h-full w-[5px] -translate-y-1/2 rounded-l-full ${
                        isActive ? "bg-greenMain" : "bg-transparent"
                      }`}
                    />
                    <span className="shrink-0">
                      <Icon
                        size={18}
                        fill={
                          isActive
                            ? "fill-greenMain"
                            : "fill-[#B4B4B4] group-hover:fill-greenMain"
                        }
                      />
                    </span>
                    <span className="font-inclusive">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="h-px bg-gray-2" />

          <AccountMenu items={navItemsAccount} pathname={pathname} />
        </nav>

        {/* Bannière pub */}
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

        {/* Profil utilisateur */}
        <div className="px-4 pb-6">
          <div className="flex items-center justify-between rounded-2xl bg-[#f7f7f9] px-3 py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-300" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Camille Dupont</span>
                <span className="text-xs text-gray-500 font-inclusive">
                  Compte famille
                </span>
              </div>
            </div>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 text-sm"
              aria-label="Paramètres du compte"
            >
              ⚙︎
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
