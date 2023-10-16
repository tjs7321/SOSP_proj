import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import Form from "../components/Form";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default function AllForms(){

    const [forms, setForms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
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
        <div>
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
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous Page
                </Button>
                <p>
                Page {currentPage} of {totalPages}
                </p>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next Page
                </Button>
            </Pagination>
        </div>
    )
}

const Wrapper = styled.section`
    max-width: 800px;
    margin: 40px auto;
`;

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