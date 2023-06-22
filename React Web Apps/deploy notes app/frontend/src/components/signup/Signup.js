import React, { useState } from 'react'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import "./signup.css"
import Loader from '../loader/Loader';

const Signup=({closeSignUpForm,openSignInPage,openOtpForm})=>{
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const renderToast=(eror)=>{
    toast.error(eror, {
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
  
  const createAccount=()=>{
    console.log("createclick")
    let signupEmail=document.getElementById("signupEmail");
    let signupPassword=document.getElementById("signupPassword");
    let sinupConfirmPassword=document.getElementById("sinupConfirmPassword");
    let loaderDiv=document.getElementById("loaderDiv");
    let otpFormDisplayEmail=document.getElementById("otpFormDisplayEmail");
     if(email==="" || password==="" || confirmPassword===""){
      renderToast("Pls fill Form");
     }
     else{ 
      if(password===confirmPassword){
         loaderDiv.style.display="flex"; 
         axios.post(`${process.env.REACT_APP_BASE_URL}/createuser`,{user_email:email,user_password:password})
          .then((result)=>{
            loaderDiv.style.display="none";
            if(result.data.success==="false"){
                if(result.data.error==="duplicateUser"){
                     renderToast("User Already Exists");
                }
                else if(result.data.error==="otherError"){
                     renderToast("Network Error Occured");
                }
            }
            else{
              otpFormDisplayEmail.innerText=email;
              signupEmail.value=null;
              signupPassword.value=null;
              sinupConfirmPassword.value=null;
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              openOtpForm();
            }
          })
          .catch((e)=>{
            renderToast("Pls Reload Page ")}
          )    
       }
       else{
          renderToast("passwords not matching");
       }  
     }
     console.log("exit cretae account");
  }

  
  return (
      <form className='signUpForm'>
        <div className="container">
          <h1>Sign Up</h1>
          <hr/>
            <label htmlFor="email"><b>Email</b></label>
            <input type="text" className='signupEmail' placeholder="Enter Email" onChange={(e)=>{setEmail(e.target.value)}} name="email" id='signupEmail' required/>
            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" className='signupPassword' placeholder="Enter Password" onChange={(e)=>{setPassword(e.target.value)}} name="psw" id="signupPassword" required/>
            <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
            <input type="password" className='sinupConfirmPassword' placeholder="Repeat Password" onChange={(e)=>{setConfirmPassword(e.target.value)}} name="psw-repeat" id="sinupConfirmPassword" required/>
            <div className="clearfix">
            <button type='button' className="continueSignup buttonForm" onClick={()=>{createAccount()}}>
              <div className='loaderDiv' id="loaderDiv"><Loader/></div>
              <div className='textDiv'>Continue</div>
            </button>
            </div>
        <div className="alreadyAccount">
            <div className="text">If You Already Have Account</div>
            <div className="signinLinking" onClick={()=>{closeSignUpForm();openSignInPage()}}>&nbsp;Signin</div>
        </div>
        </div>
      </form>
    )
}

export default Signup