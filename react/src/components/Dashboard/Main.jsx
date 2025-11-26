import React, { useEffect, useState } from 'react';
import './css/css.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MainContent from './MainContent';
import { useNavigate } from 'react-router-dom';

export default function Main() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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
                }
            })
            .catch(() => navigate('/login'));

    }, [navigate]);

    if (!user) {
        return <div>Carregando laboratório secreto...</div>;
    }

    return (
        <>
            <Sidebar />
            <Navbar user={user} />
            <div className="main-content">
                <MainContent user={user} />
            </div>
        </>
    );
}
