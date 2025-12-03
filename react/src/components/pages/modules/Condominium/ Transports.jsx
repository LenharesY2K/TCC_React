import React from "react";
import Sidebar from "../../../Dashboard/Sidebar";
import Navbar from "../../../Dashboard/Navbar";
import Transportadores from "./components/transportadoras";

export default function Transports() {

    return (
        <>
            <Sidebar />
            <Navbar />

            <div className="main-content">
                <br></br><br></br><br></br>
                <br></br><br></br><br></br>
                <Transportadores />
                <br></br>
            </div>
        </>
    );
}
