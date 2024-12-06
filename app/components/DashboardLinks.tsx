"use client";
import { cn } from "@/lib/utils";
import { HomeIcon, ViewIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const dashboardLinks = [
  {
    id: 1,
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 2,
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: ViewIcon,
  },
];

const DashboardLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {dashboardLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={cn(
            pathname === link.href
              ? "bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-gray-100"
              : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100",
            "group flex items-center rounded-md px-2 py-2 mt-2 text-sm font-medium transition duration-200"
          )}
        >
          <link.icon
            className={cn(
              pathname === link.href
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-600 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-100",
              "flex-shrink-0 w-4 h-4 transition duration-200"
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              pathname === link.href
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100",
              "ml-3 transition duration-200"
            )}
          >
            {link.name}
          </span>
        </Link>
      ))}
    </>
  );
};

export default DashboardLinks;
