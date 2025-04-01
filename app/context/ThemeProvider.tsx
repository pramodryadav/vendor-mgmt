"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
    isDark: false,
    toggleTheme: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") === "dark";
        setIsDark(savedTheme);
    }, []);

    const toggleTheme = () => {
        setIsDark((prev) => {
            const newTheme = !prev;
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            <div className={`${isDark ? 'dark' : ''}`} >
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
