import "react-datetime/css/react-datetime.css"

export default function FormEdit({questions, formInfo, handleSubmit,
    onCancel, handleCategoryChange, handleTextChange, maxCharacters}) {

    function submitClick(e) {
        e.preventDefault()
        handleSubmit()
    }

    return (
        <div>
            <h2>Edit Form</h2>
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
                        <h4>{questions.question1}</h4>
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
                        <h4>{questions.question2}</h4>
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
                        <h4>{questions.question3}</h4>
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
                        <h4>{questions.question4}</h4>
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
                        <h4>{questions.question5}</h4>
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
                        <h4>Description</h4>
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
                    onClick={onCancel}
                    >Cancel</button>
                </form>
        </div>
    )
}