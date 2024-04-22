"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  MdDashboard,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import React, { ReactNode, useCallback, useState } from "react";
import { FaBook, FaBookmark, FaCode } from "react-icons/fa";
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import LogoChar from "@/public/images/apple-touch-icon.png";
import { useTheme } from "@/context/ThemeProvider";
import { PiCrownFill } from "react-icons/pi";

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
  const { mode, setMode } = useTheme();
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

  const toggleTheme = useCallback(() => {
    setMode(mode === "light" ? "dark" : "light");
  }, [mode, setMode]);

  return (
    <aside className="fixed left-0 z-40 h-full m-2" aria-label="Sidebar">
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
          "h-[calc(100%-1rem)] p-2 overflow-y-auto bg-background dark:bg-gray-800 rounded-xl flex items-center justify-between flex-col"
        }
      >
        <div className="flex items-center flex-col">
          <Link href="/" className="my-4">
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
                icon={<FaBook />}
                isCollapsed={isCollapsed}
              />
            </li>
            <li>
              <SidebarItem
                href="/"
                className="pointer-events-none text-gray-500"
                label="Дашборд"
                icon={<MdDashboard />}
                isCollapsed={isCollapsed}
              />
            </li>
            <li>
              <SidebarItem
                href="/"
                className="pointer-events-none text-gray-500"
                label="Избранное"
                icon={<FaBookmark />}
                isCollapsed={isCollapsed}
              />
            </li>
            <li>
              <SidebarItem
                href="/"
                className="pointer-events-none text-gray-500"
                label="Упражнения"
                icon={<FaCode />}
                isCollapsed={isCollapsed}
              />
            </li>
            <li>
              <SidebarItem
                href="/"
                className="pointer-events-none text-gray-500"
                label="Подписка"
                icon={<PiCrownFill />}
                isCollapsed={isCollapsed}
              />
            </li>
          </ul>
        </div>
        <div onClick={toggleTheme} className="cursor-pointer text-2xl">
          {mode === "light" ? <p>🌚</p> : <p>🌞</p>}
        </div>
      </div>
    </aside>
  );
};
