import { useState, useEffect } from "react"
import { useHistory } from "react-router"
import styled from "styled-components"
import ReactMarkdown from "react-markdown"
import { Button, Error, FormField, Input, Label, Textarea, Wrapper, WrapperChild } from "../styles"

function NewForm({ employee, questionLists}) {

  const emptyForm = {
    type: 'Meetings',
    answer1: 'Yes',
    answer2: 'Yes',
    answer3: 'Yes',
    answer4: 'Yes',
    answer5: 'Yes',
    comments: ""}
  const [newForm, setNewForm] = useState(emptyForm)
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState('Meetings')
  const history = useHistory()
  const employee_id = employee.id
  const department_id = employee.department_id
  const site_id = employee.site_id

  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    fetch("/forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: newForm.type,
        answer1: newForm.answer1,
        answer2: newForm.answer2,
        answer3: newForm.answer3,
        answer4: newForm.answer4,
        answer5: newForm.answer5,
        comments: newForm.comments,
        employee_id,
        department_id,
        site_id,
      }),
    }).then((r) => {
      setIsLoading(false)
      setNewForm(emptyForm)
      if (r.ok) {
        history.push("/")
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    });
  }

  function handleTextChange(e) {
        
    setNewForm({
      ...newForm,
      [e.target.name]: e.target.value
    })
  }

  // console.log(questionLists)

  function handleCategoryChange(e){
    setNewForm({
      ...newForm,
      [e.target.name]: e.target.value
    })
    setCategory(e.target.value)
  }
  
  const questions = questionLists.find(q=> q.type === category)

  if (questionLists.length === 4) {
  
  return (
    <Wrapper>
      <WrapperChild>
        <h2>Submit a Safety Observation</h2>
        <select
        value={newForm.type}
        placeholder="Select a Category"
        name={'type'}
        onChange={(e) => handleCategoryChange(e)}
        >
          <option value="Meetings">
            Meetings
          </option>
          <option value="Radiation Protection">
            Radiation Protection
          </option>
          <option value="Safety">
            Safety
          </option>
          <option value="Environmental">
            Environmental
          </option>
        </select>
        <form onSubmit={handleSubmit}>
          <FormField>
            <label>
                {questions.question1}
                <select
                value={newForm.answer1}
                name="answer1"
                onChange={handleTextChange}
                >
                    <option value="Yes">
                        Yes
                    </option>
                    <option value="No">
                        No
                    </option>
                </select>
            </label>
            <label>
                {questions.question2}
                <select
                value={newForm.answer2}
                name="answer2"
                onChange={handleTextChange}
                >
                    <option value="Yes">
                        Yes
                    </option>
                    <option value="No">
                        No
                    </option>
                </select>
            </label>
            <label>
                {questions.question3}
                <select
                value={newForm.answer3}
                name="answer3"
                onChange={handleTextChange}
                >
                    <option value="Yes">
                        Yes
                    </option>
                    <option value="No">
                        No
                    </option>
                </select>
            </label>
            <label>
                {questions.question4}
                <select
                value={newForm.answer4}
                name="answer4"
                onChange={handleTextChange}
                >
                    <option value="Yes">
                        Yes
                    </option>
                    <option value="No">
                        No
                    </option>
                </select>
            </label>
            <label>
                {questions.question5}
                <select
                value={newForm.answer5}
                name="answer5"
                onChange={handleTextChange}
                >
                    <option value="Yes">
                        Yes
                    </option>
                    <option value="No">
                        No
                    </option>
                </select>
            </label>
            <div>
                <input
                required
                type="text"
                placeholder="Comments"
                name="comments"
                onChange={handleTextChange}
                value={newForm.comments}/>
            </div>
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Form"}
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
    </Wrapper>
  )}

  else return(
    <h1>Loading...</h1>
  )

}

export default NewForm
