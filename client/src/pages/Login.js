import LoginForm from "../components/LoginForm";
import "../styles/Login.css"

export default function Login({ onLogin }) {

    return (
        <div className="login-container">
            <h1>Safety Submission Portal</h1>
            <LoginForm onLogin={onLogin} />
        </div>
    );
}
