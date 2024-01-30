import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import queryString from "query-string";
import Header from "../../assets/styles/Header.js"

const Pending = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('');
  const [Applications, setApplications] = useState([]);
  const [originalApplications, setOriginalApplications] = useState([]);

  const handleStatusFilter = (status) => {
    window.location.reload();
    setStatusFilter(status);
    if (status === '') {
      setApplications(originalApplications);
    } else {
      const filtered = originalApplications.filter((appli) => appli.status === status);
      setApplications(filtered);
    }
 
  };

  const handleDateFilter = () => {
    const day = parseInt(document.getElementById('dayfilter').value);
    const month = parseInt(document.getElementById('monthfilter').value);
    const year = parseInt(document.getElementById('yearfilter').value);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      // Invalid date input
      return;
    }

    if (day === '' || month === '' || year === '') {
      setApplications(originalApplications);
    } else {
      const filtered = originalApplications.filter((appli) => {
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
      setApplications(filtered);
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:3001/application-per-adviser', {
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
        setOriginalApplications(applications);
      } catch (error) {
        console.error(error);
        // Handle the error or display an error message
      }
    };

    fetchApplications();
  }, []);

  const handleSearch = async(option) => {

    const searchQuery = document.getElementById("searchthis").value;
    let isnum = /^\d+$/.test(searchQuery);
  
    var adviserId;
  
    const adviserMail = queryString.parse(window.location.search).upMail;
    console.log(adviserMail)
  
    if(searchQuery == ""){
        alert("Search field cannot be empty.");
    } else {
  
      fetch('http://localhost:3001/get-approversOne?upMail=' + adviserMail)
      .then(res => res.json())
      .then(data => {
        adviserId = data;
      })
      .then(() => {
        if(option == 'name') {
          window.location.href = "http://localhost:3000/search-student?lastName=" + searchQuery + "&adviser=" + adviserId
        } else{
          if(searchQuery.length != 9 || isnum == false) {
            alert("Please enter valid student number!")
          } else {
          window.location.href = "http://localhost:3000/search-student-number?studentNumber=" + searchQuery + "&adviser=" + adviserId
          }
        }
        //console.log(adviserId);
  
      });
  
    }  
  };

  return (
    <div className="home-page">
    <Header/>
    <div className="wrapper">
      <div className="main">
      <div className="side-bar"> 
          <h3>Welcome,</h3>
          <h1>Adviser!</h1>
          
          <div className="approved-pending"> 

          <label>Enter Last Name/ Student Number</label>
              <input className="search_lname_input" id ="searchthis" type="text"></input>
              <span></span>

              <button id="search-adviser" onClick={() => handleSearch('name')}>Search by Name</button>
              <button id="search-adviser" onClick={() => handleSearch('number')}>Search by Student Number</button><br/><br/>
              <button id="green" onClick={() => handleStatusFilter('')}> Show all </button>
              <button onClick={() => navigate(-1)}> Return </button> 
            <div className="logout_button"> 
                    <button onClick={() => navigate(`/approverLogIn`)}>Log Out</button>
            </div>
          </div>
      </div>

      <div className="approvers" id="approvers-main">
        <h1>All Pending Applications</h1>
        <div className="filter-date"> 
        <input className="filter-text" type="text" id="dayfilter" placeholder="d"></input>
        <input className="filter-text" type="text" id="monthfilter" placeholder="m"></input>

        <input className="filter-text" type="text" id="yearfilter" placeholder="yyyy"></input>
      </div>
        <div className="sort"> 
          <button id="green" onClick={() => handleDateFilter()}>Filter by date</button>
        </div>
      
        {Applications.map((application) => (
          <div className="list"> 
          <li key={application._id}>
            <h2> {application.student.lastName}, {application.student.firstName} {application.student.middleName} </h2><br></br>
             Student Number: {application.student.studentNumber}<br></br>
             UP Mail: {application.student.upMail} <br></br> <br></br>
             Status: <strong>{application.status} </strong><br/>
             Id: {application._id}<br/>
             Step: {application.step}<br/>

            <ul>
              {application.remarks.map((r) => (
                <li key={r._id}>
                  <hr></hr>
                  <strong> REMARK:</strong> {r.remark} <br></br>
                  Date where Remark was given: {r.date} <br></br>
                  Commented by: {r.cocommenter} <br></br>
                  Step Given: {r.stepgiven}
                  <hr></hr>
                </li>
              ))}
            </ul>
            <ul>
              {application.studentsubmission.map((submission) => (
                <li key={submission._id}>
                  Github link: {submission.remarklink} <br></br>
                  Date Submitted: {submission.date} <br></br>
                  Step Given: {submission.stepgiven}
                </li>
              ))}
            </ul>
          </li>
          </div>
        ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Pending;
