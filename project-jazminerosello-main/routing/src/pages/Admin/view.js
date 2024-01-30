import React from "react";
import {useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Header from "../../assets/styles/Header.js";

const View = () => {
    const navigate = useNavigate();
    const [students, setStudent] = useState([]);
    const [sortStud, setSortStud] = useState(true);
    
    const [adviser, setAdviser] = useState();
    const[options, setOptions] = useState();

    useEffect(() => {
        fetch("http://localhost:3001/get-approvers")
          .then(response => response.json())
          .then(body => {
            setAdviser(body)
          })
      
          .catch(error  => {
            //alert("No Student/s Found!!")
          }) 
         
      });

    useEffect(() => {
        if(sortStud === true) {
            fetch('http://localhost:3001/get-student-name-asc')
            .then(response => response.json())
            .then(names => {
                setStudent(names);
            })
            
            .catch(error => {
              console.error("Error occurred while fetching sorted approvers:", error);
            });
        } else if(sortStud === false){
            fetch('http://localhost:3001/get-student-num-asc')
            .then(response => response.json())
            .then(nums => {
                setStudent(nums);
            })
            
            .catch(error => {
            console.error("Error occurred while fetching sorted approvers:", error);
            });
        }
    }, [sortStud])
        
       const fetchStudent = () => {
         fetch("http://localhost:3001/get-students")
        .then((response) => response.json())
        .then((data) => setStudent(data));
       }
       useEffect(fetchStudent, []);

       //update student
       const updateStudent = (stud) => {
        var adupmail = document.getElementById("adviser-options").value
        console.log(adupmail)

/*         if(adupmail === ""){
            alert("Field for adviser email cannot be empty")
            return
        }  */

         fetch('http://localhost:3001/assign-adviser-to-student', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            
            body: JSON.stringify({ studentNumber: stud.studentNumber, adviserupmail: adupmail }),
            
        })
        
            .then((response) => response.json())
            .then(fetchStudent)
            
            window.location.href= "mailto:" + stud.upMail + "?subject=Account Approved!&body=Welcome! Your request for account approval has been approved. Note that you can contact your adviser via the following email: " + adupmail + "%0D%0A%0D%0ALog into your account with the email and password you used to sign up. %0D%0A%0D%0AYour UP Mail is " + stud.upMail + "and your password is " + stud.password +"%0D%0A%0D%0ABest regards, %0D%0AADMIN"
       }
       

       
       const deleteStudentAccount = (code) => {
        fetch("http://localhost:3001/delete-student-account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ studentNumber: code }),
        })
            .then((response) => response.json())

            .then(fetchStudent);
        // refetch data
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

      const sortStudno = () => {
        setSortStud(true);
      }

      const sortStudname = () => {
        setSortStud(false);
      }

      


      return (
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
                        <button id="green" onClick={() => navigate(`/delete-approver`)}> View Approver </button><br/>
                        <div className="logout_button">
                            <button id="logout" onClick={() => navigate(`/adminLogIn`)}>Log Out</button>
                        </div>
                    </div>
                   
                </div>                   
                {/* <button onClick={() => navigate(`/search-approver`)}>search approver</button><br/><br></br> */}

                
            </div>

            <div className="approvers" id="approvers-main">
                
                <h1>Pending Signup Requests</h1>
                <div className="sort">
                    <button id="green" onClick={() => sortStudname()}>Sort by Student Name </button><br/>
                    <button id="green" onClick={() => sortStudno()}>Sort by Student Number </button><br/>
                </div>
            
                    {students.map((stud, i) =>
                        <div className="list-clearance"> 
                            <li key={i}>
                            <h2 className="signup-req">{stud.lastName}, {stud.firstName} {stud.middleName}</h2> <br></br>
                            <strong>STUDENT NUMBER: </strong> {stud.studentNumber} <br></br> 
                            <strong> UP MAIL: </strong> {stud.upMail}
                            <br></br> 
                            {/* Assign an adviser: <input type="text" name="adv" id={i} className="adv" required placeholder="example.up.edu.ph"/><br></br> */}
                            
                            <p> Assign an adviser: </p>
                            <select id= "adviser-options" >
                                {
                                    adviser.map((opt, i) => <option key={i}>{opt.upMail}</option>)
                                }
                            </select>

                            <div className="approver">
                                {/* <button id="green" onClick={() => updateStudent(stud.studentNumber, i)}>Assign</button> */}
                                {/*<a href={`mailto:${stud.upMail}?subject='Hello from Abstract!'&body='Just popped in to say hello'`}>Click to Send an Email</a> */}

                                <div className="sort"> 
                                
                                <button id="green" onClick={() =>updateStudent(stud)}>Approve Account</button>
                                
                                <a href={`mailto:${stud.upMail}?subject=Account Rejected&body=Unfortunately, your request for account approval has been rejected. After reviewing your account application, we have found that some details do not meet our criteria.%0D%0A%0D%0AThank you for your understanding. %0D%0A%0D%0ABest regards, %0D%0AADMIN`} >
                                    <button id="red" onClick={() =>deleteStudentAccount(stud.studentNumber)}>Reject Account</button>
                                </a>
                                </div>

                            </div>
                            </li>
                        </div>
                    )}

            </div>
        </div>
        </div>    
    )
    
}



export default View