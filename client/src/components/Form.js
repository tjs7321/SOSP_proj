import moment from 'moment-timezone'
import { useContext } from 'react'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import '../styles/FormLists.css'
import { ThemeContext } from "../context/ThemeContext"

export default function Form({id, type, created_at}){

    const { darkMode, toggleDarkMode } = useContext(ThemeContext)
    
    function formatDate(isodate) {
        return moment(isodate).format('MM-DD-YY @ h:mm')
    }

    return(
        <NavLink
        className="navLink"
        to={`/forms/${id}`}
        >
            <div className={`formCard ${darkMode ? 'dark-mode' : ''}`}>
                <h3>{type} Form</h3>
            <h4>{formatDate(created_at)}</h4>
            </div>
        </NavLink>
    )
}