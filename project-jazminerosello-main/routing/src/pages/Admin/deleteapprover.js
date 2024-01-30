import React from "react";
import { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import Header from "../../assets/styles/Header.js"


export default function DeleteApprover() {
  const navigate = useNavigate();
  const [approvers, setApprovers] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
    // const [ approvers, setApprovers ] = useState([]);
    const handleascending = () => {
      setSortAscending(true);
    };
    const handledescending = () => {
      setSortAscending(false);
    };
    
    // useEffect(() => {
    //     fetch('http://localhost:3001/get-approvers')
    //       .then(response => response.json())
    //       .then(body => {
    //         setApprovers(body);
    //       });
    // });
    useEffect(() => {
      if (sortAscending===true) {
        fetch('http://localhost:3001/get-approvers-alphabetical')
          .then(response => response.json())
          .then(sortedApprovers => {
            setApprovers(sortedApprovers);
          })
          .catch(error => {
            console.error("Error occurred while fetching sorted approvers:", error);
          });
      } else if (sortAscending===false){
        fetch('http://localhost:3001/get-approvers-alphabetical-descending')
          .then(response => response.json())
          .then(sortedApprovers => {
            setApprovers(sortedApprovers);
          })
          .catch(error => {
            console.error("Error occurred while fetching approvers:", error);
          });
      }
      //  else {
      //   fetch('http://localhost:3001/get-approvers')
      //     .then(response => response.json())
      //     .then(body => {
      //       setApprovers(body);
      //     })
      //     .catch(error => {
      //       console.error("Error occurred while fetching approvers:", error);
      //     });
      // }
    }, [sortAscending]);
    
    const handleDelete = (approverupMail) => {
        fetch('http://localhost:3001/delete-approver', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // code: document.getElementById("code").value,
            upMail: approverupMail,
            
          })
        })
        .then(response => {
            // Handle the response or update the Approvers list if needed
            if (response.ok) {
              // Display a success message or perform other actions
              console.log("Approver deleted successfully");
              setApprovers(prevApprovers => prevApprovers.filter(approver => approver.upMail !== approverupMail));
              // Update the Approvers list if needed
              // You can re-fetch the Approvers or remove the deleted Approver from the local list
            } else {
              // Display an error message or handle the failure case
              console.error("Failed to delete approver");
            }
          })
          .catch(error => {
            // Handle the error case
            console.error("Error occurred while deleting approver:", error);
          });
        //   .then(console.log);
          
      };
      const handleEdit = (approverupMail, index) => {
            // code: document.getElementById("code").value,
        const newName=document.getElementById(index).value;
        const updatedApprover = {
          upMail: approverupMail,
          newName: newName,
        };
      
        fetch('http://localhost:3001/edit-approver', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedApprover)
        })
          .then(response => {
            if (response.ok) {
              console.log("Approver edited successfully");
              // Update the state with the edited data
              setApprovers(prevApprovers => {
                const updatedApprovers = prevApprovers.map(approver => {
                  if (approver.upMail === updatedApprover.upMail) {
                    // Update the firstName property
                    return { ...approver, firstName: updatedApprover.newName };
                  }
                  return approver;
                });
                return updatedApprovers;
              });
            } else {
              console.error("Failed to edit approver");
            }
          })
          .catch(error => {
            console.error("Error occurred while editing approver:", error);
          });
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
      


    return(
      <div className="home-page">
        <Header/>
        <div className="wrapper">
           
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

                      <button id="green" onClick={() => navigate(`/create-approver`)}>Create Approver</button>                  
                      <button  onClick={() => navigate(`/viewApplication`)}>Return</button>

                        <div className="manage_approver">
                            <div className="logout_button">
                            <button id="green" onClick={() => navigate(`/`)}>Home</button>
                            <button id="logout" onClick={() => navigate(`/adminLogIn`)}>Log Out</button>
                        </div>
                        </div>
                       
                    </div>
            </div>
            <div className="approvers" id="approvers-main">
              <h1>Approvers</h1>
              <div className="sort">
                <button id="green" onClick={() => handleascending()} className="ascending"> Sort Alphabetical Ascending</button>
                <button id="green" onClick={() => handledescending()} className="descending"> Sort Alphabetical Descending</button>
                {/* <p  style={{ display: 'inline' }}>Search: </p> */}
              </div>
              <ol>
                  {approvers.map((approver, index) => (
                    <div className="list-clearance"> 
                      <li key={index}>
                      <h2 className="signup-req">{approver.firstName} {approver.lastName}</h2> <br></br>
                      <strong> UP MAIL: </strong>{approver.upMail} 
                      {/* Edit Name of Approver: <input type="text" id={index}></input> */}
                      {/* <button onClick={() => handleEdit(approver.upMail, index)} className="edit">Edit</button> <br></br> */}
                      <br></br> <br></br>
                      <div className="sort"> 
                        <button id="green-btn" onClick={() => window.location.href = "http://localhost:3000/editApprover?upMail=" + approver.upMail} className="approver-btn">Edit</button> 
                        <button id={approver.upMail} onClick={() => handleDelete(approver.upMail)} className="approver-btn">Delete</button> 
                      </div>
                      
                      </li>
                      </div>
                  ))}
              </ol>
             {/* { this.state.id } */}
             </div>
          </div> 
        </div>
        </div>
    );
}