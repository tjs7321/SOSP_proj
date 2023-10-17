import { useEffect, useState, useContext } from "react"
import { useHistory } from "react-router-dom";
import "react-datetime/css/react-datetime.css"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import FormDetailContainer from "../components/FormDetailContainer";
import { ThemeContext } from "../context/ThemeContext"
import '../styles/FormDetail.css'


export default function FormDetailPage({employee, questionLists}) {

    const {id} = useParams()
    const [formInfo, setFormInfo] = useState({
        'department': '',
        'type': '',
        'answer1':'',
        'answer2':'',
        'answer3':'',
        'answer4':'',
        'answer5':'',
        'comments':'',
        'department_id':'',
        'site_id':''
    })

    const [editing, setEditing] =useState(false)
    const [error, setError] = useState(false)
    const [category, setCategory] = useState(formInfo.type)
    const [formEmployeeID, setFormEmployeeID] = useState(1)
    const { darkMode, toggleDarkMode } = useContext(ThemeContext)
    const history = useHistory()

    useEffect(()=> {
        fetch(`/forms/${id}`)
        .then(r=>{
            if (r.ok) {
                return r.json().then(data=> {
                    setFormInfo({
                        'department':data['department'],
                        'type':data['type'],
                        'answer1':data['answer1'],
                        'answer2':data['answer2'],
                        'answer3':data['answer3'],
                        'answer4':data['answer4'],
                        'answer5':data['answer5'],
                        'comments':data['comments'],
                        'department_id':data['department_id'],
                        'site_id':data['site_id'],
                    })
                    setCategory(data['type'])
                    setFormEmployeeID(data['employee_id'])
                })
            } else {
                console.log('error!')
                setError(true)
                
            }
        })
    }, [editing])

    


    // EVENT HANDLERS
    function onClickDelete() {
        const result = window.confirm("Delete event?")
        if (result === true){
            fetch(`/forms/${id}`, {
                method: "DELETE",
            })
            .then(history.push("/"))
        }
    }

    function handleSubmit() {
        const body = JSON.stringify({
            type: formInfo.type,
            answer1: formInfo.answer1,
            answer2: formInfo.answer2,
            answer3: formInfo.answer3,
            answer4: formInfo.answer4,
            answer5: formInfo.answer5,
            comments: formInfo.comments,
        })
        // console.log(body)
        fetch(`/forms/${id}`, {
            method: "PATCH",
            headers: {"content-type": "application/json", "accepts":"application/json"},
            body: body
        }).then(r=>{
            if (r.ok) {
                return r.json().then(data => {
                    setFormInfo(data)
                    setEditing(false)
                })
            } else {
                console.log('error!')
                setError(true)
                setEditing(false)
            }
        })
        // setEditing(false)
    }

    function onClickEdit() {
        setEditing(editing=>!editing)
    }

    function handleTextChange(event) {
        
        setFormInfo({
            ...formInfo,
            [event.target.name]: event.target.value
        })
    }

    function handleCategoryChange(e){
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
        setCategory(e.target.value)
    }

    const questions = questionLists.find(q=> q.type === category)
    
    // PAGE RENDER
    if (formInfo['type']) {
        return (
            <div className={`formDetail ${darkMode ? 'dark-mode' : ''}`}>
                <FormDetailContainer
                handleSubmit={handleSubmit}
                handleCategoryChange={handleCategoryChange}
                handleTextChange={handleTextChange}
                questions={questions}
                formInfo={formInfo}
                editing={editing}
                onClickDelete={onClickDelete}
                onClickEdit={onClickEdit}
                formEmployeeID={formEmployeeID}
                employee={employee}
                />
            </div>
        )
    } else if (error) {
        return (
            <div className={`formDetail ${darkMode ? 'dark-mode' : ''}`}>
                <h1>Could not find form</h1>
                <button onClick={()=>history.push('/')}>Return to homepage?</button>
            </div>
        )
    }  else {
        return (
            <div className={`formDetail ${darkMode ? 'dark-mode' : ''}`}>
                <h1>Loading...</h1>
            </div>
        )
    }
}