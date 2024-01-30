import React from "react";
import Header from "../../assets/styles/Header.js"

export default function ApproverLogin(){

  function handleLogin() {
    var utype = "Adviser";
    var up = document.getElementById("upMail").value;
    var p = document.getElementById("pwd").value;
    


    if(up === null || up === ""){alert('Please fill all the fields!')}
  
    else if(p === null || p === ""){alert('Please fill all the fields!')}
    
    
    else{

  
    // Fetch the user credentials from the server
    fetch(`http://localhost:3001/check-credentials-for-log-in?upMail=${encodeURIComponent(up)}&password=${encodeURIComponent(p)}&userType=${encodeURIComponent(utype)}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(user => {
          console.log("Successfully logged in!", user);
          alert('Successfully logged in');
          window.location.href = "http://localhost:3000/pending?upMail="+up;
          
      })
      .catch(error => {
        // console.error("Error occurred during login:", error);
        alert("Invalid credentials. Please check your email and password.");
      });}
  }

  return(
    <div className="home-page">
          <Header/>
          <div className="content"> 
    <div className="center">

      <form className="text_field">
        {/* for forms */}

        <h1>Log In</h1>

        <div className="txt_field">
          <input type="Email" name="upMail" id="upMail" class="upMail" required/><br></br>
          <span></span>
          <label>UP Mail: </label>
        </div>

        <div className="txt_field">
          <input type="Password" name="pwd" id="pwd" class="pwd" required/><br></br>
          <label>Password: </label>
          <span></span>
        </div>

      </form>
            
      {/* <button type="Sign Up" onClick={this.handleLogin}>Login Subject</button> */}
      <button type="Login" onClick={() => handleLogin()} className="signup_button">Log In</button>  
      {/* when submit button is clicked punta sa handleLogin */}      

    </div>
    </div></div>
  )
}
