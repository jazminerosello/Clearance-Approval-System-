import React from "react";
import { useState, useEffect } from "react";
import queryString from "query-string";
import {useNavigate } from 'react-router-dom';
import Header from "../../assets/styles/Header.js"


export default function SearchStud() {
    const navigate = useNavigate();
    const [students, setStudent] = useState([]);

    //console.log(document.referrer);
//mark
const [adviser, setAdviser] = useState([]);
const adviserMail = queryString.parse(window.location.search).adviser;
//console.log(adviserMail)

useEffect(() => {
  fetch("http://localhost:3001/search-adviser-id?id="+ adviserMail)
    .then(response => response.json())
    .then(body => {
      setAdviser(body)
      //adviserid = body.adviser
      //console.log(adviserid)
      
    })

    .catch(error  => {
      //alert("No Student/s Found!!")
    }) 
   
});

    useEffect(() => {
        fetch("http://localhost:3001/search-student?lastName="+queryString.parse(window.location.search).lastName+ "&adviser=" + queryString.parse(window.location.search).adviser)
          .then(response => response.json())
          .then(body => {
            setStudent(body)
          })
          .catch(error  => {
            //alert("No Student/s Found!!")
          }) 
         
    });

    const handleSearch = () => {

        const searchQuery = document.getElementById("searchthis").value;
      
        if(searchQuery == ""){
            alert("Search field cannot be empty.");
        } else {
            window.location.href = "http://localhost:3000/search-student?lastName=" + searchQuery
        }  
      };
    
    return(
        <div className="home-page">
        <Header/>
        <div className="wrapper">
            <div className="main">
                <div className="side-bar"> 
                    <h3>Welcome,</h3>
                    <h1>{adviser.firstName}!</h1>

                    <div className="approved-pending"> 

                    <button id="green" onClick={() => navigate(-1)}> Return</button>

                    <div className="logout_button"> 
                        <button onClick={() => navigate(`/approverLogIn`)}>Log Out</button>
                    </div>

                    </div>
                </div>

                <div className="approvers" id="approvers-main">
                    <h1>Search Results for {queryString.parse(window.location.search).lastName}!</h1>

                    <div> 
                        {students.length > 0 ? (
                            <div> 
                                {students.map((stud, i) =>
                                <div className="list-clearance"> 
                                    <li key={i}>
                                        <br></br>
                                    <h4 id="result-h3"> Last name, First name, Middle initial </h4>
                                    <h2>{stud.lastName}, {stud.firstName} {stud.middleName}    </h2>
                                    <h4 id="result-h3"> UP Mail </h4>
                                    <h3 > {stud.upMail}  </h3>
                                    <br></br>
                                    </li>
                                </div>
                                )}
                            </div>
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