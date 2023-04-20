import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from "../../Firebase/firebase.config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const auth = getAuth(app);
const Registration = () => {
  const [error, setError] = useState("");

  const handelsubmit = (event) => {
    //prevent page refresh
    event.preventDefault();
    setError("");
    //collect data
    const email = event.target.email.value;
    const password = event.target.password.value; 
    const name=event.target.name.value; 

    //password validation with regular expression
    /**
     *  some regular expression , if you interested to find many regular expression search it google 
     *    ^                         Start anchor
          (?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
          (?=.*[!@#$&*])            Ensure string has one special case letter.
          (?=.*[0-9].*[0-9])        Ensure string has two digits.
          (?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
          .{8}                      Ensure string is of length 8.
          $                         End anchor.
     * 
     */

    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("Please add minimum two uppercase letter");
      return;
    } 
    else if(!/(?=.*[0-9].*[0-9])/.test(password)){ 
        setError("Please add minimum two digit"); 
        return;
    } 
    else if(password.length<6)
    { 
        setError("Your password minimum 6 charecter"); 
        return;
    }
 
    
    // create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggeeduser = result.user;
        console.log(loggeeduser);
        event.target.reset();
        setError("");
        toast("Registration Successful !!"); 
        sendVmail(loggeeduser); 
        updateUserData(result.user,name)
      })
      .catch((error) => {
        setError(error.message);
      });
  }; 

//update user profile (user name, profile photo etc)

const updateUserData=(user,name)=>{ 

  updateProfile(user,{
    displayName:name
  })
  .then() 
  .catch()
}





//-----------------------------------------------------

//   Email Varification system build with firebase  

const sendVmail=(User)=>{ 
sendEmailVerification(User)
.then(result=>{ 
    alert('Please verify your mail')
})
.catch(error=>{ 
    console.log(error);
})
}
//---------------------------------------------------------------- 


//  ------------------ optional-------------------------------------
  const handleEmail = (event) => {
    // console.log(event.target.value);
  };

  const handlePassword = (event) => {
    // console.log(event.target.value);
  };
//--------------------------------------------------------------------


  return (
    <div>
      <form onSubmit={handelsubmit}>
        <h2>Registration Form</h2>
        <br />
        <input
          type="name"
          name="name"
          id="name"
          required
          placeholder="Name"
        />
        <br />
        <br />
        <input
          onChange={handleEmail}
          type="email"
          name="email"
          id="email"
          required
          placeholder="simple@gmail.com"
        />
        <br /> 
        <br />
        <input
          onBlur={handlePassword}
          type="password"
          name="password"
          id="password"
          required
          placeholder="Enter your Password"
        />
        <br /> 
        <br />
        <input type="submit" value="Registration" />
      </form> 
      <p><small>Already have an account ? please <Link to='/login'>Login</Link></small></p>

      <p style={{ color: "red" }}>{error}</p>
      <ToastContainer />
    </div>
  );
};

export default Registration;
