import React from "react";
import RegisterForm from "../register/RegisterForm";
import LoginBackground from "../login/LoginBackground";

export default function RegisterPage() {
    return (
        <div style={{ position: 'relative' }}>
            <LoginBackground />
            <RegisterForm />
        </div>
    );
}