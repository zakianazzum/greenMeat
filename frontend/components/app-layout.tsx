"use client";

import type React from "react";

import { usePathname } from "next/navigation";
import { MainSidebar } from "@/components/main-sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  // Define routes where sidebar should not be shown
  const publicRoutes = ["/", "/login", "/signup"];
  const shouldShowSidebar = !publicRoutes.includes(pathname);

  if (!shouldShowSidebar) {
    // For public routes, render only the content without sidebar
    return (
      <main
        className={`flex-1 overflow-auto ${
          pathname === "/login" || pathname === "/register" || pathname === "/"
            ? "w-[100vw]"
            : "w-[87vw]"
        }`}
      >
        {children}
      </main>
    );
  }

  // For authenticated/app routes, render with sidebar
  return (
    <div className="flex h-screen bg-green-50">
      <MainSidebar />
      <main
        className={`flex-1 overflow-auto ${
          pathname === "/login" || pathname === "/register" || pathname === "/"
            ? "w-[100vw]"
            : "w-[87vw]"
        }`}
      >
        {children}
      </main>
    </div>
  );
}

export default AppLayout;
