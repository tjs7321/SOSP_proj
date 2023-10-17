import { useEffect, useState, useContext } from "react"
import Chart from "../components/Chart";
import { ThemeContext } from "../context/ThemeContext"
import '../styles/Charts.css'

export default function SiteChartPage({employee}){

    const [siteForms, setSiteForms] = useState([])
    const [sortValue, setSortValue] = useState('Maintenance')
    const { darkMode, toggleDarkMode } = useContext(ThemeContext)

    useEffect(() => {
        fetch("/site_forms")
            .then((r) => r.json())
            .then(setSiteForms)
    }, [])

    function handleSortChange(e) {
		setSortValue(e.target.value)
	}

    if (!siteForms){
        return <h1>Loading...</h1>
    }

    const filteredForms = siteForms
        .filter((form) => form.department === sortValue)

    if (!filteredForms){
        return <h1>Loading...</h1>
    }
    
    return(
        <div className={`charts ${darkMode ? 'dark-mode' : ''}`}>
            <select onChange={handleSortChange}>
                <option>Maintenance</option>
                <option>Operations</option>
                <option>Chemistry</option>
                <option>Radiation Protection</option>
                <option>Supply Chain</option>
                <option>Site Services</option>
                <option>Engineering</option>
            </select>
            <h1>{sortValue}</h1>
            <div>
                <Chart
                forms={filteredForms}
                employee={employee}
                />
            </div>
        </div>
    )
}