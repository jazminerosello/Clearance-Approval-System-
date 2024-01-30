import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import queryString from "query-string";
import { jsPDF } from "jspdf";
import moment from 'moment';
import Header from "../../assets/styles/Header.js"




const ViewClearApplication = () => {
    const [applications, setApplications] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [stepFilter, setStepFilter] = useState('');
    const [adviser, setAdviser] = useState('');
    // const [dayFilter, setDayFilter] = useState('');
    // const [dateFilter, setDateFilter] = useState('')
    const [filteredApplications, setFilteredApplications] = useState([]);
    const navigate = useNavigate();
    // const date = new Date();
    const date = moment().format('MMMM Do, YYYY');

  
    const fetchApp = () => {
      fetch("http://localhost:3001/getAllApplication")
        .then((response) => response.json())
        .then((data) => {
          setApplications(data);
          setFilteredApplications(data);
        });

        


    }
    useEffect(fetchApp, []);

    const fetchAdviser= () => {
      fetch("http://localhost:3001/get-adviser?upMail=" + queryString.parse(window.location.search).upMail)
        .then((response) => response.json())
        .then((data) => {
          setAdviser(data)
          
        });
    }
    useEffect(fetchAdviser, []);
  

    // const fetchAdviser 🙁) => {
    //     fetch("http://localhost:3001/getAdviser?UpMail="+ queryString.parse(window.location.search).upMail)
    //       .then((response) => response.json())
    //       .then((data) => {
    //     setAdviser(data);
    // });
    // try {
    //   const response = fetch('http://localhost:3001/get-adviser', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ upMail: queryString.parse(window.location.search).upMail }),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to fetch');
    //   }

    //   const { adv } = response.json();
    //   setAdviser(adv)
    // } catch (error) {
    //   console.log(error);
    //   // Handle the error or display an error message
    // }
  
    //   }
    //   useEffect(fetchAdviser);

    const handleStatusFilter = () => {
        setStatusFilter('Cleared');
        
          const filtered = applications.filter((appli) => appli.status === 'Cleared');
          setFilteredApplications(filtered);
        
        // window.location.reload()
    };
    useEffect(handleStatusFilter)

      
    const generatePDF = () => {
        var doc = new jsPDF();
	
        // Source HTMLElement or a string containing HTML.
        var elementHTML = document.querySelector("#pdf");

        doc.html(elementHTML, {
            callback: function(doc) {
                // Save the PDF
                doc.save('Clearance_report.pdf');
            },
            x: 15,
            y: 15,
            width: 170, //target width in the PDF document
            windowWidth: 650 //window width in CSS pixels
        });
    };

    const printPDF = () => {
      var doc = new jsPDF();

      // Source HTMLElement or a string containing HTML.
      var elementHTML = document.querySelector("#pdf");

      doc.html(elementHTML, {
          callback: function(doc) {
              // Print the PDF
            
              doc.autoPrint();
              doc.output('dataurlnewwindow');
          },
          // x: 15,
          // y: 15,
          width: 170, //target width in the PDF document
          windowWidth: 650 //window width in CSS pixels
      });
  };

  const viewPDF = () => {
    var doc = new jsPDF();

    // Source HTMLElement or a string containing HTML.
    var elementHTML = document.querySelector("#pdf");

    doc.html(elementHTML, {
        callback: function(doc) {
            // View the PDF
          
            
            doc.output('dataurlnewwindow');
        },
        // x: 15,
        // y: 15,
        width: 170, //target width in the PDF document
        windowWidth: 650 //window width in CSS pixels
    });
};

    const [students, setStudent] = useState([]);
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
          <button id="red" onClick={() => navigate(`/openApp?upMail=`+queryString.parse(window.location.search).upMail)}>Return </button><br></br>
          <div className="logout_button"> 
              <button id="green" onClick={() => navigate("/")}>Home</button>
              <button onClick={() => navigate("/studentLogin")}>Log Out</button>
          </div>
        </div>

      </div>

      <div className="approvers" id="view-clearance"> 
        <h1>Clearance Application</h1>

        <ol className="list">
          {filteredApplications.map((appli, i) => (
            <div className="list" id="list">
            <li key={i} className="details">
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
              <hr></hr> 
              <div className="pdf">
              <div class="page" id="pdf">
                <div class="header">
                    <p id="uni">University of the Philippines Los Banos</p>
                    <p id="dept">College of Arts and Sciences</p>
                    <p id="college">Institute of Computer Science</p>
                </div>
                <div class="content-pdf">
                    <br/><br/>
                    <p>{date}</p><br/>
                    <p>
                        This document certifies that {appli.student.lastName}, {appli.student.firstName} {appli.student.middleName} with Student Number, {appli.student.studentNumber} has satisfied the clearance requirements of the institute
                    </p>
                    <br/>
                    <br/>
                    <p>Verified :</p>
                    
                    <br/>
                   
                    <p>Academic Adviser: {adviser.adviser.firstName} {adviser.adviser.lastName}</p>
                    <p>Clearance Officer: Carl Angcana{}</p>
                      
                   
                </div>
                </div>
                
            </div>
              <div className="pdf-btn">
              <button id="green" className="download-btn" onClick={generatePDF}>Download</button>
              <button id="green" className="download-btn" onClick={printPDF}>Print</button>
              <button id="green" className="download-btn" onClick={viewPDF}>View</button>
              </div>
            </li>
            </div>
          ))}
        </ol>
        </div>
      </div>
  </div>
  </div>
  </div>
);
};

export default ViewClearApplication;