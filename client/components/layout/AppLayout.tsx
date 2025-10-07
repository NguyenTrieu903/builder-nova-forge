import { ReactNode, useCallback, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Activity, Cpu, Gauge, Power, Wifi } from "lucide-react";

export default function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false,
  );

  const onToggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    setIsDark(next);
  }, []);

  const navItems = useMemo(
    () => [
      { to: "/", label: "Dashboard", icon: Gauge },
      { to: "/devices", label: "Devices", icon: Cpu },
    ],
    [],
  );

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="size-6 rounded-md bg-gradient-to-br from-primary to-cyan-500" />
            <div className="font-semibold tracking-tight">Pulse IoT</div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = location.pathname === item.to;
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                      <Link to={item.to} className="flex items-center gap-2">
                        <Icon className="shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <div className="flex items-center justify-between gap-2 rounded-md bg-sidebar-accent px-2 py-1.5">
            <div className="flex items-center gap-2 text-sm">
              <Wifi className="size-4" />
              <span className="opacity-80">Network</span>
              <span className="ml-1 rounded bg-emerald-500/15 px-1.5 py-0.5 text-xs text-emerald-600 dark:text-emerald-300">OK</span>
            </div>
            <Power className="size-4 opacity-70" />
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur">
          <SidebarTrigger />
          <div className="flex-1" />
          <div className="hidden md:flex items-center gap-2">
            <div className="hidden md:block">
              <Input placeholder="Search devices, alerts…" className="h-9 w-[260px]" />
            </div>
            <Button variant="outline" size="sm" onClick={onToggleTheme}>
              {isDark ? "Light" : "Dark"}
            </Button>
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary/10 text-primary">PT</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="px-4 pb-6 pt-4 md:px-6">
          {children}
        </main>
        <footer className="mt-auto border-t px-6 py-3 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Activity className="size-3" /> Real-time telemetry active
            </span>
            <span>© {new Date().getFullYear()} Pulse IoT</span>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
