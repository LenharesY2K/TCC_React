import React from "react";
import CreateOrganization from "../startTrial/CreateOrganization";
import LoginBackground from "../login/LoginBackground";
import '../pages/css/main-content.css';

export default function StartTrial() {
    return (
        <div className="main-content">
            <LoginBackground/>
            <CreateOrganization />
        </div>
    );
}