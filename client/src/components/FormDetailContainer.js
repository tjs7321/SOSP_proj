import React, {useState, useContext} from 'react'
import FormEdit from './FormEdit'
import moment from 'moment-timezone'
import { ThemeContext } from "../context/ThemeContext"

export default function FormDetailContainer({maxCharacters, handleSubmit, handleCategoryChange, handleTextChange,
    questions, formInfo, handleFormUpdate, editing, onClickDelete,onClickEdit, formEmployeeID, employee}) {

    function formatDate(isodate) {
        return moment(isodate).format('MM-DD-YYYY h:mm')
    }

    const { darkMode, toggleDarkMode } = useContext(ThemeContext)

    if (questions === undefined){
        return <h1>Loading...</h1>
    } else{if (formEmployeeID === employee.id){
        if (!editing) {
            return (
                <div id={darkMode ? 'form-detail-dark-mode' : 'form-detail'}>
                    <h1>{formInfo['type']}</h1>
                    <div>

                            <h3>{questions.question1}</h3>
                            <p>{formInfo['answer1']}</p>
                        </div>
                        <div>
                            <h3>{questions.question2}</h3>
                            <p>{formInfo['answer2']}</p>
                        </div>
                        <div>
                            <h3>{questions.question3}</h3>
                            <p>{formInfo['answer3']}</p>
                        </div>
                        <div>
                            <h3>{questions.question4}</h3>
                            <p>{formInfo['answer4']}</p>
                        </div>
                        <div>
                            <h3>{questions.question5}</h3>
                            <p>{formInfo['answer5']}</p>
                        </div>
                        <div>
                            <h3>Comments:</h3>
                            <p>{formInfo['comments']}</p>
                        </div>

                    <button
                    onClick={onClickDelete}
                    id={darkMode ? 'deleteButton-dark-mode' : 'deleteButton'}
                    >Delete</button>
                    <button
                    onClick={onClickEdit}
                    >Edit</button>
                </div>
            )
        } else {
            console.log('editing')
            return (
                <FormEdit
                    questions={questions}
                    handleSubmit={handleSubmit}
                    handleCategoryChange={handleCategoryChange}
                    handleTextChange={handleTextChange}
                    formInfo={{...formInfo}}
                    onSubmit={handleFormUpdate}
                    onCancel={onClickEdit}
                    maxCharacters={maxCharacters}
                />
            )
        }
    } else {
        return (
            <div id={darkMode ? 'form-detail-dark-mode' : 'form-detail'}>
                <h1>Department: {formInfo['department']}</h1>
                <h1>{formInfo['type']}</h1>
                <div>
                    <h3>{questions.question1}</h3>
                    <p>{formInfo['answer1']}</p>
                    <h3>{questions.question2}</h3>
                    <p>{formInfo['answer2']}</p>
                    <h3>{questions.question3}</h3>
                    <p>{formInfo['answer3']}</p>
                    <h3>{questions.question4}</h3>
                    <p>{formInfo['answer4']}</p>
                    <h3>{questions.question5}</h3>
                    <p>{formInfo['answer5']}</p>
                    <h3>Comments:</h3>
                    <p>{formInfo['comments']}</p>
                </div>
            </div>
        )
    }}
}