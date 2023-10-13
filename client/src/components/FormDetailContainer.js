import React, {useState} from 'react'
import FormEdit from './FormEdit'
import moment from 'moment-timezone'

export default function FormDetailContainer({handleSubmit, handleCategoryChange, handleTextChange,
    questions, formInfo, handleFormUpdate, editing, onClickDelete,onClickEdit, formEmployeeID, employee}) {

    function formatDate(isodate) {
        return moment(isodate).format('MM-DD-YYYY h:mm')
    }

    // console.log(formEmployeeID)
    // console.log(employee)
    // console.log(questions)

    if (questions === undefined){
        return <h1>Loading...</h1>
    } else{if (formEmployeeID === employee.id){
        if (!editing) {
            return (
                <div>
                    <h1>{formInfo['type']}</h1>
                    <div>
                        <h4>{questions.question1}</h4>
                        <p>{formInfo['answer1']}</p>
                        <h4>{questions.question2}</h4>
                        <p>{formInfo['answer2']}</p>
                        <h4>{questions.question3}</h4>
                        <p>{formInfo['answer3']}</p>
                        <h4>{questions.question4}</h4>
                        <p>{formInfo['answer4']}</p>
                        <h4>{questions.question5}</h4>
                        <p>{formInfo['answer5']}</p>
                        <h4>Comments:</h4>
                        <p>{formInfo['comments']}</p>
                    </div>
                    <div>
                        <button
                        onClick={onClickDelete}
                        >Delete</button>
                        <button
                        onClick={onClickEdit}
                        >Edit</button>
                    </div>
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
                />
            )
        }
    } else {
        return (
            <div>
                <h1>{formInfo['type']}</h1>
                <div>
                    <h4>{questions.question1}</h4>
                    <p>{formInfo['answer1']}</p>
                    <h4>{questions.question2}</h4>
                    <p>{formInfo['answer2']}</p>
                    <h4>{questions.question3}</h4>
                    <p>{formInfo['answer3']}</p>
                    <h4>{questions.question4}</h4>
                    <p>{formInfo['answer4']}</p>
                    <h4>{questions.question5}</h4>
                    <p>{formInfo['answer5']}</p>
                    <h4>Comments:</h4>
                    <p>{formInfo['comments']}</p>
                </div>
            </div>
        )
    }}

    
}