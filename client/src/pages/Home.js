import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import moment from 'moment-timezone'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Form from "../components/Form";

export default function Home({employee}) {
  const [forms, setForms] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [safetyMessage, setSafetyMessage] = useState('Loading Message...')

  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
    // The maximum is exclusive and the minimum is inclusive
  }

  useEffect(() => {
    setIsLoading(true)
    fetch("/forms_homescreen")
      .then((r) => r.json())
      .then(setForms);
    fetch(`/safety_messages/${getRandomInt(1,21)}`)
      .then((r) =>r.json())
      .then((r)=> setSafetyMessage(r.phrase))
    setIsLoading(false)
  }, []);

  return (
    <Wrapper>
      <h1>Welcome, {employee.name}!</h1>
      <SafetyMessageBox>
        {safetyMessage}
      </SafetyMessageBox>
      <h1>Your Recent Submissions</h1>
      {forms.length > 0 ? (
        forms.map((form) => (
          <Form
          key={form.id}
          {...form}
          >
            {/* <Box>
              <NavLink
              to={`/forms/${form.id}`}
              >{form.type} Form</NavLink>
              <h3>Submitted at: {formatDate(form.created_at)}</h3>
            </Box> */}
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
      <Button
      as={Link}
      to="/forms"
      >
        All Submissions
      </Button>
    </Wrapper>
  );
}

const SafetyMessageBox = styled.div`
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%),
    0 0 0 1px rgb(10 10 10 / 2%);
  padding: 16px;
`

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;
