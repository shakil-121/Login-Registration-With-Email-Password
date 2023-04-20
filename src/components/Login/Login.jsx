import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../Firebase/firebase.config';


const auth = getAuth(app);
const Login = () => { 
    const [error,setError]=useState(''); 
    const [success,setSuccess]=useState(''); 
    const emailRef=useRef();

    const handelSignin=event=>{ 
        event.preventDefault(); 
        
        const email=event.target.email.value; 
        const password=event.target.password.value; 
         
        setError(''); 
        setSuccess('');
        signInWithEmailAndPassword(auth,email,password) 
        .then(result=>{ 
            const loggedUser=result.user;  
            setSuccess('Login Successfully !')
        }) 
        .catch(error=>{ 
            console.log(error); 
            setError(error.message)
        })

    } 

    //Password reset Process with firebase -------------------------------
   const handelresetPassword=()=>{ 
       const email=emailRef.current.value;
       if(!email){ 
        alert('Please Enter your Email Address') 
        return;
       } 

       sendPasswordResetEmail(auth,email) 
       .then(()=> { 
          alert('Please Check your Email Address');
       }) 
       .catch(error=>{ 
        setError(error.message)
       })
   }
//---------------------------------------------------------------------
    return (
        <div>
            <form onSubmit={handelSignin}>
        <h2>Please Login</h2>
        <br />
        <input
          type="email"
          name="email"
          id="email" 
          ref={emailRef}
          required
          placeholder="simple@gmail.com"
        />
        <br /> 
        <br />
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Enter your Password"
        />
        <br /> 
        <br />
        <input type="submit" value="Login" />
      </form> 
     <p><small>Forget Password ? Please <a onClick={handelresetPassword} href="">Reset</a> </small></p>
      <p><small>New to this website ? please <Link to='/registration'>Registration</Link></small></p>
       
    <p style={{color:'red'}}><small>{error}</small></p>
    <p style={{color:'green'}}><small>{success}</small></p>

        </div>
    );
};

export default Login;