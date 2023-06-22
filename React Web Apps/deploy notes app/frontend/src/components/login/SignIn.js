import React, { useState } from 'react'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import "./signin.css"
import Loader from '../loader/Loader';


const SignIn = ({closeSignInForm,openSignUpPage}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  let signinEmail=document.getElementById("signinEmail");
  let signinPassword=document.getElementById("signinPassword");
  let signInLoaderDiv=document.getElementById("signInLoaderDiv");
  const renderToast=(eror)=>{
    toast.error(eror,{
      position: "bottom-center",
      closeButton: false,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      toastId:"abcd",
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  }
  const signIn=()=>{
    if(email==="" || password===""){
        renderToast("Ps Fill form"); 
    }
    else{
      signInLoaderDiv.style.display="flex"; 
      axios.post(`${process.env.REACT_APP_BASE_URL}/login`,{user_email:email,user_password:password})
      .then((result)=>{
        signInLoaderDiv.style.display="none";
        if(result.data.success==="true"){
          document.cookie=`data=${result.data.user_data};max-age=15778476;SameSite=none,Secure`; 
             window.location.reload();
             toast.success("Login Successfully",{
              position:"bottom-center",
              closeButton: false,
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              toastId:"hjjj",
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
            });
            signinEmail.value=null;
            signinPassword.value=null;
            setEmail("");
            setPassword("");
            closeSignInForm(); 
        }
        else{
           renderToast("wrong credentials");  
        }
      })
      .catch((e)=>{
        renderToast("error in network")
      });
    }
  } 
  return (
    <form className='signinForm unselectable'>
        <div className="container unselectable">
          <h1 >Sign In</h1>
          <hr/>
            <label htmlFor="email"><b>Email</b></label>
            <input type="text" className='signinEmail unselectable' onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter Email" id="signinEmail" name="email" required/>
            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" className='signinPassword unselectable' onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password" id="signinPassword" name="psw" required/>
            <div className="clearfix unselectable">
            <button type="button" className="signinbtn buttonForm unselectable" onClick={()=>{signIn()}}>
               <div className='signInLoaderDiv unselectable' id="signInLoaderDiv"><Loader/></div>
               <div className='signInTextDiv unselectable'>SignIn</div>
            </button>
            </div>
            <div className="alreadyAccount">
                <div className="text unselectable">If You Are New User</div>
                <div className="signinLinking unselectable" onClick={()=>{closeSignInForm();openSignUpPage()}}>&nbsp;Create Account</div>
            </div>
        </div>
      </form>
  )
}

export default SignIn