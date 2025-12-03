import React from "react";
import RegisterForm from "../register/RegisterForm";
import LoginBackground from "../login/LoginBackground";

export default function RegisterPage() {
    return (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                minHeight: '100vh',
                paddingTop: '350px',
                paddingBottom:'150px'
            }}
        >
            <LoginBackground />

            <div style={{ position: 'relative', zIndex: 2 }}>
                <RegisterForm />
            </div>
        </div>
    );
}
