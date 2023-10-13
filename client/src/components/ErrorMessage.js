import React from 'react'

export default function ErrorMessage({error}) {
    if (error) {
        return <p>{error}</p>
    } else {return}
}
