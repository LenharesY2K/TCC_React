// RegisterOrder.js

import React, { useState, useEffect } from "react";
import Encomendas from "./components/orderManager";
import Navbar from "../../../Dashboard/Navbar";
import Sidebar from "../../../Dashboard/Sidebar";

export default function RegisterOrder() {
    const [userData, setUserData] = useState(null);
    const [userModules, setUserModules] = useState(null);

    // ⭐️ FUNÇÃO CORRIGIDA PARA TRATAR O ARRAY 'permissions'
    const mapPermissions = (data) => {
        // Tenta encontrar o array de permissões, que pode estar em 'data.permissions'
        // ou, como fallback, o próprio objeto de dados (embora menos provável para um array).
        const rawPermissions = data.permissions || (data.user && data.user.permissions) || [];

        // Converte o array de permissões em um Set para buscas rápidas (O(1))
        // Isso é crucial quando as permissões vêm como ["order:view", "order:register", ...]
        const permissionSet = new Set(rawPermissions);

        // Mapeamento das chaves de permissão da API para os módulos de frontend
        // Usamos .has() no Set para verificar a permissão
        return {
            visualizar: permissionSet.has('order:view'),
            cadastrar: permissionSet.has('order:register'),
            editar: permissionSet.has('order:edit'),
            excluir: permissionSet.has('order:delete'),
        };
    };

    useEffect(() => {
        const currentToken = localStorage.getItem("token"); 
        
        if (!currentToken) {
            setUserModules({ visualizar: false, cadastrar: false, editar: false, excluir: false });
            setUserData({}); 
            return;
        }

        fetch("http://localhost:8000/api/users/showIndex", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${currentToken}`, 
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
                // 1. Define os dados completos do usuário
                setUserData(data.user || data);

                // 2. Mapeia e define os módulos/permissões
                const mappedModules = mapPermissions(data);
                setUserModules(mappedModules);
            })
            .catch((err) => {
                console.error("Erro ao buscar o usuário ou permissões:", err);
                setUserData({}); 
                setUserModules({
                    visualizar: false, cadastrar: false, editar: false, excluir: false,
                });
            });
    }, []); 

    if (!userData || !userModules) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <Sidebar />
            <Navbar user={userData} />
            <div className="main-content">
                <br /><br /><br></br><br></br><br></br><br></br>
                <Encomendas user={userData} userModules={userModules} />
                <br></br><br></br>
            </div>
        </>
    );
}