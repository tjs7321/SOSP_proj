import { useEffect, useState, useContext } from "react"
import Chart from "../components/Chart";
import { ThemeContext } from "../context/ThemeContext"
import '../styles/Charts.css'

export default function DepartmentChartPage({employee}){

    const [departmentForms, setDepartmentForms] = useState([])
    const { darkMode, toggleDarkMode } = useContext(ThemeContext)

    useEffect(() => {
        fetch("/department_forms")
            .then((r) => r.json())
            .then(setDepartmentForms)
    }, [])
    
    return(
        <div className={`charts ${darkMode ? 'dark-mode' : ''}`}>
            <h1>{employee.department} Department Charts</h1>
            <div>
                <Chart
                forms={departmentForms}
                employee={employee}
                />
            </div>
        </div>
    )
}