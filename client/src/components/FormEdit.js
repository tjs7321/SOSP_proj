import "react-datetime/css/react-datetime.css"
import React, {useState, useContext} from 'react'
import { ThemeContext } from "../context/ThemeContext"

export default function FormEdit({questions, formInfo, handleSubmit,
    onCancel, handleCategoryChange, handleTextChange, maxCharacters}) {

    function submitClick(e) {
        e.preventDefault()
        handleSubmit()
    }

    const { darkMode, toggleDarkMode } = useContext(ThemeContext)

    return (
        <div id={darkMode ? 'form-detail-dark-mode' : 'form-detail'}>
                <form onSubmit={(e) => submitClick(e)}>
                    <select
                    value={formInfo.type}
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
                    <div>
                        <h3>{questions.question1}</h3>
                        <select
                        required
                        type="text"
                        placeholder="Description"
                        name="answer1"
                        onChange={handleTextChange}
                        value={formInfo.answer1}>
                            <option value="Yes">
                                Yes
                            </option>
                            <option value="No">
                                No
                            </option>
                        </select>
                    </div>
                    <div>
                        <h3>{questions.question2}</h3>
                        <select
                        required
                        type="text"
                        placeholder="Description"
                        name="answer2"
                        onChange={handleTextChange}
                        value={formInfo.answer2}>
                            <option value="Yes">
                                Yes
                            </option>
                            <option value="No">
                                No
                            </option>
                        </select>
                    </div>
                    <div>
                        <h3>{questions.question3}</h3>
                        <select
                        required
                        type="text"
                        placeholder="Description"
                        name="answer3"
                        onChange={handleTextChange}
                        value={formInfo.answer3}>
                            <option value="Yes">
                                Yes
                            </option>
                            <option value="No">
                                No
                            </option>
                        </select>
                    </div>
                    <div>
                        <h3>{questions.question4}</h3>
                        <select
                        required
                        type="text"
                        placeholder="Description"
                        name="answer4"
                        onChange={handleTextChange}
                        value={formInfo.answer4}>
                            <option value="Yes">
                                Yes
                            </option>
                            <option value="No">
                                No
                            </option>
                        </select>
                    </div>
                    <div>
                        <h3>{questions.question5}</h3>
                        <select
                        required
                        type="text"
                        placeholder="Description"
                        name="answer5"
                        onChange={handleTextChange}
                        value={formInfo.answer5}>
                            <option value="Yes">
                                Yes
                            </option>
                            <option value="No">
                                No
                            </option>
                        </select>
                    </div>
                    <div>
                        <h3>Comments:</h3>
                        <textarea
                        rows='4'
                        required
                        type="text"
                        placeholder="Description"
                        name="comments"
                        onChange={handleTextChange}
                        value={formInfo.comments}/>
                        {formInfo.comments.length >= (maxCharacters - 25) ? (
                            <h4 style={{ fontSize: '12px', color: formInfo.comments.length >= maxCharacters ? 'red' : 'black' }}>
                            {maxCharacters - formInfo.comments.length} characters remaining (maximum {maxCharacters} characters).
                            </h4>
                        ) : null}
                    </div>
                    <button
                    type="submit"
                    >Submit</button>
                    <button
                    id={darkMode ? 'deleteButton-dark-mode' : 'deleteButton'}
                    onClick={onCancel}
                    >Cancel</button>
                </form>
        </div>
    )
}