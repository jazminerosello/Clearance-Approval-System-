import React, { useState, useEffect } from "react";
import {useNavigate } from 'react-router-dom';
import queryString from "query-string";
import Header from "../../assets/styles/Header.js"


const Openapplication = () => {

    const navigate = useNavigate();
    const [appli, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
          try {
            const response = await fetch("http://localhost:3001/getStudentApplication?upMail="+queryString.parse(window.location.search).upMail, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ upMail: queryString.parse(window.location.search).upMail }),
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch applications');
            }
    
            const { applications } = await response.json();
            setApplications(applications);
          } catch (error) {
            console.error(error);
            // Handle the error or display an error message
          }
        };
    
        fetchApplications();
      }, []);

      const handlesubmitlink = () => {
        var index = 0;
        var check = 0;

      while(index<appli.length){
        // Assuming the student has only one application
        if (appli[index].status === 'Open' || appli[index].status === 'Pending') {
          check = 1;
          console.log('The application is open');
          break;
        }
        index++;
      }
      
      if(check === 1){
        alert('You still cannot open an application. You still have an open and pending application!');
        
      }else{
        navigate(`/clearance?upMail=`+queryString.parse(window.location.search).upMail)
      }

      }
      return (
        <div className="home-page">
          <Header/>
          <div className="content"> 
        <div className="wrapper" id="search">
            <div className="center">
                <h3>Welcome, Student!</h3>
                <h2> What would you like to do? </h2>
                <div className="approved-pending"> 
                  <div className="logout_button"> 
                    <button id="green" onClick={() => handlesubmitlink()}>Open application</button>
                    <button id="green" onClick={() => navigate(`/openApp?upMail=`+queryString.parse(window.location.search).upMail)}>View Applications</button>
                    <br></br> <br></br>
                    <button onClick={() => navigate(`/studentLogin`)}>Log Out</button>
                  </div>
              </div>

            </div>
        </div>
        </div>
        </div>
    )
    
}

export default Openapplication
