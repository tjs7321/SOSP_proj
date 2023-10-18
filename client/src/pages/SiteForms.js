import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import Form from "../components/Form"
import { ThemeContext } from "../context/ThemeContext"
import '../styles/FormLists.css'

export default function SiteForms(){

    const [siteForms, setSiteForms] = useState(null)
    const [sortValue, setSortValue] = useState('Maintenance')
    const [currentPage, setCurrentPage] = useState(1)
    const { darkMode, toggleDarkMode } = useContext(ThemeContext)
    const formsPerPage = 10

    useEffect(() => {
        fetch("/site_forms")
            .then((r) => r.json())
            .then(setSiteForms)
    }, [])

    function handleSortChange(e) {
		setSortValue(e.target.value)
        setCurrentPage(1)
	}

    
    if (!siteForms){
        return <h1>Loading...</h1>
    }
    
    const filteredForms = siteForms
        .filter((form) => form.department === sortValue)
    
    const displayedForms = filteredForms
        .slice((currentPage - 1) * formsPerPage, currentPage * formsPerPage)
    
    const totalPages = Math.ceil(filteredForms.length / formsPerPage)

    function handleNextPage(){
        setCurrentPage(currentPage + 1)
    }
    
    function handlePrevPage(){
        setCurrentPage(currentPage - 1)
    }

    return (
        <div className={`forms ${darkMode ? 'dark-mode' : ''}`}>
            {/* <div> */}
                <select onChange={handleSortChange}>
                    <option>Maintenance</option>
                    <option>Operations</option>
                    <option>Chemistry</option>
                    <option>Radiation Protection</option>
                    <option>Supply Chain</option>
                    <option>Site Services</option>
                    <option>Engineering</option>
                </select>
            {/* </div> */}
            <h1>{filteredForms[0].department} Forms</h1>
            {filteredForms.length > 0 ? (
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