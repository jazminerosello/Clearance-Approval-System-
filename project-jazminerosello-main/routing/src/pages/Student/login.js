import React from "react";
import Header from "../../assets/styles/Header.js"

class StudentLogin extends React.Component{
    
   handleLogin = () => {
  var up = document.getElementById("upMail").value;
  var p = document.getElementById("pwd").value;
  var utype = "Student";

  if (up === null || up === "") {
    alert('Please fill all the fields!');
  } else if (p === null || p === "") {
    alert('Please fill all the fields!');
  } else {
    // Fetch the user credentials from the server
    fetch(`http://localhost:3001/check-credentials-for-log-in?upMail=${encodeURIComponent(up)}&password=${encodeURIComponent(p)}&userType=${encodeURIComponent(utype)}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      const { user, email } = data;
      // if (data.success) {
        // Fetch adviser information
        fetch(`http://localhost:3001/check-if-student-has-adviser?upMail=${encodeURIComponent(up)}`, {
          method: 'GET',
        })
        .then(response => response.json())
        .then(adviserData => {
          if (adviserData.success) {
            console.log("Successfully logged in!", user, email);
            alert('Successfully logged in');
            window.location.href = "http://localhost:3000/openapplication?upMail=" + up;
          } else {
            window.location.href = "http://localhost:3000/wait-adviser"
            //alert('Student does not have an adviser.');
          }
          // window.location.href = "http://localhost:3000/openapplication?upMail=" + up;
        })
        .catch(error => {
          console.error("Error occurred while checking adviser information:", error);
          alert("An error occurred while checking adviser information.");
        });
      // } else {
      //   alert("Invalid credentials. Please check your email and password.");
      // }
    })
    .catch(error => {
      console.error("Error occurred during login:", error);
      alert("An error occurred during login.");
    });
  }
}

    
  render(){
    return(
      <div className="home-page">
          <Header/>
          <div className="content"> 
           
        <div className="center">
          <form className="text_field">
              {/* for forms */}
              <h1>Log In</h1>
              <div className="txt_field">
                <input type="Email" name="upMail" id="upMail" className="upMail" required/><br></br>
                <span></span>
                <label>UP Mail: </label>
              </div>

              <div className="txt_field">
                <input type="Password" name="pwd" id="pwd" className="pwd" required/><br></br>
                <label>Password: </label>
                <span></span>
              </div>
          </form>
            
            {/* <button type="Sign Up" onClick={this.handleLogin}>Login Subject</button> */}
            <button type="Login" onClick={this.handleLogin} className="signup_button">Log In</button>  
            
            {/* when submit button is clicked punta sa handleLogin */}
            <div className="login_link">
              <a>Create an account:  </a><a href="/signUp">Sign up</a>  
            </div>
            
        </div>
        </div>
        </div>
    )
  }
}

export default StudentLogin;