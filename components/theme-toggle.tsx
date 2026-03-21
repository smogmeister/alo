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
        <TabsList className="h-10 md:h-7">
          <TabsTrigger value="light" className="px-3 md:px-2 text-xs data-[state=active]:shadow-sm h-8 md:h-auto">
            <Sun className="h-4 w-4 md:h-3 md:w-3 text-foreground" />
          </TabsTrigger>
          <TabsTrigger value="dark" className="px-3 md:px-2 text-xs data-[state=active]:shadow-sm h-8 md:h-auto">
            <Moon className="h-4 w-4 md:h-3 md:w-3 text-foreground" />
          </TabsTrigger>
          <TabsTrigger value="system" className="px-3 md:px-2 text-xs data-[state=active]:shadow-sm h-8 md:h-auto">
            <Monitor className="h-4 w-4 md:h-3 md:w-3 text-foreground" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
  }

  return (
    <Tabs value={theme || "system"} onValueChange={setTheme} className="w-auto">
      <TabsList className="h-10 md:h-7">
        <TabsTrigger value="light" className="px-3 md:px-2 text-xs data-[state=active]:shadow-sm h-8 md:h-auto">
          <Sun className="h-4 w-4 md:h-3 md:w-3 text-foreground" />
        </TabsTrigger>
        <TabsTrigger value="dark" className="px-3 md:px-2 text-xs data-[state=active]:shadow-sm h-8 md:h-auto">
          <Moon className="h-4 w-4 md:h-3 md:w-3 text-foreground" />
        </TabsTrigger>
        <TabsTrigger value="system" className="px-3 md:px-2 text-xs data-[state=active]:shadow-sm h-8 md:h-auto">
          <Monitor className="h-4 w-4 md:h-3 md:w-3 text-foreground" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
