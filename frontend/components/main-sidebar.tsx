"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Users,
  Tractor,
  Warehouse,
  ClipboardCheck,
  Truck,
  Factory,
  Package,
  Beef,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-green-200">
      <SidebarHeader className="border-b border-green-200 p-4">
        <div className="flex items-center gap-2">
          <div className="bg-green-700 text-white p-1 rounded">
            <Beef size={24} />
          </div>
          <div className="font-bold text-xl text-green-800">CHOOSE A NAME (MASUD & ORPA)</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-700">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/dashboard">
                    <BarChart3 className="text-green-700" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/users"}>
                  <Link href="/users">
                    <Users className="text-green-700" />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-green-700">Production</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/farms"}>
                  <Link href="/farms">
                    <Tractor className="text-green-700" />
                    <span>Farms</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/items"}>
                  <Link href="/items">
                    <Beef className="text-green-700" />
                    <span>Items</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/batches"}>
                  <Link href="/batches">
                    <Package className="text-green-700" />
                    <span>Meat Batches</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-green-700">Quality & Logistics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/inspections"}>
                  <Link href="/inspections">
                    <ClipboardCheck className="text-green-700" />
                    <span>Inspections</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/processing"}>
                  <Link href="/processing">
                    <Factory className="text-green-700" />
                    <span>Processing</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/shipments"}>
                  <Link href="/shipments">
                    <Truck className="text-green-700" />
                    <span>Shipments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/warehouses"}>
                  <Link href="/warehouses">
                    <Warehouse className="text-green-700" />
                    <span>Warehouses</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-green-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-green-200 text-green-700">JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">John Doe</div>
              <div className="text-xs text-muted-foreground">Admin</div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-green-700">
            <LogOut size={18} />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
