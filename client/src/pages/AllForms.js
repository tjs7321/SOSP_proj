import { useEffect, useState, useContext } from "react"
import styled from "styled-components"
import Form from "../components/Form"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import '../styles/FormLists.css'
import { ThemeContext } from "../context/ThemeContext"

export default function AllForms(){

    const [forms, setForms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const { darkMode, toggleDarkMode } = useContext(ThemeContext)
    const formsPerPage = 10

    useEffect(() => {
        fetch("/forms")
            .then((r) => r.json())
            .then(setForms)
    }, [])

    if (!forms){
        return <h1>Loading...</h1>
    }
    
    const displayedForms = forms
        .slice((currentPage - 1) * formsPerPage, currentPage * formsPerPage)
    
    const totalPages = Math.ceil(forms.length / formsPerPage)

    function handleNextPage(){
        setCurrentPage(currentPage + 1)
    }
    
    function handlePrevPage(){
        setCurrentPage(currentPage - 1)
    }

    return (
        <div className={`forms ${darkMode ? 'dark-mode' : ''}`}>
            <h1>All Submissions</h1>
            {displayedForms.length > 0 ? (
                displayedForms.map((form) => (
                <Form
                key={form.id}
                {...form}
                >
                </Form>
                ))
            ) : (
                <>
                <h1>No Observations Found</h1>
                <NavLink to="/new" className="navLink">
                    <button>
                        Submit An Observation
                    </button>
                </NavLink>
                </>
            )}
            <Pagination>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
                </button>
                <p>
                Page {currentPage} of {totalPages}
                </p>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
                </button>
            </Pagination>
        </div>
    )
}

const Pagination = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    button {
        padding: 10px 20px;
        border: 1px solid #ccc;
        cursor: pointer;

        &:disabled {
        background-color: #f3f3f3;
        cursor: not-allowed;
        }
    }
`