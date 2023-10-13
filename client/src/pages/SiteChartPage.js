import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import moment from 'moment-timezone'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Form from "../components/Form";
import Chart from "../components/Chart";

export default function SiteChartPage({employee}){

    const [siteForms, setSiteForms] = useState([])

    useEffect(() => {
        fetch("/site_forms")
            .then((r) => r.json())
            .then(setSiteForms)
    }, [])

    function separateFormsByDepartment(list, key) {
        const separatedForms = {}

        for (const form of list) {
            const value = form[key];
            if (!separatedForms[value]) {
                separatedForms[value] = []
            }
            separatedForms[value].push(form)
        }

        return separatedForms
    }

    const separatedForms = separateFormsByDepartment(siteForms, 'department_id')
    console.log(separatedForms[1])
    
    return(
        <div>
            <h1>Site {employee.site_id} Charts</h1>
            {Object.values(separatedForms).map(forms => (
                <>
                    <h1>{forms[0].department_id} Department Charts</h1>
                    <Chart
                    forms={forms}
                    employee={employee}
                    />
                </>
            ))}
        </div>
    )
}