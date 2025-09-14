"use client";

import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { JSX } from "react";
import { CiLogout } from "react-icons/ci";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const Sidebar = (props: PropTypes) => {
  const { sidebarItems, isOpen } = props;
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "border-default-200 fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 bg-white px-4 py-4 transition-all lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen },
      )}
    >
      <div>
        <div className="mb-6 flex justify-center">
          <Image
            alt="logo"
            className="w-35 cursor-pointer"
            height={60}
            width={120}
            onClick={() => router.push("/")}
            src="/images/general/logos.png"
          />
        </div>

        <Listbox
          items={sidebarItems}
          variant="solid"
          aria-label="Dashboard-Admin"
          className="gap-1"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn("my-1 h-11 text-base", {
                "bg-emerald-600 text-white": pathname.startsWith(item.href),
              })}
              startContent={item.icon}
              textValue={item.label}
              aria-labelledby={item.label}
              aria-describedby={item.label}
            >
              <p className="text-small">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox>
      </div>
      <div className="flex items-center">
        <Button
          className="mb-4 flex justify-start rounded-lg px-3 py-2 font-semibold text-emerald-600"
          fullWidth
          onClick={() => signOut()}
          size="lg"
          variant="light"
        >
          <CiLogout />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
