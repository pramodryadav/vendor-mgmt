"use client";

import { Moon, Sun } from "lucide-react";
import { Switch } from "@/app/components/ui/switch";
import { useTheme } from "@/app/context/ThemeProvider";


export default function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Switch checked={isDark} onCheckedChange={toggleTheme} />
      <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
    </div>
  );
}
