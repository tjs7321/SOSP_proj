import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Box, Button } from "../styles"
import moment from 'moment-timezone'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"

export default function Form({id, type, created_at}){

    
    function formatDate(isodate) {
        return moment(isodate).format('MM-DD-YY @ h:mm')
    }

    return(
        <Box>
            <NavLink
            to={`/forms/${id}`}
            >{type} Form</NavLink>
            <h3>Submitted at: {formatDate(created_at)}</h3>
        </Box>
    )
}