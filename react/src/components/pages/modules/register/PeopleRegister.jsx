import React, { useEffect, useState } from "react";
import Sidebar from "../../../Dashboard/Sidebar";
import Navbar from "../../../Dashboard/Navbar";
import "./css/mainContent.css";
import "../../../Dashboard/css/css.css";
import CreateUserPage from "./components/CreateUserPage"; // corrigido o path

export default function PeopleRegister({ user }) {
    const [userData, setUserData] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;

        fetch("http://localhost:8000/api/users/showIndex", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setUserData(data.user);
            })
            .catch((err) => {
                console.error("Erro ao buscar o usuário", err);
            });
    }, [token]);

    return (
        <>
            <Sidebar />
            <Navbar user={userData} />
            <div className="main-content">
                <CreateUserPage user={userData} />
            </div>
        </>
    );
}
