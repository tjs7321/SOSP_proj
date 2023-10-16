import { useEffect, useState, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import moment from 'moment-timezone'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Form from "../components/Form";
import '../styles/Home.css'
import { ThemeContext } from "../context/ThemeContext"

export default function Home({employee}) {
  const [forms, setForms] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [safetyMessage, setSafetyMessage] = useState('Loading Message...')
  const { darkMode, toggleDarkMode } = useContext(ThemeContext)

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
    <div className={`home ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Welcome, {employee.name}!</h1>
      <div className="safetyMessage">
        {safetyMessage}
      </div>
      <h1>Your Recent Submissions</h1>
      <div className="recentSubmissions">
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
            <h1>No Observations Found</h1>
            <NavLink to="/new" className="navLink">
              <button>
                Submit An Observation
              </button>
            </NavLink>
          </>
        )}
      </div>
      <NavLink to="/forms" className="navLink">
        <button>
          All Submissions
        </button>
      </NavLink>
    </div>
  );
}

const SafetyMessageBox = styled.div`
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%),
    0 0 0 1px rgb(10 10 10 / 2%);
  padding: 16px;
`

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  marginTop: 50px;
`;
