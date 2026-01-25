import { createContext, useEffect, useState } from "react"

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("retro")

    useEffect(() => {
        document.documentElement.dataset.theme = theme
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}