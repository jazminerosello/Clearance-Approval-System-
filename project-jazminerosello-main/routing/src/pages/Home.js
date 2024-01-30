import React from "react";
import "../assets/styles/style.css";
import { useNavigate } from "react-router-dom";
import Header from "../assets/styles/Header.js"

export default function Home() {
    const navigate = useNavigate();
    return (
        
        <div className="home-page">
        <Header/>
        <div className="content">
        <div className="center">
            <nav>
                <h1>WELCOME</h1>
                <div className="tabs">
                {/* impelment the tabs */}
{/*                     <div className="tab-Box">
                        <a href="/signUp">Student</a><br/>
                    </div>
                    <div>
                        <a href="adminLogIn">Admin</a><br/>
                    </div>
                    <div>
                        <a href="/approverLogIn">Advisers</a><br/>         
                    </div>   
                    <div>
                        <a href="/clearance-log-in">Clearance Officer</a>
                    </div> */}
                    <div className="home-buttons"> 
                        <button className="home-btn" onClick={() => navigate(`/signUp`)}> Student </button> <br></br>
                        <button className="home-btn" onClick={() => navigate(`/approverLogIn`)}> Adviser </button> <br></br>
                        <button className="home-btn" onClick={() => navigate(`/adminLogIn`)}> Administrator </button> <br></br>
                        <button className="home-btn" onClick={() => navigate(`/clearance-log-in`)}> Clearance Officer </button> 
                    </div>
                </div>
            </nav>
        </div>
        </div>
        </div>
    )
}

