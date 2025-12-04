"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Tabs value="system" className="w-auto">
        <TabsList className="h-7">
          <TabsTrigger value="light" className="px-2 text-xs data-[state=active]:shadow-sm">
            <Sun className="h-3 w-3 text-primary" />
          </TabsTrigger>
          <TabsTrigger value="dark" className="px-2 text-xs data-[state=active]:shadow-sm">
            <Moon className="h-3 w-3 text-primary" />
          </TabsTrigger>
          <TabsTrigger value="system" className="px-2 text-xs data-[state=active]:shadow-sm">
            <Monitor className="h-3 w-3 text-primary" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
  }

  return (
    <Tabs value={theme || "system"} onValueChange={setTheme} className="w-auto">
      <TabsList className="h-7">
        <TabsTrigger value="light" className="px-2 text-xs data-[state=active]:shadow-sm">
          <Sun className="h-3 w-3 text-primary" />
        </TabsTrigger>
        <TabsTrigger value="dark" className="px-2 text-xs data-[state=active]:shadow-sm">
          <Moon className="h-3 w-3 text-primary" />
        </TabsTrigger>
        <TabsTrigger value="system" className="px-2 text-xs data-[state=active]:shadow-sm">
          <Monitor className="h-3 w-3 text-primary" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
