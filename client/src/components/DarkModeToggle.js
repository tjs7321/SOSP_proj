import React, {useContext} from "react";
import { ThemeContext } from "../context/ThemeContext"

function DarkModeToggle() {
  
  const { darkMode, toggleDarkMode } = useContext(ThemeContext)

  return (
    <>
      <button
      className="nav-item"
      onClick={() => toggleDarkMode()}>
        {darkMode ? '☽︎' : '☀'}
      </button>
    </>
  );
}

export default DarkModeToggle
