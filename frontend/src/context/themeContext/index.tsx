import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface ThemeProviderType {
    children: ReactNode;
}

interface ThemeContextType {
    theme: "light" | "dark";
    toggleTheme: (theme: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("No Theme Context Found")
    return context;
}

const ThemeProvider: React.FC<ThemeProviderType> = ({children}) => {

    const [theme, setTheme] = useState<"light" | "dark">(() => {
        const themeStore = localStorage.getItem("theme");
        const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (!themeStore) {
            if (isDarkMode) {
                return "dark";
            } else {
                return "light";
            }
        } else if (themeStore == "light") {
            return "light";
        } else {
            return "dark"
        }
    })

    useEffect(() => {
        if(theme == "dark") return document.body.classList.add("dark");
        document.body.classList.remove("dark");
    }, [theme]);

    const toggleTheme = (theme: "light" | "dark") => {
        localStorage.setItem("theme", theme);
        setTheme(theme);
    };

    const value = {theme, toggleTheme};

  return (
    <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider