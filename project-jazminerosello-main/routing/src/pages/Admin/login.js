import React from "react";
import Header from "../../assets/styles/Header.js"


class ApproverLogin extends React.Component{
    
    handleLogin = () => {
        
        var up = document.getElementById("upMail").value;
        var p = document.getElementById("pwd").value;


        if(up === null || up === ""){alert('Please fill all the fields!')}
      
        else if(p === null || p === ""){alert('Please fill all the fields!')}
        else if(up!=="admin@up.edu.ph" && p!== "admin1234"){alert("Password or email is incorrect!")}
        else{
          window.location.href = 'http://localhost:3000/viewApplication';
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
            <button type="Login" onClick={this.handleLogin} className="signup_button">Log In</button>  
            {/* when submit button is clicked punta sa handleLogin */}

          
        </div>
        </div>
        </div>
        )
    }
}

export default ApproverLogin;