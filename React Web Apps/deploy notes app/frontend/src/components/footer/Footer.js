import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <div className='footer unselectable'><p>noteIT©2023</p></div>
  )
}

// let replaceTextDiv=document.getElementById("replaceTextDiv");  
//          replaceTextDiv.addEventListener("click",function(){
//              let replaceInputValue=document.getElementById("replaceInput").value;
//              findInputValueRegex=new RegExp(`${findInputValue}g`)
//              console.log(replaceInputValue)
//              let replaceTextOfTextarea=text.replace(findInputValueRegex,replaceInputValue)
//              document.getElementById("textArea").innerText=replaceTextOfTextarea;
//          })