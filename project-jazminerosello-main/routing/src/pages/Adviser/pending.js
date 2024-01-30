import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import queryString from "query-string";
import Header from "../../assets/styles/Header.js"


const Pending = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('');
  const [Applications, setApplications] = useState([]);
  const [originalApplications, setOriginalApplications] = useState([]);

  //console.log(document.referrer);
  //console.log(queryString.parse(window.location.search).upMail)

//mark
const [adviser, setAdviser] = useState([]);
const adviserMail = queryString.parse(window.location.search).upMail;

useEffect(() => {
  fetch("http://localhost:3001/search-adviser-email?upMail="+ adviserMail)
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
const handleapprove = async (id) => {
    try {
      const response = await fetch('http://localhost:3001/adviser-approves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to approve application');
      }
  
      // Optional: You can handle the success response here if needed
  console.log("yayapproved")
  window.location.reload()
      // Fetch the updated list of applications
    //   await fetchApplications();
    } catch (error) {
      console.error(error);
      // Handle the error or display an error message
    }
  };
  

    const handlereturn = (id) => {
      const currentdate = new Date();
      var f = document.getElementById("returnremark").value
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
            stepgiven: 1,
            date: currentdate,
            commenterid: queryString.parse(window.location.search).upMail,//{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
            
            
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
          
        })
        .catch(error => {
          console.log('Error:', error);
        });
      }
      //window.location.reload()
    }
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:3001/get-applications-adviser', {
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

  

  return (
    <div className="home-page">
    <Header/>
    <div className="wrapper">
      <div className="main">

        <div className="side-bar"> 
          <h3>Welcome,</h3>
          <h1>{adviser.firstName}!</h1>

            <div className="approved-pending"> 
              {/*              return remarks: 
                <input type="text" id="returnremark"></input> 
              */}
              {/* <input id ="searchthis" type="text"></input><button id="searchnum" onClick={() => handleSearch()}>search application by student number</button><br/>
              <input id ="searchthis" type="text"></input><button id="searchname" onClick={() => handleSearch()}>search application by student first name</button><br/> */}
              <label>Enter Last Name/ Student Number</label>
              <input className="search_lname_input" id ="searchthis" type="text"></input>
              <span></span>

              <button id="search-adviser" onClick={() => handleSearch('name')}>Search by Name</button>
              <button id="search-adviser" onClick={() => handleSearch('number')}>Search by Student Number</button><br/><br/>
              <button id="green" onClick={() => handleStatusFilter('')}> Show all </button>
              <button id="green" onClick={() => navigate(`/view-all?upMail=`+queryString.parse(window.location.search).upMail)}> View Applications </button> 

              <div className="logout_button"> 
                  <button onClick={() => navigate(`/approverLogIn`)}>Log Out</button>
              </div>

            </div>

        </div>

        <div className="approvers" id="approvers-main">
          {/* container for the list of pending applications */}
          <h1>Pending Application</h1>

          <div className="filter-date"> 
            <input className="filter-text" type="text" id="dayfilter" placeholder="dd"></input>
            <input className="filter-text" type="text" id="monthfilter" placeholder="mm"></input>

            <input className="filter-text" type="text" id="yearfilter" placeholder="yyyy"></input>
          </div>
          <div className="sort"> 
            <button id="green" onClick={() => handleDateFilter()}>Filter by date</button>
          </div>
          
          
          <ul>
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
                <br></br>
                {application.studentsubmission.map((submission) => (
                  <li key={submission._id}>submission(githublink): {submission.remarklink} 
                  
   {/*                  <button onClick={() => handleapprove(application._id)} className="edit">approve</button>
                    <button onClick={() => handlereturn(application._id)} className="Delete Approver Account">return with remarks</button> */}
                  </li>
                  
                ))}
              </ul>
              <br></br>
            <strong> REMARKS:  </strong>
            <input type="text" id="returnremark"></input>
              <div className="sort"> 
            <button id="green" className="adviser-btn" onClick={() => handleapprove(application._id)} >Approve</button>
            <button id="red" className="adviser-btn" onClick={() => handlereturn(application._id)} >Return with remarks</button>
          </div>
              </li>
              </div>
            ))}
          </ul>
        </div>
      </div>

      </div>
    </div>
  );
};

export default Pending;