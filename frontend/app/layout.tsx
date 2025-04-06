"use client";

import type React from "react";
import { Inter } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { MainSidebar } from "@/components/main-sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: " CHOOSE A NAME (MASUD & ORPA) - Product Management",
  description: "Farm-to-table meat product management system",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider
            open={
              window.location.pathname !== "/login" &&
              window.location.pathname !== "/register" &&
              window.location.pathname !== "/"
            }
          >
            <div className="flex h-screen bg-green-50">
              <MainSidebar />
              <main
                className={`flex-1 overflow-auto ${
                  window.location.pathname === "/login" ||
                  window.location.pathname === "/register" ||
                  window.location.pathname === "/"
                    ? "w-[100vw]"
                    : "w-[87vw]"
                }`}
              >
                {children}
              </main>
            </div>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
