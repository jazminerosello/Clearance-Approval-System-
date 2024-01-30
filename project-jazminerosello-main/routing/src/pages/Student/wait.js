import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../assets/styles/Header.js"

export default function Wait() {
    const navigate = useNavigate();

    return(
        <div className="home-page">
        <Header/>
        <div className="content">
        <div className="wrapper">
            <div className="center-wait">
                <h2> Please wait for an email confirming account status </h2>

                <button className="signup_button" onClick={() => navigate(`/signUp`)}> Return </button>
            </div>
        </div>
        </div>
        </div>
    );
}
