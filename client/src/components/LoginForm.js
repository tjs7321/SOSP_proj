import React, { useState } from "react"

function LoginForm({ onLogin }) {
  const [employee, setEmployee] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])
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
        r.json().then((err) => setErrors(err.errors))
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1 htmlFor="employee">Employee ID</h1>
        <input
          type="text"
          id="employee"
          autoComplete="off"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        />
      </div>
      <div>
        <h1 htmlFor="password">Password</h1>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button variant="fill" color="primary" type="submit">
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
      {/* <div>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </div> */}
    </form>
  )
}

export default LoginForm 
