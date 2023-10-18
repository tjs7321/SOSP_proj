import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router"
import '../styles/NewForm.css'
import '../styles/Select.css'
import { ThemeContext } from "../context/ThemeContext"

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
  const { darkMode, toggleDarkMode } = useContext(ThemeContext)
  const employee_id = employee.id
  const department_id = employee.department_id
  const site_id = employee.site_id
  const maxCharacters = 500

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
    if (e.target.value.length <= maxCharacters){
      setNewForm({
        ...newForm,
        [e.target.name]: e.target.value
      })
    }
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
    <div className={`newForm ${darkMode ? 'dark-mode' : ''}`}>
      <div  id="form">
        <h2>Submit a Safety Observation</h2>
        {/* <div id="custom-select"> */}
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
        {/* </div> */}
        <form
        onSubmit={handleSubmit}
        >
          <div>
            <div id="questions">
              <label>
                {questions.question1}
                  <div id="questionAnswers">
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
                  </div>
              </label>
            </div>
            <div id="questions">
              <label>
                {questions.question2}
                  <div id="questionAnswers">
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
                  </div>
              </label>
            </div>
            <div id="questions">
              <label>
                  {questions.question3}
                  <div id="questionAnswers">
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
                  </div>
              </label>
            </div>
            <div id="questions">
              <label>
                  {questions.question4}
                  <div id="questionAnswers">
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
                  </div>
              </label>
            </div>
            <div id="questions">
            <label>
                {questions.question5}
                <div id="questionAnswers">
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
                </div>
            </label>
            
            </div>
              <textarea
                required
                placeholder="Comments"
                name="comments"
                onChange={handleTextChange}
                value={newForm.comments}
                rows={5}  // Adjust the number of visible rows
                cols={50} // Adjust the number of visible characters per row
              />
              {newForm.comments.length >= (maxCharacters - 25) ? (
                <h4 style={{ fontSize: '12px', color: newForm.comments.length >= maxCharacters ? 'red' : 'black' }}>
                  {maxCharacters - newForm.comments.length} characters remaining (maximum {maxCharacters} characters).
                </h4>
              ) : null}
          </div>
          <button color="primary" type="submit">
            {isLoading ? "Loading..." : "Submit Form"}
          </button>
        </form>
      </div>
    </div>
  )}

  else return(
    <h1>Loading...</h1>
  )

}

export default NewForm
