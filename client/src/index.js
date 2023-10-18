import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import "./styles/App.css";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext"

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <ThemeProvider>
        <Router>
            <App />
        </Router>
    </ThemeProvider>
);

