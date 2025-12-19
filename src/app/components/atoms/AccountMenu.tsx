"use client";

import React, { useState } from "react";
import Link from "next/link";

type IconComponent = (props: {
  size?: number;
  fill?: string;
}) => React.ReactElement;

export interface AccountMenuItem {
  label: string;
  href: string;
  Icon: IconComponent;
}

interface AccountMenuProps {
  items: AccountMenuItem[];
  pathname: string;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ items, pathname }) => {
  const safeItems = items ?? [];
  const [parent, ...children] = safeItems;

  const { Icon: ParentIcon } = parent || ({} as AccountMenuItem);

  const isChildActive = children.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );

  const isParentActive =
    parent != null &&
    (pathname === parent.href || pathname.startsWith(`${parent.href}/`));

  const [open, setOpen] = useState<boolean>(isParentActive || isChildActive);

  if (!parent) return null;

  return (
    <div className="mt-3">
      {/* Ligne principale "Mon compte" */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`group relative flex w-full items-center justify-between rounded-sm py-3 pl-4 pr-3 text-sm transition-all duration-150 ease-in cursor-pointer ${
          isParentActive || isChildActive
            ? "text-greenMain"
            : "text-[#7E7E7E] hover:bg-gray-1"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-light text-[15px]">
            <ParentIcon
              size={18}
              fill={
                isParentActive || isChildActive
                  ? "fill-greenMain"
                  : "fill-[#B4B4B4] group-hover:fill-greenMain"
              }
            />
          </span>
          <span className="font-inclusive">{parent.label}</span>
        </div>

        <span
          className={`ml-2 text-xs transition-transform duration-150 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {/* Sous-menu */}
      {open && (
        <ul className="mt-1 space-y-1 pl-4">
          {children.map((item) => {
            const { Icon } = item;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group relative flex items-center gap-3 rounded-r-full py-2 pl-4 pr-4 text-sm transition-all duration-150 ease-in ${
                    isActive
                      ? "bg-white text-greenMain shadow-sm"
                      : "text-[#B4B4B4] hover:text-[#7E7E7E] hover:bg-white"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-1/2 h-[70%] w-[3px] -translate-y-1/2 rounded-r-full ${
                      isActive ? "bg-greenMain" : "bg-transparent"
                    }`}
                  />
                  <Icon
                    size={16}
                    fill={
                      isActive
                        ? "fill-greenMain"
                        : "fill-[#d0d0d0] group-hover:fill-[#9b9b9b]"
                    }
                  />
                  <span className="font-inclusive text-[13px]">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AccountMenu;
