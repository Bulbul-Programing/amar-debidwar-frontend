"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes";
import { Toggle } from "./ui/toggle";

export default function ThemeToggle() {
    const { theme, setTheme, systemTheme } = useTheme();

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (!currentTheme) return null;

    return (
        <div className="border rounded-full">
            <Toggle
                variant="outline"
                className="group bg-white size-8 cursor-pointer rounded-full border-none shadow-none "
                pressed={currentTheme === "dark"}
                onPressedChange={() =>
                    setTheme(currentTheme === "dark" ? "light" : "dark")
                }
                aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
            >
                <MoonIcon
                    size={16}
                    className={`shrink-0 transition-all ${currentTheme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0 bg-white"
                        }`}
                    aria-hidden="true"
                />
                <SunIcon
                    size={16}
                    className={`absolute shrink-0 transition-all ${currentTheme === "dark" ? "scale-0 opacity-0" : "scale-100 bg-white opacity-100"
                        }`}
                    aria-hidden="true"
                />
            </Toggle>
        </div>
    );
}

