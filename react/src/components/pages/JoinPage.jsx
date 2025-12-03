import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginBackground from "../login/LoginBackground";
import PageContainer from "../joinpage/PageContainer";

export default function JoinPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [entercode, setEntercode] = useState('');
    const [company, setCompany] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        fetch('http://localhost:8000/api/users/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 401) {
                    navigate('/login');
                }
                return response.json();
            })
            .then(data => {
                if (data.user) {
                    setUser(data.user);
                    if (data.user.company_id) {
                        setCompany(data.user.company || null);
                    }
                }
            })
            .catch(() => navigate('/login'));
    }, [navigate]);

    const handleLinkCompany = async (e) => {
        e.preventDefault();
        setMessage('');

        const token = localStorage.getItem('token');

        try {
            const res = await fetch('http://localhost:8000/api/users/companyingress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ entercode })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(data.message);
                setUser(data.user);
                setCompany(data.company);
            } else {
                setMessage(data.message || 'Erro ao vincular empresa.');
            }
        } catch (err) {
            setMessage('Erro de conexão.');
        }
    };

    if (!user) return <div>Carregando...</div>;

    return (
        <div style={{ position: 'relative' }}>
            <LoginBackground/>
            <PageContainer user={user}/>
        </div>
    );
}
