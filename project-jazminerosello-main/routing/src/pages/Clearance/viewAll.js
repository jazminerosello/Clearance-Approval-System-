import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../assets/styles/Header.js";

const ViewAllApplication = () => {
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [stepFilter, setStepFilter] = useState('');
  // const [dayFilter, setDayFilter] = useState('');
  // const [dateFilter, setDateFilter] = useState('')
  const [filteredApplications, setFilteredApplications] = useState([]);
  const navigate = useNavigate();

  const fetchApp = () => {
    fetch("http://localhost:3001/getAllApplication")
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
        setFilteredApplications(data);
      });
  }
  useEffect(fetchApp, []);

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    if (status === '') {
      setFilteredApplications(applications); // If no status is selected, show all applications
      window.location.reload()
    } else {
      const filtered = applications.filter((appli) => appli.status === status);
      setFilteredApplications(filtered);
    }

  };
  const handleAdviserFilter = async () => {
    // useEffect(() => {
      // const fetchApplications = async () => {
        try {
          const response = await fetch('http://localhost:3001/application-per-adviser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ upMail: document.getElementById('adviserupmail').value}),
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch applications');
          }
  
          const { applications } = await response.json();
          setFilteredApplications(applications);
        } catch (error) {
          console.error(error);
          // Handle the error or display an error message
        }
      // };
  
    //   fetchApplications();
    // }, []);
    
  };
  const handleDateFilter = () => {
    const day = parseInt(document.getElementById('dayfilter').value);
    const month = parseInt(document.getElementById('monthfilter').value);
    const year = parseInt(document.getElementById('yearfilter').value);
  
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      // Invalid date input
      return;
    }
  
    // setDayFilter(day);
  
    if (day === '' || month === '' || year === '') {
      setFilteredApplications(applications);
    } else {
      const filtered = applications.filter((appli) => {
        const submission = appli.studentsubmission.find((submission) => {
          const date = new Date(submission.date);
          return (
            date.getDate() === day &&
            date.getMonth() === month - 1 && // Month is zero-based in JavaScript Date object
            date.getFullYear() === year
          );
        });
        return submission !== undefined;
      });
      setFilteredApplications(filtered);
    }
  };
  
  const handleStepFilter = (step) => {
    setStepFilter(step);
    if (step === '') {
      setFilteredApplications(applications); // If no status is selected, show all applications
    } else {
      const filtered = applications.filter((appli) => appli.step === step);
      setFilteredApplications(filtered);
    }
  };

  return (
    <div className="home-page">
    <Header/>
    <div className="wrapper">
      <div className="main">
        <div className="side-bar"> 
        <h3>Welcome,</h3>
          <h1>Clearance <br></br>Officer!</h1>

          <div className="approved-pending"> 
              {/*              return remarks: 
                <input type="text" id="returnremark"></input> 
              */}
              {/* <input id ="searchthis" type="text"></input><button id="searchnum" onClick={() => handleSearch()}>search application by student number</button><br/>
              <input id ="searchthis" type="text"></input><button id="searchname" onClick={() => handleSearch()}>search application by student first name</button><br/> */}
              <label >Filter by Adviser (@up.edu.ph) </label>
              <input className="search_lname_input" id="adviserupmail" type="text"></input>
              <span></span>

              <button id="search" onClick={() => handleAdviserFilter()}>Search</button><br/><br/>
              <button id="green" onClick={() => handleStatusFilter('')}> Show all </button> 
              <button onClick={() => navigate('/cohomepage')}>Return</button>

              <div className="logout_button"> 
                  <button onClick={() => navigate(`/clearance-log-in`)}>Log Out</button>
              </div>

            </div>
        </div>

      <div className="approvers" id="view-clearance"> 
        <h1>Clearance Application</h1>
        <div className="clearance-filter"> 

          <div className="filter">
            Filter by Status 
            <br></br> 
              <div className="filter-btns"> 
                <button onClick={() => handleStatusFilter('Open')}>Open</button>
                <button onClick={() => handleStatusFilter('Pending')}>Pending</button>
                <button onClick={() => handleStatusFilter('Closed')}>Closed</button>
                <button onClick={() => handleStatusFilter('Cleared')}>Cleared</button>
              </div>
          </div>

          <div className="filter">
{/*             Filter by Adviser
            <br></br>
          
            <div className="filter-btns"> 
            <input type="text" id="adviserupmail" placeholder="example@up.edu.ph"></input>
              <button onClick={() => handleAdviserFilter()}>enter</button>
            </div> */}
          <div className="filter-all"> 
            <input className="filter-text" type="text" id="dayfilter" placeholder="day"></input>
            <input className="filter-text" type="text" id="monthfilter" placeholder="month"></input>

            <input className="filter-text" type="text" id="yearfilter" placeholder="year"></input>
          </div>
          <div className="sort"> 
            <button id="green" onClick={() => handleDateFilter()}>Filter by date</button>
          </div>

            
          </div>

          <div className="filter">
            Filter by Step <br></br>
            <div className="filter-btns"> 
              <button id="step" onClick={() => handleStepFilter(1)}>1-Adviser</button>
              <button id="step" onClick={() => handleStepFilter(2)}>2-Clearance Officer</button>
              {/* <button onClick={() => handleStepFilter(0)}>Pre-Adviser</button> */}
              {/* <button onClick={() => handleStatusFilter('Cleared')}>Cleared</button> */}   
            </div>

          </div>
        </div>

        <ol>
          {filteredApplications.map((appli, i) => (
            <div className="list-clearance">
            <li key={i}>
              Applicant Name: {appli.student.lastName}, {appli.student.firstName} {appli.student.middleName}<br></br>
              Applicant Student Number: {appli.student.studentNumber}<br></br>
              Applicant UP Mail: {appli.student.upMail} <br></br>
              Application ID: {appli._id} <br />
              Application Status: {appli.status} <br />
              Application Step: {appli.step}
              <ul>
                {appli.remarks.map((r) => (
                  <li key={r._id}>
                    <br></br>
                    <hr></hr>
                    Remark: {r.remark} <br></br>
                    Date where Remark was given: {r.date} <br></br>
                    Commented by: {r.cocommenter} <br></br>
                    Step Given: {r.stepgiven}
                    <hr></hr>
                  </li>
                ))}
              </ul>
              <ul>
                {appli.studentsubmission.map((submission) => (
                  <li key={submission._id}>
                      <br></br>
                    Github link: {submission.remarklink} <br></br>
                    Date Submitted: {submission.date} <br></br>
                    Step Given: {submission.stepgiven}
                    <br></br>
                    <br></br>
                  </li>
                ))}
              </ul>

            </li>
            </div>
          ))}
        </ol>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ViewAllApplication;
