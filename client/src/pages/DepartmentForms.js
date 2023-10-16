import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import moment from 'moment-timezone'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Form from "../components/Form";

export default function DepartmentForms({employee}){

    const [departmentForms, setDepartmentForms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
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
        <Wrapper>
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