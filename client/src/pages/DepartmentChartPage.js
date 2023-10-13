import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import moment from 'moment-timezone'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Form from "../components/Form";
import Chart from "../components/Chart";

export default function DepartmentChartPage({employee}){

    const [departmentForms, setDepartmentForms] = useState([])

    useEffect(() => {
        fetch("/department_forms")
            .then((r) => r.json())
            .then(setDepartmentForms)
    }, [])
    
    return(
        <div>
            <h1>{employee.department} Department Charts</h1>
            <Chart
            forms={departmentForms}
            employee={employee}
            />
        </div>
    )
}