"use client"

import * as React from "react"
import Link from "next/link"
import {
  Home,
  Settings,
  FileText,
  Users,
  BarChart3,
  Package,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

const menuItems = [
  {
    title: "Home",
    icon: Home,
    url: "/",
  },
  {
    title: "Dashboard",
    icon: BarChart3,
    url: "/dashboard",
  },
  {
    title: "Projects",
    icon: Package,
    url: "/projects",
  },
  {
    title: "Documents",
    icon: FileText,
    url: "/documents",
  },
  {
    title: "Team",
    icon: Users,
    url: "/team",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-[60px]">
        <div className="flex items-center gap-2 px-2 py-1.5 h-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0">
          <SidebarTrigger className="-ml-1 group-data-[collapsible=icon]:ml-0" />
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:pointer-events-none">
            <span className="text-sm font-semibold truncate">Next.js App</span>
            <span className="text-xs text-muted-foreground truncate">v1.0.0</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-2 h-[72px]">
        <div className="px-2 h-full flex items-end">
          <div className="flex items-center rounded-md p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer w-full group-data-[collapsible=icon]:justify-center">
            <div className="flex items-center gap-2 w-full group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:justify-center">
              <Avatar className="h-8 w-8 shrink-0 overflow-hidden">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" className="object-cover" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0 flex-1 transition-[opacity,width,margin] duration-200 ease-in-out group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden group-data-[collapsible=icon]:pointer-events-none">
                <span className="text-sm font-medium truncate">John Doe</span>
                <span className="text-xs text-muted-foreground truncate">john.doe@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

