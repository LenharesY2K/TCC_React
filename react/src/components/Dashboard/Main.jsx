import React from 'react';
import './css/css.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Import } from 'lucide-react';
import './css/main.css';
import MainContent from './MainContent';
import './css/main.css';


export default function Main() {
    return (
        <>
            <Sidebar></Sidebar>

            <Navbar></Navbar>

            <div className="main-content">

                <MainContent></MainContent>

            </div>
        </>
    );
}
