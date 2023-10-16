import React, { createContext, useState } from "react"

const ThemeContext = createContext()

function ThemeProvider({ children }) {

    const [darkMode, setDarkMode] = useState(false)

    function toggleDarkMode(){
        setDarkMode(prevDarkMode => !prevDarkMode)
    }

    return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
    {children}
    </ThemeContext.Provider>
    );
}

export { ThemeContext, ThemeProvider }