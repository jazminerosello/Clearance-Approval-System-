import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../assets/styles/Header.js";
// import queryString from "query-string";

const Cohomepage = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('');
  const [Applications, setApplications] = useState([]);
  const [originalApplications, setOriginalApplications] = useState([]);
  // const [filteredApplications, setFilteredApplications] = useState([]);
//   const handleSearch = () => {
//     const searchQuery = document.getElementById("searchthis").value;
//     window.open(`http://localhost:3000/search?lastName=${searchQuery}`)
    
//   };

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
    setApplications(Applications);
  } else {
    const filtered = Applications.filter((appli) => {
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
const handleapprove = async (id) => {
  try {
    const response = await fetch('http://localhost:3001/co-approves', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: id }),
    });

    if (!response.ok) {
      throw new Error('Failed to approve application');
    }

    // Optional: You can handle the success response here if needed
console.log("yayapproved")
    // Fetch the updated list of applications
  //   await fetchApplications();
  } catch (error) {
    console.error(error);
    // Handle the error or display an error message
  }
  window.location.reload()
};



const handleStatusFilter = (status) => {
  setStatusFilter(status);
  if (status === '') {
    setApplications(originalApplications);
  } else {
    const filtered = originalApplications.filter((appli) => appli.status === status);
    setApplications(filtered);
  }
  window.location.reload();
};


  const handlereturn = (id, i) => {
    const currentdate = new Date();
    var f = document.getElementById(i).value
    if (f === null || f === "") {
      alert('Please fill all the fields!');
    } else {
      fetch('http://localhost:3001/add-return-remark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          applicationid: id, 
          // stepgiven: 1, 
          remarkgivenstring: f,
          stepgiven: 2,
          date: currentdate,
          commenterid: "Clearance Officer",//{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
          
          
          // upMail: queryString.parse(window.location.search).upMail
        })
      })
      .then(response => {
        console.log('Response:', response);
        return response.json();
      })
      .then(data => {
        console.log('error:', data);
        // setObjectId(data.id);
        //alert(data.message);
        window.location.reload()
      })
      .catch(error => {
        console.log('Error:', error);
      });
    }
  }
        
  const fetchApplications = () => {
    fetch("http://localhost:3001/get-pending-applications-co")
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
        setOriginalApplications(data);
      });
  };

  useEffect(fetchApplications, []);


       
      const handleAdviserFilter = async () => {
        // useEffect(() => {
          // const fetchApplications = async () => {
            try {
              const response = await fetch('http://localhost:3001/pending-application-per-adviser', {
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
              setApplications(applications);
            } catch (error) {
              console.error(error);
              alert("That adviser does not exist!")
              // Handle the error or display an error message
            }
          // };
      
        //   fetchApplications();
        // }, []);
        
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
              <input className="search_lname_input" id ="adviserupmail" type="text"></input>
              <span></span>

              <button id="search" onClick={() => handleAdviserFilter()}>Search</button><br/><br/>
              <button id="green" onClick={() => handleStatusFilter('')}> Show all </button>
              <button id="green" onClick={() => navigate('/view-all-applications')}>View Applications</button>

              <div className="logout_button"> 
                  <button onClick={() => navigate(`/clearance-log-in`)}>Log Out</button>
              </div>

            </div>
        </div>


      {/* return remarks:
      <input type="text" id="newName"></input> */}
      {/* <input id ="searchthis" type="text"></input><button id="searchnum" onClick={() => handleSearch()}>search application by Applications number</button><br/>
      <input id ="searchthis" type="text"></input><button id="searchname" onClick={() => handleSearch()}>search application by Applications first name</button><br/> */}
      <div className="approvers" id="approvers-main">
      <h1>Pending Application</h1>

      <div className="filter-date"> 
            <input className="filter-text" type="text" id="dayfilter" placeholder="day"></input>
            <input className="filter-text" type="text" id="monthfilter" placeholder="month"></input>

            <input className="filter-text" type="text" id="yearfilter" placeholder="year"></input>
          </div>
          <div className="sort"> 
            <button id="green" onClick={() => handleDateFilter()}>Filter by date</button>
      </div>



    <ol>
    {Applications.map((appli, i) => (
      <div className="list"> 
        <li key={i}>
        Application step: {appli.step} <br />
        Application ID: {appli._id} <br />
        Student obj id: {appli.student._id} <br />
        Student firstname: {appli.student.firstName} <br /> <br></br>
        Application Status: <strong>{appli.status} </strong> <br />
        Submissions:
        <ul>
            {appli.studentsubmission.map((submission, j) => (
            <li key={j}>
                Remark Link: {submission.remarklink} <br />
                Date: {submission.date} <br />
                Step Given: {submission.stepgiven}
                
            </li>
            ))} 
        </ul>
              <br></br>
            <strong> REMARKS:  </strong>
            <input type="text" id={i}></input>
          <div className="sort"> 
            <button id="green" className="adviser-btn" onClick={() => handleapprove(appli._id)} >Approve</button>
           
            <button id="red" className="adviser-btn" onClick={() => handlereturn(appli._id, i)} >Return with remarks</button>
          </div>
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

export default Cohomepage;
