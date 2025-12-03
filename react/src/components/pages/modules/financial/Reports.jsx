import React from "react";
import Sidebar from "../../../Dashboard/Sidebar";
import Navbar from "../../../Dashboard/Navbar";
import Graphics from "./components/graphics";
import './components/css/maincontent.css';
import { useEffect, useState } from "react";


export default function Reports() {
    const [userData, setUserData] = useState(null);
    const [userModules, setUserModules] = useState(null);
    const token = localStorage.getItem("token");

    const mapPermissions = (data) => {
        const rawPermissions = data.permissions || (data.user && data.user.permissions) || [];
        const permissionSet = new Set(rawPermissions);

        return {
            visualizar: permissionSet.has('system:view') || permissionSet.has('report:view'),
        };
    };

    useEffect(() => {
        if (!token) {
            setUserData({});
            setUserModules({});
            return;
        }

        fetch("http://localhost:8000/api/systemModule/profile/index", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Falha na autenticação ou busca de dados.');
                }
                return res.json();
            })
            .then((data) => {
                setUserData(data.user || data);

                const mappedModules = mapPermissions(data);
                setUserModules(mappedModules);
            })
            .catch((err) => {
                console.error("Erro ao buscar o usuário", err);
                setUserData({});
                setUserModules({});
            });
    }, [token]);

    if (!userData || !userModules) {
        return <div>Carregando Dados do Usuário...</div>;
    }

    return (
        <>
            <Sidebar />
            <Navbar user={userData} />
            <div className="maincontent2">
                <Graphics user={userData} userModules={userModules} />
                <br></br>
            </div>
        </>
    );
}