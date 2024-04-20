"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  MdDashboard,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import React, { ReactNode, useCallback, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { RiVipCrown2Fill } from "react-icons/ri";
import { IoBookSharp } from "react-icons/io5";
import { BiDumbbell } from "react-icons/bi";
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import LogoChar from "@/public/images/apple-touch-icon.png";

const SidebarItem = ({
  href,
  label,
  className,
  icon,
  isCollapsed,
}: {
  href: string;
  label: string;
  className?: string;
  icon: ReactNode;
  isCollapsed: boolean;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
        className,
      )}
    >
      {icon}
      {!isCollapsed && <span className="ms-2">{label}</span>}
    </Link>
  );
};

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(
    !!localStorage.getItem("isCollapsed") || false,
  );

  const onCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
    if (!isCollapsed) {
      localStorage.setItem("isCollapsed", (!isCollapsed).toString());
    } else {
      localStorage.removeItem("isCollapsed");
    }
  }, [isCollapsed]);

  return (
    <aside
      className="fixed left-0 z-40 max-w-fit h-full m-2"
      aria-label="Sidebar"
    >
      <div
        onClick={onCollapse}
        className="absolute right-2 top-1/2 cursor-pointer"
      >
        {isCollapsed ? (
          <MdOutlineKeyboardDoubleArrowRight />
        ) : (
          <MdOutlineKeyboardDoubleArrowLeft />
        )}
      </div>
      <div
        className={
          "h-[calc(100%-1rem)] px-3 overflow-y-auto bg-blue-300 dark:bg-gray-800 rounded-xl flex items-center flex-col p-4"
        }
      >
        <Link href="/" className="mb-4">
          {isCollapsed ? (
            <Image alt="Logo" src={LogoChar} height={34} />
          ) : (
            <Image alt="Logo" src={Logo} width={120} />
          )}
        </Link>
        <ul className="space-y-2 font-medium">
          <li>
            <SidebarItem
              href="/courses"
              label="Каталог"
              icon={<IoBookSharp size="24" />}
              isCollapsed={isCollapsed}
            />
          </li>
          <li>
            <SidebarItem
              href="/"
              className="pointer-events-none text-gray-500"
              label="Дашборд"
              icon={<MdDashboard size="24" />}
              isCollapsed={isCollapsed}
            />
          </li>
          <li>
            <SidebarItem
              href="/"
              className="pointer-events-none text-gray-500"
              label="Избранное"
              icon={<FaBookmark size="22" />}
              isCollapsed={isCollapsed}
            />
          </li>
          <li>
            <SidebarItem
              href="/"
              className="pointer-events-none text-gray-500"
              label="Упражнения"
              icon={<BiDumbbell size="24" viewBox="0 0 24 24" />}
              isCollapsed={isCollapsed}
            />
          </li>
          <li>
            <SidebarItem
              href="/"
              className="pointer-events-none text-gray-500"
              label="Подписка"
              icon={<RiVipCrown2Fill size="24" />}
              isCollapsed={isCollapsed}
            />
          </li>
        </ul>
      </div>
    </aside>
  );
};
