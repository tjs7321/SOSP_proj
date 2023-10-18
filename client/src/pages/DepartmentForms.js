import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom";
import Form from "../components/Form";
import { ThemeContext } from "../context/ThemeContext"
import '../styles/FormLists.css'

export default function DepartmentForms({employee}){

    const [departmentForms, setDepartmentForms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const { darkMode, toggleDarkMode } = useContext(ThemeContext)
    const formsPerPage = 10

    useEffect(() => {
        fetch("/department_forms")
            .then((r) => r.json())
            .then(setDepartmentForms)
    }, [])

    if (!departmentForms){
        return <h1>Loading...</h1>
    }

    const displayedForms = departmentForms
        .slice((currentPage - 1) * formsPerPage, currentPage * formsPerPage)
    
    const totalPages = Math.ceil(departmentForms.length / formsPerPage)

    function handleNextPage(){
        setCurrentPage(currentPage + 1)
    }
    
    function handlePrevPage(){
        setCurrentPage(currentPage - 1)
    }

    return (
        <div className={`forms ${darkMode ? 'dark-mode' : ''}`}>
            <h1>{employee.department} Department Submissions</h1>
            {departmentForms.length > 0 ? (
                displayedForms.map((form) => (
                <Form
                key={form.id}
                {...form}
                >
                </Form>
                ))
            ) : (
                <>
                <h2>403: Access Denied</h2>
                <button as={Link} to="/">
                    Go Back Home
                </button>
                </>
            )}
            <div id="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
                </button>
                <p>
                Page {currentPage} of {totalPages}
                </p>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
                </button>
            </div>
        </div>
    )
}