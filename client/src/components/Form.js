import moment from 'moment-timezone'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import '../styles/FormLists.css'

export default function Form({id, type, created_at}){

    
    function formatDate(isodate) {
        return moment(isodate).format('MM-DD-YY @ h:mm')
    }

    return(
        <NavLink
        className="navLink"
        to={`/forms/${id}`}
        >
            <div className="formCard">
                <h2>{type} Form</h2>
            <h3>{formatDate(created_at)}</h3>
            </div>
        </NavLink>
    )
}