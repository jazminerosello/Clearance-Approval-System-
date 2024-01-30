import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import queryString from "query-string";
import Header from "../../assets/styles/Header.js"


const ViewApplication = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const currentdate = new Date();
  const [objectId, setObjectId] = useState(1);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:3001/getStudentApplication?upMail=" + queryString.parse(window.location.search).upMail, {
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
        applications.forEach((appli) => {
          setObjectId(appli._id);
        });
       
      } catch (error) {
        console.error(error);
        // Handle the error or display an error message
      }
    };

    fetchApplications();
  }, []);

  const handleleaveremark = (id) => {
    var f = document.getElementById("leaveremarkinput").value;

    
    if (f === null || f === "") {
      alert('Please fill all the fields!');
    } else {
      
        fetch('http://localhost:3001/add-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          // status: "Pending",
          // step: 2,
          studentsubmission1: {
            remarklink: f,
            date: currentdate,
            stepgiven: 2
          },
          id: id,
          // upMail: queryString.parse(window.location.search).upMail
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
  const handlecloseapplication = () => {
    fetch('http://localhost:3001/close-application', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: objectId }),
    })
    .then((response) => response.json())
    .catch(error => {
      console.log('Error:', error);
    });
    window.location.reload();
  }

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

  return (
      <div className="home-page">
        <Header/>
      <div>
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
          <button id="green" onClick={() => navigate(`/openapplication?upMail=`+queryString.parse(window.location.search).upMail)}>Return </button>
          <button onClick={() => navigate(`/viewClearApplication?upMail=`+queryString.parse(window.location.search).upMail)}>Cleared </button>
          <div className="logout_button"> 
              <button id="green" onClick={() => navigate(`/`)}>Home</button>
              <button onClick={() => navigate(`/studentLogin`)}>Log Out</button>
            </div>
          </div>

        </div>

        <div className="approvers" id="view-clearance"> 
          <h1>Clearance Application</h1>
          {applications.length > 0 ? (
            <ol className="list">
              {applications.map((appli, i) => (
                <div className="list" key={i}>
                  <li className="details">
                    Application ID: {appli._id} <br />
                    Application Status: {appli.status} <br />
                    Application Step: {appli.step}
                    <ul>
                      {appli.remarks.map((r) => (
                        <li key={r._id}>
                          <br></br>
                          <hr></hr>
                          <strong>Remark:</strong> {r.remark} <br></br>
                          Date when Remark was given: {r.date} <br></br>
                          Commented by: {r.cocommenter} <br></br>
                          Step Given: {r.stepgiven}
                          {r.cocommenter && (
                            <div>
                              <input id="leaveremarkinput" type="text" placeholder="Leave a remark" />
                              <button id="leaveremarkbutton" onClick={() => handleleaveremark(appli._id)}>Resubmit Application</button>
                            </div>
                          )}
                          <hr></hr>
                        </li>
                      ))}
                    </ul>
                    <ul>
                      {appli.studentsubmission.map((submission) => (
                        <li key={submission._id}>
                          <br></br>
                          Github link: {submission.remarklink} <br></br>
                          Date Submitted: {submission.date}
                          <br></br>
                          <br></br>
                        </li>
                      ))}
                    </ul>
                    {appli.status === 'Open' || appli.status === 'Pending' ? (
                      <div className="sort"> 
                        <button id="green" onClick={() => handlecloseapplication()}>Close Application</button>
                      </div>
                    ) : null}
                  </li>
                </div>
              ))}
            </ol>
          ) : (
            <p>No application</p>
          )}
        </div>
      </div>
      </div>
      </div>
    
  );
};

export default ViewApplication;
