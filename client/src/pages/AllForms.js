import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import moment from 'moment-timezone'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Form from "../components/Form";

export default function AllForms(){

    const [forms, setForms] = useState([])

    useEffect(() => {
        fetch("/forms")
            .then((r) => r.json())
            .then(setForms)
    }, [])

    return (
        <Wrapper>
            <h1>All Submissions</h1>
            {forms.length > 0 ? (
                forms.map((form) => (
                <Form
                key={form.id}
                {...form}
                >
                </Form>
                ))
            ) : (
                <>
                <h2>No Observations Found</h2>
                <Button as={Link} to="/new">
                    Submit an Observation
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