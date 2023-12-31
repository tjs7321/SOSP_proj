import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router"
import DarkModeToggle from "./DarkModeToggle"
import '../styles/NavBar.css'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { ThemeContext } from "../context/ThemeContext"

export default function NavBar({ employee, setEmployee }) {

  const history = useHistory()
  const { darkMode, setDarkMode } = useContext(ThemeContext)

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setEmployee(null)
        setDarkMode(false)
        history.push("/")
      }
    });
  }

  if (employee === undefined){
    return (
      null
    )
  }

  if (employee.type === 'manager') {
    return (
      <nav
      className={`navbar ${darkMode ? 'dark-mode' : ''}`}
      >
        <div>
          <DarkModeToggle
          employee={employee}
          />
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
        </div>
        <NavLink className="navLink"
          to="/">
          <h1>Safety Submission Portal
          </h1>
        </NavLink>
        <div>
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
        </div>
      </nav>
    )}

  if (employee.type === 'employee') {
    return (
      <nav
      className={`navbar ${darkMode ? 'dark-mode' : ''}`}
      >
        <DarkModeToggle
          employee={employee}
        />
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
        <div>
        <DarkModeToggle
          employee={employee}
        />
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
        </div>
        <NavLink className="navLink"
          to="/">
          <h1>Safety Submission Portal
          </h1>
        </NavLink>
        <div>
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
        </div>
      </nav>
    )}
}
