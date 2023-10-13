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

    useEffect(() => {
        fetch("/department_forms")
            .then((r) => r.json())
            .then(setDepartmentForms)
    }, [])

    return (
        <Wrapper>
            <h1>{employee.department} Department Submissions</h1>
            {departmentForms.length > 0 ? (
                departmentForms.map((form) => (
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
        </Wrapper>
    )
}

const Wrapper = styled.section`
    max-width: 800px;
    margin: 40px auto;
`;