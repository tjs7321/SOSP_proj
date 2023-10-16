import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router"
import DarkModeToggle from "./DarkModeToggle"
import '../styles/NavBar.css'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { ThemeContext } from "../context/ThemeContext"

export default function NavBar({ employee, setEmployee }) {

  const history = useHistory()
  const { darkMode, toggleDarkMode } = useContext(ThemeContext)

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setEmployee(null)
        history.push("/")
      }
    });
  }

  if (employee === undefined){
    return (
      <nav
      className={`navbar ${darkMode ? 'dark-mode' : ''}`}
      ></nav>
    )
  }

  if (employee.type === 'manager') {
    return (
      <nav
      className={`navbar ${darkMode ? 'dark-mode' : ''}`}
      >
        <DarkModeToggle/>
        <NavLink to="/department_forms" className="navLink">
            <button
            as={Link} to="/department_forms"
            >
                Department Forms
            </button>
        </NavLink>
        <NavLink to="/department_chart_page" className="navLink">
            <button
            as={Link} to="/department_chart_page"
            >
                Department Charts
            </button>
        </NavLink>
        <NavLink className="navLink"
          to="/">
          <h1>Safety Submission Portal
          </h1>
        </NavLink>
        <NavLink to="/newForm" className="navLink">
          <button
          >
                New Submission
          </button>
        </NavLink>
        <button
        onClick={handleLogoutClick}>
          Logout
        </button>
      </nav>
    )}

  if (employee.type === 'employee') {
    return (
      <nav
      className={`navbar ${darkMode ? 'dark-mode' : ''}`}
      >
        <DarkModeToggle/>
        <NavLink className="navLink"
          to="/">
          <h1>Safety Submission Portal
          </h1>
        </NavLink>
        <NavLink to="/newForm" className="navLink">
          <button
          >
                New Submission
          </button>
        </NavLink>
        <button
        onClick={handleLogoutClick}>
          Logout
        </button>
      </nav>
    )}
  
  if (employee.type === 'admin') {
    return (
      <nav
      className={`navbar ${darkMode ? 'dark-mode' : ''}`}
      >
        <DarkModeToggle/>
        <NavLink to="/site_forms" className="navLink">
            <button
            as={Link} to="/site_forms"
            >
                Site Forms
            </button>
          </NavLink>
          <NavLink to="/site_chart_page" className="navLink">
            <button
            as={Link} to="/site_chart_page"
            >
                Site Charts
            </button>
          </NavLink>
        <NavLink className="navLink"
          to="/">
          <h1>Safety Submission Portal
          </h1>
        </NavLink>
        <NavLink to="/newForm" className="navLink">
          <button
          >
                New Submission
          </button>
        </NavLink>
        <button
        onClick={handleLogoutClick}>
          Logout
        </button>
      </nav>
    )}
}
