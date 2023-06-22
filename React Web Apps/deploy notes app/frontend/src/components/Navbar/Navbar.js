import React,{useEffect, useState} from 'react';
import "../publicCss/variables.css"
import "./Navbar.css";
import axios from "axios"
import Signup from '../signup/Signup';
import SignIn from '../login/SignIn';
import OtpForm from '../otpForm/OtpForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function Navbar(){
  const [fakeReload,setFakeReload]=useState(1);
  const toggleNavbar=()=>{
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li");
      navLinks.classList.toggle("open");
      links.forEach(link => {
          link.classList.toggle("fade");
      });
      hamburger.classList.toggle("toggle");
  }  
  const openSignUpPage=()=>{
    toggleNavbar();
    closeSignInForm();
    closeOtpForm();
    let signUpDiv=document.getElementById("SignUpDiv");
    if(signUpDiv.classList.contains("hideSignUp")){
      signUpDiv.classList.remove("hideSignUp");
      signUpDiv.classList.add("showSignUp");
    }
    else{
      signUpDiv.classList.remove("showSignUp");
      signUpDiv.classList.add("hideSignUp");
    }
  }
  const closeSignUpForm=()=>{
    let signUpDiv=document.getElementById("SignUpDiv");
    signUpDiv.classList.remove("showSignUp");
    signUpDiv.classList.add("hideSignUp");
  }

  const openSignInPage=()=>{
    toggleNavbar();
    closeSignUpForm();
    closeOtpForm();
    let signInDiv=document.getElementById("SignInDiv");
    if(signInDiv.classList.contains("hideSignIn")){
      signInDiv.classList.remove("hideSignIn");
      signInDiv.classList.add("showSignIn");
    }
    else{
      signInDiv.classList.remove("showSignIn");
      signInDiv.classList.add("hideSignIn");
    }
  }
  const closeSignInForm=()=>{
    let signInDiv=document.getElementById("SignInDiv");
    signInDiv.classList.remove("showSignIn");
    signInDiv.classList.add("hideSignIn");
    setFakeReload(0);
  }

  const openOtpForm=()=>{
    closeSignUpForm();
    let otpDiv=document.getElementById("otpDiv");
    if(otpDiv.classList.contains("hideOtp")){
      otpDiv.classList.remove("hideOtp");
      otpDiv.classList.add("showOtp");
    }
    else{
      otpDiv.classList.remove("showOtp");
      otpDiv.classList.add("hideOtp");
    }
  }
  const closeOtpForm=()=>{
    let otpDiv=document.getElementById("otpDiv");
    otpDiv.classList.remove("showOtp");
    otpDiv.classList.add("hideOtp");
  }
  const logoutFunc=()=>{
    let keyValuePair;
    keyValuePair=document.cookie.split("; ").find((row) => row.startsWith("data="));
    document.cookie=`${keyValuePair};max-age=0`;
    keyValuePair=document.cookie.split("; ").find((row) => row.startsWith("data="));
    if(keyValuePair===undefined){
        toast.success("Logout successfully",{
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
        setFakeReload(0);
      }
  }
  
  useEffect(()=>{
    let cookieVal=document.cookie.split("; ").find((row) => row.startsWith("data="))?.split("=")[1];
    if(cookieVal!==undefined){
      axios.post(`${process.env.REACT_APP_BASE_URL}/decodetoken`,{user_token:`${cookieVal}`})
      .then((result)=>{
        if(result.data.success==="true"){
          let navbarSignUpLi=document.getElementById("navbarSignUpLi");
          let navbarSignInLi=document.getElementById("navbarSignInLi");
          let navbarAccountLiButton=document.getElementById("navbarAccountLiButton");
          let navbarAccountLi=document.getElementById("navbarAccountLi");
          navbarAccountLi.style.display="flex";
          navbarSignUpLi.style.display="none";
          navbarSignInLi.style.display="none";
          navbarAccountLiButton.innerText=(result.data.data.user_email);
          
        }
        else{
          console.log(result.data.error.message);
        }
      })
      .catch((e)=>{
        console.log(" Some Network error")
      })
    }
    else{
      let navbarSignUpLi=document.getElementById("navbarSignUpLi");
      let navbarSignInLi=document.getElementById("navbarSignInLi");
      let navbarAccountLi=document.getElementById("navbarAccountLi"); 
      navbarAccountLi.style.display="none";
      navbarSignUpLi.style.display="flex";
      navbarSignInLi.style.display="flex";
    }
    setFakeReload(1);
   },[fakeReload]);
   
  const [darkMode,setDarkMode]=useState(true);
  const toggleMode=()=>{
    let logoImgNavbar=document.getElementById("logoImgNavbar");
    let upperAndLowerCaseBtnImg=document.getElementById("upperAndLowerCaseBtnImg");
    let LowerCaseBtnImg=document.getElementById("LowerCaseBtnImg");
    let copyTextButtonImg=document.getElementById("copyTextButtonImg");
    let clearTextButtonImg=document.getElementById("clearTextButtonImg");
    let findAndReplaceImg=document.getElementById("findAndReplaceImg");
    let boldBtnImg=document.getElementById("boldBtnImg");
    let italicBtnImg=document.getElementById("italicBtnImg");
    let underlineBtnImg=document.getElementById("underlineBtnImg");
    let lineThroughBtnImg=document.getElementById("lineThroughBtnImg");
    let powerBtnImg=document.getElementById("powerBtnImg");
    let baseBtnImg=document.getElementById("baseBtnImg");
    let alignTextLeftBtnImg=document.getElementById("alignTextLeftBtnImg");
    let alignTextCenterBtnImg=document.getElementById("alignTextCenterBtnImg");
    let alignTextRightBtnImg=document.getElementById("alignTextRightBtnImg");
    let shareBtnImgs=document.getElementsByClassName("shareBtnImg");
    let editBtnImgs=document.getElementsByClassName("editBtnImg");
    let deleteBtnImgs=document.getElementsByClassName("deleteBtnImg");
    let copyBtnImgs=document.getElementsByClassName("copyBtnImg");
    let rootElement=document.querySelector(":root");
    if(darkMode){
        rootElement.style.setProperty("--darkBg","#efefef");    
        rootElement.style.setProperty("--whiteBg","#131418");    
        rootElement.style.setProperty("--blackTextColor","white");    
        rootElement.style.setProperty("--whiteTextColor","#131418");  
        rootElement.style.setProperty("--lightDarkBg","#c1e2d3a6");  
        rootElement.style.setProperty("--smallBtnsDarkBg","#acb0c0");  
        logoImgNavbar.src=logoImgNavbar.src.replace("logo-noteapp.png","logo-noteapp-black.png");
        upperAndLowerCaseBtnImg.src=upperAndLowerCaseBtnImg.src.replace("upper.png","upper-black.png");
        LowerCaseBtnImg.src=LowerCaseBtnImg.src.replace("upper-to-lower.png","upper-to-lower-black.png");
        copyTextButtonImg.src=copyTextButtonImg.src.replace("copy.png","copy-black.png");
        clearTextButtonImg.src=clearTextButtonImg.src.replace("clear.png","clear-black.png");
        findAndReplaceImg.src=findAndReplaceImg.src.replace("fandr.png","fandr-black.png");
        boldBtnImg.src=boldBtnImg.src.replace("bold.png","bold-black.png");
        italicBtnImg.src=italicBtnImg.src.replace("italic.png","italic-black.png");
        underlineBtnImg.src=underlineBtnImg.src.replace("underline.png","underline-black.png");
        lineThroughBtnImg.src=lineThroughBtnImg.src.replace("linethrough.png","linethrough-black.png");
        powerBtnImg.src=powerBtnImg.src.replace("power.png","power-black.png");
        baseBtnImg.src=baseBtnImg.src.replace("base.png","base-black.png");
        alignTextLeftBtnImg.src=alignTextLeftBtnImg.src.replace("leftalign.png","leftalign-black.png");
        alignTextCenterBtnImg.src=alignTextCenterBtnImg.src.replace("centeralign.png","centeralign-black.png");
        alignTextRightBtnImg.src=alignTextRightBtnImg.src.replace("rightalign.png","rightalign-black.png");
        for(let i=0;i<deleteBtnImgs.length;i++){
          shareBtnImgs[i].src=shareBtnImgs[i].src.replace("shareBtn.png","shareBtn-black.png");
          editBtnImgs[i].src=editBtnImgs[i].src.replace("editButton.png","editButton-black.png");
          deleteBtnImgs[i].src=deleteBtnImgs[i].src.replace("deleteButton.png","deleteButton-black.png");
          copyBtnImgs[i].src=copyBtnImgs[i].src.replace("copy.png","copy-black.png");
        } 
        rootElement.style.setProperty("--trackBg","#efefef");    
        rootElement.style.setProperty("--thumbBg","#c2c2c2");    
        setDarkMode(false);
     }
     else{
      rootElement.style.setProperty("--darkBg","#131418");    
      rootElement.style.setProperty("--whiteBg","white");    
      rootElement.style.setProperty("--blackTextColor","131418");    
      rootElement.style.setProperty("--whiteTextColor","white");  
      rootElement.style.setProperty("--lightDarkBg","#292828");  
      rootElement.style.setProperty("--smallBtnsDarkBg","#2e2f33");  
      logoImgNavbar.src=logoImgNavbar.src.replace("logo-noteapp-black.png","logo-noteapp.png");
      upperAndLowerCaseBtnImg.src=upperAndLowerCaseBtnImg.src.replace("upper-black.png","upper.png");
      LowerCaseBtnImg.src=LowerCaseBtnImg.src.replace("upper-to-lower-black.png","upper-to-lower.png");
      copyTextButtonImg.src=copyTextButtonImg.src.replace("copy-black.png","copy.png");
      clearTextButtonImg.src=clearTextButtonImg.src.replace("clear-black.png","clear.png");
      findAndReplaceImg.src=findAndReplaceImg.src.replace("fandr-black.png","fandr.png");
      boldBtnImg.src=boldBtnImg.src.replace("bold-black.png","bold.png");
      italicBtnImg.src=italicBtnImg.src.replace("italic-black.png","italic.png");
      underlineBtnImg.src=underlineBtnImg.src.replace("underline-black.png","underline.png");
      lineThroughBtnImg.src=lineThroughBtnImg.src.replace("linethrough-black.png","linethrough.png");
      powerBtnImg.src=powerBtnImg.src.replace("power-black.png","power.png");
      baseBtnImg.src=baseBtnImg.src.replace("base-black.png","base.png");
      alignTextLeftBtnImg.src=alignTextLeftBtnImg.src.replace("leftalign-black.png","leftalign.png");
      alignTextCenterBtnImg.src=alignTextCenterBtnImg.src.replace("centeralign-black.png","centeralign.png");
      alignTextRightBtnImg.src=alignTextRightBtnImg.src.replace("rightalign-black.png","rightalign.png");
      for(let i=0;i<deleteBtnImgs.length;i++){
        shareBtnImgs[i].src=shareBtnImgs[i].src.replace("shareBtn-black.png","shareBtn.png");
        editBtnImgs[i].src=editBtnImgs[i].src.replace("editButton-black.png","editButton.png");
        deleteBtnImgs[i].src=deleteBtnImgs[i].src.replace("deleteButton-black.png","deleteButton.png");
        copyBtnImgs[i].src=copyBtnImgs[i].src.replace("copy-black.png","copy.png");
      } 
      rootElement.style.setProperty("--trackBg","#131418");    
      rootElement.style.setProperty("--thumbBg","#2e2f33");    
        setDarkMode(true);
     }
  }
  return(
        <>
          <div className="navBar unselectable" id="navBar">
          <nav>
           <div className="logo">
            <img src='./images/logo-noteapp.png' id='logoImgNavbar' alt='imag'/>
           </div>
           <div className="hamburger" onClick={()=>{toggleNavbar()}}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
           </div>
           <ul className="nav-links">
            <li><a href="/">Home</a></li>
            {/* <li><a href="/">Contact Us</a></li> */}
            <li id="navbarSignInLi"><button className="login-button" onClick={()=>{openSignInPage()}}>Login</button></li>
            <li id="navbarSignUpLi"><button className="join-button" onClick={()=>{openSignUpPage()}}>Sign Up</button></li>
            <li id="navbarAccountLi" style={{display:"none"}} className='dropdown'>
              <button className="account-button" id="navbarAccountLiButton">Account..</button>
              <div className="dropdown-content">
                <div className="logoutBtnNavbar" id='logoutBtnNavbar' onClick={()=>{logoutFunc()}}>Logout</div>
              </div>
            </li>
            <li id='navarLightDarkSwitchLi'>
              <div className="navarLightDarkSwitchDiv">
                <input type="checkbox" className="checkbox" id="checkbox" onClick={toggleMode} />
                <label htmlFor="checkbox" className="label">
                  <img src="./images/lightmode.png" className='lightmodeImg' alt="" />
                  <img src="./images/dark-mode.png" className='darkmodeImg' alt="" />
                  <div className='ball'></div>
                </label>
              </div>
            </li>
           </ul>
           </nav>
          </div> 
          <div className='hideSignUp unselectable' id='SignUpDiv'>
              <div className="closeSignUpButtonContainer"><div className="closeSignUpButton" onClick={()=>{closeSignUpForm()}}><img src="./images/closeIcon.png" alt='img'/></div></div>
              <div className="signUpFormContainer"><Signup openOtpForm={openOtpForm} closeSignUpForm={closeSignUpForm} openSignInPage={openSignInPage}/></div>
          </div>
          
          
          <div className='hideSignIn unselectable' id='SignInDiv'>
              <div className="closeSignInButtonContainer"><div className="closeSignInButton" onClick={()=>{closeSignInForm()}}><img src="./images/closeIcon.png" alt='img'/></div></div>
              <div className="signInFormContainer"><SignIn closeSignInForm={closeSignInForm} openSignUpPage={openSignUpPage}/></div>
          </div>

          <div className='hideOtp unselectable' id='otpDiv'>
              <div className="closeOtpButtonContainer"><div className="closeOtpButton" onClick={()=>{closeOtpForm()}}><img src="./images/closeIcon.png" alt='img'/></div></div>
              <div className="otpFormContainer"><OtpForm closeOtpForm={closeOtpForm} openSignInPage={openSignInPage} /></div>
          </div>

          <ToastContainer
               position="bottom-center"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               toastId="assw22"
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="light"
          />
        </>
  )
}


