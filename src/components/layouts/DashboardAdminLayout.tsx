"use client";

import Sidebar from "@/components/Sidebar";
import { SIDEBAR_ADMIN } from "@/constants";
import { Navbar, NavbarMenuToggle } from "@heroui/react";
import React, { ReactNode, useState } from "react";

interface PropTypes {
  children: ReactNode;
  description?: string;
  title?: string;
}

const DashboardAdminLayout = (props: PropTypes) => {
  const { children, title, description } = props;
  const [open, setOpen] = useState(false);
  return (
    <div className="max-w-screen-3xl 3xl:container flex">
      <Sidebar sidebarItems={SIDEBAR_ADMIN} isOpen={open} />
      <main className="flex-1 overflow-y-auto p-8">
        <Navbar
          className="flex justify-between bg-transparent px-0"
          isBlurred={false}
          classNames={{ wrapper: "p-0" }}
          position="static"
        >
          <h1 className="text-3xl font-bold">{title}</h1>
          <NavbarMenuToggle
            aria-label={open ? "Close Menu" : "Open Menu"}
            className="cursor-pointer lg:hidden"
            onClick={() => setOpen(!open)}
          />
        </Navbar>
        <p className="text-small mb-4">{description}</p>
        {children}
      </main>
    </div>
  );
};

export default DashboardAdminLayout;
