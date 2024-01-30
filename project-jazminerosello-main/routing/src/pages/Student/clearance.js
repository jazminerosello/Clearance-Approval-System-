import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import queryString from "query-string";
import Header from "../../assets/styles/Header.js"

const Clearance = () => {

  const navigate = useNavigate();
  const currentdate = new Date();
  const [students, setStudent] = useState([]);
  const [adviser, setAdviser] = useState([]);
  const adviserMail = queryString.parse(window.location.search).upMail;

  useEffect(() => {
    fetch("http://localhost:3001/search-student-email?upMail="+ adviserMail)
      .then(response => response.json())
      .then(body => {
        setStudent(body)
        //adviserid = body.adviser
        //console.log(adviserid)
        
      })

      .catch(error  => {
        //alert("No Student/s Found!!")
      }) 
     
});

  const handlesubmitlink = () => {
    var f = document.getElementById("githublink").value;
    
    if (f === null || f === "") {
      alert('Please fill all the fields!');
    } else {
      
        fetch('http://localhost:3001/add-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          status: "Open",
          step: 1,
          studentsubmission: {
            remarklink: f,
            date: currentdate,
            stepgiven: 1
          },
          upMail: queryString.parse(window.location.search).upMail
        })
      })
      .then(response => {
        console.log('Response:', response);
        return response.json();
      })
      .then(data => {
        console.log('Data:', data);
       
        if(alert("Successfully Submitted")){}
        else window.history.back()
      })
      .catch(error => {
        console.log('Error:', error);
      });
    }
  }
  
  return (
    <div className="home-page">
    <Header/>
    <div className="wrapper">
      <div className="main"> 
        <div className="side-bar"> 
          <h3>Welcome,</h3>
          <h1>{students.firstName}!</h1>
          <div className="student-details"> 
            <h4> Student Number: </h4>
            <h3 className="student-sidebar"> {students.studentNumber} </h3>

{/*             <h4> Adviser: </h4>
            <h3 className="student-sidebar"> {adviser.firstName} {adviser.lastName} </h3> */}
          </div>
          
          
          <div className="approved-pending"> 
            <button id="green" onClick={() => navigate(`/openApp?upMail=`+queryString.parse(window.location.search).upMail)}>View Applications</button>
            <button onClick={() => navigate(-1)}>Return </button><br></br>

            <div className="logout_button" id="with-home"> 
                <button onClick={() => navigate(`/studentLogin`)}>Log Out</button>
            </div>
          </div>
        </div>

        <div className="approvers" id="student-clearance"> 
          <div className="create-approver" id="clearance-box"> 
            <h1>New Clearance Application</h1>
              <div className="box">

              <label className="search_lname_input">Link to github: </label>
                  <input type="text" name="githublink" id="githublink" className="githublink" required/><br></br>
                  
                  <button id="green-clearance" onClick={() => handlesubmitlink()}>Submit to Adviser</button><br></br><br></br>
              
            </div>
          </div>
        </div>
        
      </div>
    </div>
    </div>
  )
}

export default Clearance;
