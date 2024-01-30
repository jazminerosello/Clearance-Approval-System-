import React from "react";
import { useState, useEffect } from "react";
import queryString from "query-string";
import {useNavigate } from 'react-router-dom';
import Header from "../../assets/styles/Header.js";

export default function Search() {
  const navigate = useNavigate();
    const [approver, setApprover] = useState([]);
    
      useEffect(() => {
       
        fetch("http://localhost:3001/search?lastName="+queryString.parse(window.location.search).lastName)
          .then(response => response.json())
          .then(body => {
            setApprover(body)
          })
          
         
    });

    const handleSearch = () => {

      const searchQuery = document.getElementById("searchthis").value;

      if(searchQuery == ""){
          alert("Search field cannot be empty.");
      } else {
          window.location.href = "http://localhost:3000/search?lastName=" + searchQuery
      }
      //window.location.href = "http://localhost:3000/search?lastName=${searchQuery}"
      //window.open(`http://localhost:3000/search?lastName=${searchQuery}`)
      
    };

    return (
      <div className="home-page">
      <Header/>
      <div className="wrapper">
        <div className="main">
          <div className="side-bar">
              <h3>Welcome,</h3>
              <h1>Admin!</h1>

            {/* <button onClick={() => navigate(`/`)}>Log Out</button> */}
            {/* <p  style={{ display: 'inline' }}>search:</p><input type="text" name="apr" id="apr" class="apr" required/><br></br> */}
            <div className="search_approver">
            <label>Enter approver's last name</label>
                    <input className="search_lname_input" id ="searchthis" type="text"></input>
                    <span></span>
                    <button id="search" onClick={() => handleSearch()}>Search</button><br/><br/>          

                <div className="manage_approver">
                    <button id="green" onClick={() => navigate(`/create-approver`)}>Create Approver</button>
                    <button id="green" onClick={() => navigate(`/delete-approver`)}>View Approver</button><br/>

                    <button onClick={() => navigate(`/viewApplication`)}>Return</button><br/>
                    <div className="logout_button">
                            <button id="green" onClick={() => navigate(`/`)}>Home</button>
                            <button id="logout" onClick={() => navigate(`/adminLogIn`)}>Log Out</button>
                    </div>
                </div>
                
            </div> 
          </div>
          <div className="approvers" id="approvers-main">
            <br></br>
            <h1 >Search Results for {queryString.parse(window.location.search).lastName}!</h1>

              <div>
                {approver.length > 0 ? (
                  <div>                 
                    {approver.map((app, i) =>
                    <div className="list"> 
                      <li key={i}>
                        <br></br>
                          <h4 id="result-h3"> Last name, First name, Middle initial </h4>
                          <h2>{app.lastName}, {app.firstName} {app.middleName}    </h2>
                          <h4 id="result-h3"> UP Mail </h4>
                          <h3 > {app.upMail}  </h3>
                          <br></br>
                      </li>
                    </div>
                  )}</div>
                ) : (
                <div> 
                  <p>{queryString.parse(window.location.search).lastName} does not exist in records. </p>
                </div>
                )}
              </div>
        </div>

          </div>
      </div>
      </div>
  )  
}