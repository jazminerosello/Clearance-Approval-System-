import React from "react";
import Header from "../../assets/styles/Header.js"

class Createapprover extends React.Component{

  //post method
    handleAdd = () => {
        //get the elements using the ID
        var f = document.getElementById("fname").value
        var m = document.getElementById("mname").value
        var l = document.getElementById("lname").value
        // var s = document.getElementById("studno").value
        var up = document.getElementById("upMail").value;
        var p = document.getElementById("pwd").value;

        const upmail = '@up.edu.ph';

       if(f === null || f === ""){alert('Please fill all the fields!')}
       else if(m === null || m === ""){alert('Please fill all the fields!')}
       else if(l === null || l === ""){alert('Please fill all the fields!')}
    //    else if(s === null || s === ""){alert('Please fill all the fields!')}
       else if(up === null || up === ""){alert('Please fill all the fields!')}
       else if(p === null || p === ""){alert('Please fill all the fields!')}
       else if(up.includes(upmail) == false){alert("Please enter valid UP Mail!")}
       else{
           // Fetch the user credentials from the server
         fetch(`http://localhost:3001//check-credentials-for-sign-up?upMail=${encodeURIComponent(up)}`, {
          method: 'GET',
        })
          .then(response => response.json())
          .then(user => {
            console.log("Detected!", user);
            alert('Email is already exisitng, please use another one!');
          })
          .catch(error => {
               //fetch the add-subject in localhost:3001, the method is POST
            fetch('http://localhost:3001/add-user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ //convert the follwoing in json formation
                  firstName: f,
	                middleName: m,
	                lastName: l,
                  // accepted: 1,
	                // studentNumber: null,
                  userType: "Adviser",
	                upMail: up,
                  password: p,
                  application: [],
                  // adviser: null,

              })
            }).then(console.log());
          
          

              console.log("Successfully logged in!");
               alert("Successfully signed up!");
               window.location.reload()
            //   window.location.href = "http://localhost:3000/clearance"
           });
        }  
      }

    //   handleLogin = () => {
    //     window.location.href = "http://localhost:3000/studentLogin"
    //   }

    handleSearch = () => {

      const searchQuery = document.getElementById("searchthis").value;

      if(searchQuery == ""){
          alert("Search field cannot be empty.");
      } else {
          window.location.href = "http://localhost:3000/search?lastName=" + searchQuery
      }
      //window.location.href = "http://localhost:3000/search?lastName=${searchQuery}"
      //window.open(`http://localhost:3000/search?lastName=${searchQuery}`)
      
    };
    
    render(){
      return(
        <div className="home-page">
         <Header/>
        <div className="main">
            <div className="side-bar">
              <h3>Welcome,</h3>
              <h1>Admin!</h1>

              <div className="search_approver">                      
               
                <label>Enter approver's last name</label>
                      <input className="search_lname_input" id ="searchthis" type="text"></input>
                      <span></span>
                      
                      <button id="search" onClick={this.handleSearch}>Search</button><br/><br/>

                      <button id="green" onClick={() => window.location.href = "http://localhost:3000/delete-approver"}>View Approver</button>
                      <button id="red" onClick={() => window.location.href = "http://localhost:3000/viewApplication"}>Return</button><br/>
                
                <div className="manage_approver">
                  <div className="logout_button">
                  <button id="green" onClick={() => window.location.href = "http://localhost:3000"}>Home</button>
                  <button id="logout" onClick={() => window.location.href = "http://localhost:3000/adminLogIn"}>Log Out</button>
                </div>
              </div>
                       
              </div>
            </div>

            <div className="approvers" id="student-clearance">
              <div  className="create-approver" id="clearance-box">
              
                  {/* for forms */}
                  <h1>Create approver</h1>

                      <br></br> <br></br>
                      <input type="text" name="fname" id="fname" className="name" required/>
                      <h3 className="create-add">First Name: </h3>


                      <input type="text" name="mname" id="mname" className="name" required/>
                      <h3 className="create-add">Middle Name: </h3>

                      <input type="text" name="lname" id="lname" className="name" required/>
                      <h3 className="create-add">Last Name: </h3>
                  
                    {/* <label>Student Number: </label>
                    <input type="number" name="studno" id="studno" class="studno" required/><br></br> */}

                      <input type="text" name="upMail" id="upMail" className="name" required/>
                      <h3 className="create-add">UP Mail: </h3>
                    
                    <input type="Password" name="pwd" id="pwd" className="name" required/>
                    <h3 className="create-add">Password: </h3>

                    <br></br> <br></br> <br></br>
                    <button id="green" type="Sign Up" onClick={this.handleAdd}>Create approver</button> 
                    {/* <button type="Login" onClick={this.handleLogin}>Log In</button>   */}

              </div>                  
            </div>           
        </div>
        </div>
    )
    }
}

export default Createapprover;
