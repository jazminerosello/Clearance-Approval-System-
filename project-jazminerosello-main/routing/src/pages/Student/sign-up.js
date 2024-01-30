import React from "react";
import Header from "../../assets/styles/Header.js"


class Add extends React.Component{

  //post method
    handleAdd = () => {
        //get the elements using the ID
        var f = document.getElementById("fname").value
        var m = document.getElementById("mname").value
        var l = document.getElementById("lname").value
        var s = document.getElementById("studno").value
        var up = document.getElementById("upMail").value;
        var p = document.getElementById("pwd").value;

        let isnum = /^\d+$/.test(s);
        const upmail = '@up.edu.ph';
       

       if(f === null || f === ""){alert('Please fill all the fields!')}
       else if(m === null || m === ""){alert('Please fill all the fields!')}
       else if(l === null || l === ""){alert('Please fill all the fields!')}
       else if(s === null || s === ""){alert('Please fill all the fields!')}
       else if(up === null || up === ""){alert('Please fill all the fields!')}
       else if(p === null || p === ""){alert('Please fill all the fields!')}
       else if(s.length != 9 || isnum == false){alert("Please enter valid student number!")} 
       else if(up.includes(upmail) == false){alert("Please enter valid UP Mail!")} 
       else{
           // Fetch the user credentials from the server
         fetch(`http://localhost:3001/check-credentials-for-sign-up?upMail=${encodeURIComponent(up)}`, {
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
	                studentNumber: s,
                  userType: "Student",
	                upMail: up,
                  password: p,
                  application: [],
                  adviser: null,
                  accepted: 0

              })
            }).then(console.log());
            
          
            // fetch('http://localhost:3001/add-credential', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json'
            //   },
            //   body: JSON.stringify({ //convert the follwoing in json formation
              
            //     upMail: up,
            //     password: p
            //   })
            // })
            //   .then(console.log());

            
            
              console.log("Successfully logged in!");
              //window.alert("Successfully signed up!");
              window.location.href = "http://localhost:3000/wait-adviser"
           });
        }   
        
      }

      handleLogin = () => {
        window.location.href = "http://localhost:3000/studentLogin"
      }
    
    render(){
        return(
          <div className="home-page">
          <Header/>
          <div className="content"> 
            
            <div className="center">
              <form>
                
                  {/* for forms */}
                  <h1>Sign Up</h1>
                  <div className="txt_field">
                  <input type="text" name="fname" id="fname" class="fname" required/><br></br>
                  <label>First Name: </label>
                  </div>

                  <div className="txt_field">
                  <input type="text" name="mname" id="mname" class="mname" required/><br></br>
                  <label>Middle Name: </label>
                  </div>

                  <div className="txt_field">
                  <input type="text" name="lname" id="lname" class="lname" required/><br></br>
                  <label>Last Name: </label>
                  </div>

                  <div className="txt_field">
                  <input type="text" name="studno" id="studno" className="studno" required/><br></br>
                  <label>Student Number: </label>
                  </div>

                  <div className="txt_field">
                  <input type="text" name="upMail" id="upMail" className="upMail" required/><br></br>
                  <label>UP Mail: </label>
                  </div>

                  <div className="txt_field">
                  <input type="Password" name="pwd" id="pwd" class="pwd" required/><br></br>
                  <label>Password: </label>
                  </div>

              </form>
              <button className="signup_button" type="Sign Up" onClick={this.handleAdd}>Sign Up</button>
              <div className="login_link">
              <a>Already have an account? </a><a href="/studentLogin">Log In</a>  
              </div>
   
                
                {/* when submit button is clicked punta sa handleADd */}
               
            </div>
            </div>
            </div>
        )
    }
}

export default Add;