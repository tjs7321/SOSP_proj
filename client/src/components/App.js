import React, { useEffect, useState, useContext } from "react"
import { Switch, Route } from "react-router-dom"
import NavBar from "./NavBar"
import Login from "../pages/Login"
import Home from "../pages/Home"
import NewForm from "../pages/NewForm"
import AllForms from "../pages/AllForms"
import FormDetailPage from "../pages/FormDetailPage.js"
import '../styles/App.css'
import DepartmentForms from "../pages/DepartmentForms"
import SiteForms from "../pages/SiteForms"
import DepartmentChartPage from "../pages/DepartmentChartPage"
import SiteChartPage from "../pages/SiteChartPage"
import { ThemeContext } from "../context/ThemeContext"

function App() {
  const [employee, setEmployee] = useState(null)
  const [questionLists, setQuestionLists] = useState([])
  const { darkMode, toggleDarkMode } = useContext(ThemeContext)

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((employee) => setEmployee(employee))
      }
    })
    fetch(`/questions`)
    .then(r=>{
        if (r.ok) {
            return r.json().then(questions=> {
                setQuestionLists(questions)
            })
        } else {
            console.log('error!')
            // setError(true)
        }
    })
  }, [])

  if (!employee) return (
      <div
      className={`background ${darkMode ? 'dark-mode' : ''}`}>
        <NavBar></NavBar>
        <Login onLogin={setEmployee} />
      </div>
  )

  return (
      <div
      className={`background ${darkMode ? 'dark-mode' : ''}`}
      >
        {employee === null ? null :
        <NavBar employee={employee} setEmployee={setEmployee} />}
          <Switch>
            <Route path="/newForm">
              <NewForm
              questionLists={questionLists}
              employee={employee}
              />
            </Route>
            <Route exact path="/">
              <Home
              employee={employee}
              />
            </Route>
            <Route exact path='/forms'>
              <AllForms
              questionLists={questionLists}
              />
            </Route>
            <Route exact path='/department_forms'>
              <DepartmentForms
              employee={employee}
              questionLists={questionLists}
              />
            </Route>
            <Route exact path='/site_forms'>
              <SiteForms
              questionLists={questionLists}
              />
            </Route>
            <Route path='/forms/:id'>
              <FormDetailPage
              employee={employee}
              questionLists={questionLists}
              />
            </Route>
            <Route exact path='/department_chart_page'>
              <DepartmentChartPage
              employee={employee}
              />
            </Route>
            <Route exact path='/site_chart_page'>
              <SiteChartPage
              employee={employee}
              />
            </Route>
          </Switch>
      </div>
  );
}

export default App
