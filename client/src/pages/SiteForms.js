import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import moment from 'moment-timezone'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Form from "../components/Form";

export default function SiteForms(){

    const [siteForms, setSiteForms] = useState(null)
    const [sortValue, setSortValue] = useState('Maintenance')
    const [currentPage, setCurrentPage] = useState(1)
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
        <Wrapper>
            <select onChange={handleSortChange}>
                <option>Maintenance</option>
                <option>Operations</option>
                <option>Chemistry</option>
                <option>Radiation Protection</option>
                <option>Supply Chain</option>
                <option>Site Services</option>
                <option>Engineering</option>
            </select>
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
                <Button as={Link} to="/">
                    Go Back Home
                </Button>
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
        </Wrapper>
    )
}

const Wrapper = styled.section`
    max-width: 800px;
    margin: 40px auto;
`

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