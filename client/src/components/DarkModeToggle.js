import React, {useContext} from "react";
import { ThemeContext } from "../context/ThemeContext"

function DarkModeToggle({employee}) {
  
  const { darkMode, setDarkMode } = useContext(ThemeContext)

  function handleClick(){
    const body = JSON.stringify({
      dark_mode: !darkMode
    })
    fetch(`/employee/${employee.id}`, {
      method: "PATCH",
      headers: {"content-type": "application/json", "accepts":"application/json"},
      body: body
    }).then(r=>{
      if (r.ok) {
        setDarkMode(!darkMode)
      } else {
        console.log('error')
      }
    })
  }

  return (
    <>
      <button
      className="nav-item"
      onClick={handleClick}>
        {darkMode ? '☽︎' : '☀'}
      </button>
    </>
  );
}

export default DarkModeToggle
