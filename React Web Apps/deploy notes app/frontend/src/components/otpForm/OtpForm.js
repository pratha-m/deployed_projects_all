import React, { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./otpForm.css"

const OtpForm=({closeOtpForm,openSignInPage})=> {
  const [otp,setOtp]=useState("");
  const renderErrorToast=(message)=>{
      toast.error(message,{
        position: "bottom-center",
        closeButton: false,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        toastId:"efgh",
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
  }  
  const otpCheck=()=>{
    let otpInput=document.getElementById("otpInput");
    axios.post(`${process.env.REACT_APP_BASE_URL}/checkotp`,{otp:otp}).then((result)=>{
    console.log(result.data.success);
    if(result.data.success==="true"){
      toast.success("Account Created Successfully",{
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
      closeOtpForm();
      otpInput.value=null;
      openSignInPage();
    }
    else{
      renderErrorToast("Incorrect Otp");
    }
  })
    .catch(()=>{
      renderErrorToast("Network Error");
    })
  }
  return (
    <form className='otpForm'>
        <div className="container">
          <div className='headingOtpForm'>
              <p>Pls Enter Otp Sent To </p>
              <b id="otpFormDisplayEmail"></b>
          </div>
          <hr/>
            <label htmlFor="email"><b>Enter Otp </b></label>
            <input type="text" placeholder="Enter Otp" className='otpInput' onChange={(e)=>{setOtp(e.target.value)}} id="otpInput" name="otp" required/>
            <div className="clearfix">
            <button type="button" className="signupbtn buttonForm" onClick={()=>{otpCheck()}}>Create Account</button>
            </div>
           
        </div>
      </form>
  )
}

export default OtpForm