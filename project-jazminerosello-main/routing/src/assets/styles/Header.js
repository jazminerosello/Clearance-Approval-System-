import React from "react";
import {useNavigate} from 'react-router-dom';


const Header  = () => {
    const navigate = useNavigate();

    return(
        <div className="page-header">
            <img className="logo" src='https://up.edu.ph/wp-content/uploads/2020/01/UP-Seal.png' alt="Example" />
            <div className="home">
                <div className="home2">
                    <button onClick={() => navigate(`/`)}>HOME</button>
                </div>
                
            </div>
        </div>
    );
}

export default Header;