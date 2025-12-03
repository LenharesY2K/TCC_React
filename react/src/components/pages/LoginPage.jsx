import React from "react";
import LoginForm from "../login/LoginForm";
import LoginBackground from "../login/LoginBackground";

export default function LoginPage() {
    return (
        <div className="maincontent">
            <LoginBackground />
            <LoginForm />
        </div>
    );
}