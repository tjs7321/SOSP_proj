import React, { useState } from "react"
import styled from "styled-components";
import "../styles/Login.css"
import Error from "./Error";

export default function LoginForm({ onLogin }) {
  const [employee, setEmployee] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employee, password }),
    }).then((r) => {
      setIsLoading(false)
      if (r.ok) {
        r.json().then((user) => onLogin(user))
      } else {
        setErrors("Employee ID or Password is incorrect")
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField>
      <div className="label" htmlFor="employee">Employee ID</div>
        <input
          required
          type="text"
          id="employee"
          autoComplete="off"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        />
      </FormField>
      <FormField>
        <div className="label" htmlFor="password">Password</div>
        <input
          required
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormField>
        <button variant="fill" color="primary" type="submit">
          {isLoading ? "Loading..." : "Login"}
        </button>
        {errors ? (
        <div className="errorWrapper">
          <span className="errorAlert">!</span>
          <p className="errorMessage">{errors}</p>
        </div>) : null}
    </form>
  )
}

const FormField = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;
