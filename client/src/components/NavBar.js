import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";
import '../styles/NavBar.css'
import { useHistory } from "react-router"

function NavBar({ employee, setEmployee }) {

  const history = useHistory()

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setEmployee(null)
        history.push("/")
      }
    });
  }

  if (employee.type === 'manager') {
    return (
      <Wrapper
      // className="navbar"
      >
        <Dropdown>
          <Button
          as={Link} to="/department_forms"
          >
              Department Forms
          </Button>
          <Button
          as={Link} to='/department_chart_page'
          >
              Department Charts
          </Button>
        </Dropdown>
        <Logo>
          <Link to="/">Safety Submission Portal</Link>
        </Logo>
        <Nav>
          <Button as={Link} to="/newForm">
            New Submission
          </Button>
          <Button variant="outline" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Nav>
      </Wrapper>
    )}

  if (employee.type === 'employee') {
    return (
      <Wrapper
      // className="navbar"
      >
        <Logo>
          <Link to="/">Safety Submission Portal</Link>
        </Logo>
        <Nav>
          <Button as={Link} to="/newForm">
            New Submission
          </Button>
          <Button variant="outline" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Nav>
      </Wrapper>
    )}
  
  if (employee.type === 'admin') {
    return (
      <Wrapper
      // className="navbar"
      >
        <Dropdown>
          <Button
          as={Link} to="/site_forms"
          >
              Site Forms
          </Button>
          <Button
          as={Link} to="/site_chart_page"
          >
              Site Charts
          </Button>
        </Dropdown>
        <Logo>
          <Link to="/">Safety Submission Portal</Link>
        </Logo>
        <Nav>
          <Button as={Link} to="/newForm">
            New Submission
          </Button>
          <Button variant="outline" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Nav>
      </Wrapper>
    )}
}


const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Roboto", cursive;
  font-size: 3rem;
  color: black;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
`;

const Dropdown = styled.nav`
  display: flex;
  gap: 4px;
  position: left-align;
  right: 8px;
`;

export default NavBar;
