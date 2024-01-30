import React from "react";
import { useEffect, useState } from 'react';
import queryString from "query-string";
import {useNavigate } from 'react-router-dom';
import Header from "../../assets/styles/Header.js"

export default function EditApprover() {
  const [approvers, setApprovers] = useState([]);
  const navigate = useNavigate();
  
    useEffect(() => {
       
        fetch("http://localhost:3001/approver?upMail="+queryString.parse(window.location.search).upMail)
          .then(response => response.json())
          .then(body => {
            setApprovers(body);
          });
    });

      const handleEdit = (approverupMail) => {
            // code: document.getElementById("code").value,
        let f=document.getElementById("firstname").value;
        let m=document.getElementById("middlename").value;
        let l=document.getElementById("lastname").value;
        let p=document.getElementById("pwd").value;

        if(document.getElementById("firstname").value === "" || document.getElementById("firstname").value === null){
            f=approvers.firstName
        }
        if(document.getElementById("middlename").value === "" || document.getElementById("middlename").value === null){
            m=approvers.middleName
        }
        if(document.getElementById("lastname").value === "" || document.getElementById("lastname").value === null){
            l=approvers.lastName
        }
        if(document.getElementById("pwd").value === "" || document.getElementById("pwd").value === null){
            p=approvers.password
        }


        const updatedApprover = {
          upMail: approverupMail,
          firstName: f,
          middleName: m,
          lastName: l,
          password: p,
        };
      
        fetch('http://localhost:3001/edit-approver', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedApprover)
        })
          .then(response => {
            if (response.ok) {
              console.log("Approver edited successfully");
            } else {
              console.error("Failed to edit approver");
            }
          })
          .catch(error => {
            console.error("Error occurred while editing approver:", error);
          });
          window.location.reload()
      };
      
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


    return(
      <div className="home-page">
      <Header/>
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
                        <button id="green" onClick={() => navigate(`/create-approver`)}>Create Approver </button>
                        <button id="red" onClick={() => navigate(`/delete-approver`)}> Return</button><br/>
                        <div className="logout_button">
                            <button id="green" onClick={() => navigate(`/`)}>Home</button>
                            <button id="logout" onClick={() => navigate(`/adminLogIn`)}>Log Out</button>
                        </div>
                    </div>
                   
                </div>                   
                {/* <button onClick={() => navigate(`/search-approver`)}>search approver</button><br/><br></br> */}
            </div>

            <div className="approvers" id="student-clearance"> 
              <div className="create-approver" id="clearance-box"> 
                <strong>{approvers.upMail} </strong>
                <h1 className="edit-approver">{approvers.lastName}, {approvers.firstName} {approvers.middleName} </h1>
                
                <h4> ONLY FILL IN THE FIELDS TO BE EDITED </h4>
                <hr></hr>
                <div className="text_field"> 
                    <input type="text" id="firstname"></input> 
                    <p> First Name </p>
                    <input type="text" id="middlename"></input><br></br>  
                    <p> Middle Name </p>
                    <input type="text" id="lastname"></input><br></br>
                    <p> Last Name </p>
                    <input type="text" id="pwd"></input><br></br>
                     <p> Password </p>
                     <br></br> <br></br>
                     <button id="green" onClick={() => handleEdit(approvers.upMail)} className="edit">Sumbit</button> <br></br>
                     {/* <button id={approvers.upMail} onClick={() => handleDelete(approver.upMail)} className="Delete Approver Account">Delete</button> */}
                </div>
              </div>
            </div>
        </div>
        </div>
    );
}