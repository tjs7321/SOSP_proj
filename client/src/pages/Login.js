import { useState } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import { Button } from "../styles";

function Login({ onLogin }) {

    return (
        <Wrapper>
        <Logo>For the Love of Safety</Logo>
            <>
            <LoginForm onLogin={onLogin} />
            </>
        </Wrapper>
    );
    }

    const Logo = styled.h1`
    font-family: "Roboto", cursive;
    font-size: 3rem;
    color: black;
    margin: 8px 0 16px;
    `;

    const Wrapper = styled.section`
    max-width: 500px;
    margin: 40px auto;
    padding: 16px;
    `;

    const Divider = styled.hr`
    border: none;
    border-bottom: 1px solid #ccc;
    margin: 16px 0;
    `;

    export default Login;