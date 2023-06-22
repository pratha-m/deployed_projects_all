import React,{useState,useEffect} from 'react'
import './Leftsidebar.css'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'
import axios from 'axios';
import "./Rightsidebar.css"

export default function Leftsidebar() {

   // ***************LEFT SIDEBAR LOGIC PART STARTs ********************

   // ALL FUNCTIONS Starts::DONE 

   // **********find and replace starts::::DONE********** 
   const findAndReplace = () => {
      let containClickableElements = document.getElementById("containClickableElements");
      let findAndReplaceDiv = document.getElementById("findAndReplaceDiv");
      let findAndReplace=document.getElementById("findAndReplace")
      if (Array.from(containClickableElements.classList).length === 0) {
         containClickableElements.classList.add("containClickableElements");
         findAndReplaceDiv.classList.add("showFindAndReplaceDiv");
         findAndReplace.style.backgroundColor="var(--lightDarkBg)"
      }
      else {
         closeFindAndReplace(); 
         findAndReplace.backgroundColor="var(--smallBtnsDarkBg)";
      }
   }
   function toggleArrow() {
      let openerOfReplace = document.getElementById("openerOfReplace");
      let replaceDiv = document.getElementById("replaceDiv");
      if ((Array.from(openerOfReplace.classList)).includes("arrowDown")) {
         openerOfReplace.classList.remove("arrowDown");
         openerOfReplace.classList.add("arrowUp");
         replaceDiv.classList.add("showReplaceDiv");
      }
      else {
         openerOfReplace.classList.remove("arrowUp");
         openerOfReplace.classList.add("arrowDown");
         replaceDiv.classList.remove("showReplaceDiv");
      }
   }
   const closeFindAndReplace = () => { 
      let findAndReplaceDiv = document.getElementById("findAndReplaceDiv");
      findAndReplaceDiv.classList.remove("showFindAndReplaceDiv");
      let containClickableElements = document.getElementById("containClickableElements");
      containClickableElements.classList.remove("containClickableElements")
      let findAndReplace=document.getElementById("findAndReplace");
      findAndReplace.style.backgroundColor="var(--smallBtnsDarkBg)";
      let containerSpans=$("#textArea").children()
      for(let i=0;i<containerSpans.length;i++){
         $(function(){
            $("#textArea").html( 
               $("#textArea").html().replaceAll(`<span style="background-color:gray;color:white;border-radius:5px;padding:1px">${containerSpans[i].innerText}</span>`,containerSpans[i].innerText)
             );
         })
      }
   }
   $(function(){
      $("#findTextDiv").on("click",function(){
         let containerSpans=$("#textArea").children();
         if(containerSpans.length!==0){
            for(let i=0;i<containerSpans.length;i++){
               $("#textArea").html( 
                  $("#textArea").html().replaceAll(`<span style="background-color:gray;color:white;border-radius:5px;padding:1px">${containerSpans[i].innerText}</span>`,containerSpans[i].innerText)
                );
            }
         }
         let findVal=$("#findInput").val();
            $("#textArea").html( 
              $("#textArea").html().replaceAll(findVal,`<span style="background-color:gray;color:white;border-radius:5px;padding:1px">${findVal}</span>`)
            );
       })
       $("#replaceTextDiv").on("click",function(){
            let replaceVal=$("#replaceInput").val();
            let containerSpans=$("#textArea").children()
            containerSpans.replaceWith(`<span style="background-color:gray;color:white;border-radius:5px;padding:1px">${replaceVal}</span>`)
               $("#textArea").html( 
                  $("#textArea").html().replaceAll(`<span style="background-color:gray;color:white;border-radius:5px;padding:1px">${replaceVal}</span>`,replaceVal)
               )
      })
   })
   // ********find and replace ends::::DONE********** 

   // *******handle copy starts:::DONE********        
   const handleCopy=()=>{
      let textArea=document.getElementById("textArea")
      let textAreaText=textArea.innerText;
      let copyTextButton=document.getElementById("copyTextButton")
      navigator.clipboard.writeText(textAreaText);
      copyTextButton.style.backgroundColor="var(--lightDarkBg)"
      renderSuccessToast("Copied Successfully");
      setTimeout(function(){
         copyTextButton.style.backgroundColor="var(--smallBtnsDarkBg)"
      },500)
   }
   // *******handle copy ends:::DONE********        

   // *******handle clear starts:::DONE********  
   const handleClear=()=>{
      let textArea=document.getElementById("textArea")
      let clearTextButton=document.getElementById("clearTextButton");
      textArea.innerText=null
      clearTextButton.style.backgroundColor="var(--lightDarkBg)"
      renderSuccessToast("Cleared Successfully");
      setTimeout(function(){
          clearTextButton.style.backgroundColor="var(--smallBtnsDarkBg)"
      },500)
   }
   // *******handle clear ends:::DONE********  

   // *******handle remove extra spaces starts:::DONE********  
   const handleRemoveExtraSpaces=()=>{
      let textArea=document.getElementById("textArea")
      let textAreaText=textArea.innerText;
      let removeExtraSpacesBtn=document.getElementById("removeExtraSpacesBtn");
      textArea.innerText=textAreaText.replace(/\s+/g," ").trim()
      removeExtraSpacesBtn.style.backgroundColor="var(--lightDarkBg)";
      renderSuccessToast("Spaces Removed Successfully")
      setTimeout(function(){
          removeExtraSpacesBtn.style.backgroundColor="var(--smallBtnsDarkBg)"; 
      },500)
   }
   // *******handle remove extra spaces starts:::DONE********  

   // ******font Size starts:::DONE*******
   const handleFontSize=(e)=>{
         let input = e.target;
         let inputVal = input.value;
         let list = input.getAttribute("list");
         console.log(list)
         let options = document.getElementById(list).childNodes;
         for (var i = 0; i < options.length; i++) {
               let textArea=document.getElementById("textArea");
               textArea.style.fontSize=`${inputVal}px`;
               break;
         }
   }
   // ******font Size ends:::DONE*******

   // ******font family starts:::DONE*******
   const handleFontFamilies=()=>{
         let selectTag=document.getElementById("fontFamilies")
         let selectedOptionVal=selectTag.options[selectTag.selectedIndex].value
         document.getElementById("textArea").style.fontFamily=selectedOptionVal;
   }
   // ******font family ends:::DONE*******

   // *******align text Leftsidebar,right,center starts:::DONE********* 
   let alignTextLeftBtn=document.getElementById("alignTextLeftBtn");
   let alignTextCenterBtn=document.getElementById("alignTextCenterBtn");
   let alignTextRightBtn=document.getElementById("alignTextRightBtn");
   const alignTextLeftBtnToggle=()=>{
      let textArea=document.getElementById("textArea");
      if(textArea.style.textAlign===""||textArea.style.textAlign==="center"||textArea.style.textAlign==="right"){
         textArea.style.textAlign="left"
         alignTextLeftBtn.style.backgroundColor="var(--lightDarkBg)";
         alignTextCenterBtn.style.backgroundColor="var(--smallBtnsDarkBg)";
         alignTextRightBtn.style.backgroundColor="var(--smallBtnsDarkBg)";
      }
      else{
         textArea.style.textAlign="" 
         alignTextLeftBtn.style.backgroundColor="var(--smallBtnsDarkBg)";
         alignTextCenterBtn.style.backgroundColor="var(--smallBtnsDarkBg)";
         alignTextRightBtn.style.backgroundColor="var(--smallBtnsDarkBg)";
      }
   }
   const alignTextCenterBtnToggle=()=>{
      let textArea=document.getElementById("textArea");
      if(textArea.style.textAlign===""||textArea.style.textAlign==="left"||textArea.style.textAlign==="right"){
         textArea.style.textAlign="center"
         alignTextCenterBtn.style.backgroundColor="var(--lightDarkBg)";
         alignTextLeftBtn.style.backgroundColor="var(--smallBtnsDarkBg)";
         alignTextRightBtn.style.backgroundColor="var(--smallBtnsDarkBg)";
      }
      else{
         textArea.style.textAlign=""
         alignTextLeftBtn.style.backgroundColor="var(--smallBtnsDarkBg)";
         alignTextCenterBtn.style.backgroundColor="var(--smallBtnsDarkBg)";
         alignTextRightBtn.style.backgroundColor="var(--smallBtnsDarkBg)";
      }
   }
   const alignTextRightBtnToggle=()=>{
      let textArea=document.getElementById("textArea");
      if(textArea.style.textAlign===""||textArea.style.textAlign==="left"||textArea.style.textAlign==="center"){
         textArea.style.textAlign="right"
         alignTextRightBtn.style.backgroundColor="var(--lightDarkBg)";
         alignTextCenterBtn.style.backgroundColor="var(--smallBtnsDarkBg)";
         alignTextLeftBtn.style.backgroundColor="var(--smallBtnsDarkBg)";
      }
      else{
         textArea.style.textAlign="" 
         alignTextLeftBtn.style.backgroundColor="var(--smallBtnsDarkBg)";
         alignTextCenterBtn.style.backgroundColor="var(--smallBtnsDarkBg)";
         alignTextRightBtn.style.backgroundColor="var(--smallBtnsDarkBg)";
      }
   }
   // *******align text Leftsidebar,right,center ends:::DONE********* 

   // ******text color starts:::DONE********       
   const textColorFunction=()=>{
      let textArea=document.getElementById("textArea");
      let colorInput=document.getElementById("colorInput");
      textArea.style.color=colorInput.value;
   }
   // ******text color ends:::DONE********        


   function pasteLogic(event){
      let box=document.getElementById("textArea");
      // console.log(box);
      let paste=(event.clipboardData || window.Clipboard).getData("text");
      paste=paste.replace(/(<([^>]+)>)/gi,"");
      let selection=window.getSelection();  
      if(!selection.rangeCount){
         return;
      }
      selection.deleteFromDocument();
      selection.getRangeAt(0).insertNode(document.createTextNode(paste));
      let total="";
      for(let i=0;i<box.childNodes.length;i++){
         total=total.concat(box.childNodes[i].textContent);
      }
      box.innerHTML=null;
      let totalNode=document.createTextNode(total);
      box.appendChild(totalNode);
   }

   const textFormat=(element)=>{
      let range=new Range();
      let selection=document.getSelection();
      let {anchorOffset,focusOffset,anchorNode,isCollapsed}=selection;
      if(anchorOffset>focusOffset){
          let temp;
          temp=anchorOffset;
          anchorOffset=focusOffset;
          focusOffset=temp;
      }
      // console.log("Total Length :",box.innerText.length);
      // console.log("start :",anchorOffset);
      // console.log("End :",focusOffset)
      // console.log("First Child :",box.firstChild);
      if(!isCollapsed){
          range.setStart(anchorNode,anchorOffset);
          range.setEnd(anchorNode,focusOffset);
          range.surroundContents(element);
      }
  }
   

   const boldToggleFunction=()=>{
      let boldElem=document.createElement("b");
      textFormat(boldElem);
   }
   const italicToggleFunction=()=>{
      let italicElem=document.createElement("i");
      textFormat(italicElem);
   }
   const underlineButtonToggleFunction=()=>{
      let underlineElem=document.createElement("u");
      textFormat(underlineElem);
   }
   const linethroughToggleFunction=()=>{
      let underlineElem=document.createElement("s");
      textFormat(underlineElem);
   }
   const powerToggleFunction=()=>{
      let labelElem=document.createElement("label");
      labelElem.style.verticalAlign="super";
      textFormat(labelElem);
   }
   const baseToggleFunction=()=>{
      let labelElem=document.createElement("label");
      labelElem.style.verticalAlign="sub";
      textFormat(labelElem);
   } 
   const normalToggleFunction=()=>{
        let labelElem=document.createElement("label");
        labelElem.style.fontWeight="initial";
        labelElem.style.verticalAlign="unset";
        textFormat(labelElem);
   } 
   const upperCaseAllToggle=()=>{
      let box=document.getElementById("textArea");
      box.innerText=box.innerText.toUpperCase();
   }
   const lowerCaseAllToggle=()=>{
      let box=document.getElementById("textArea");
      box.innerText=box.innerText.toLowerCase();
   }
   const copyNoteTextAndTitle=(title,description)=>{
      navigator.clipboard.writeText("title : "+title+"\ndescription : "+description)
      renderSuccessToast("Copied!");
   }
   // const editNote=(id)=>{
   //    let note=document.getElementById(id);
   //    let title=note.childNodes[0];
   //    let desc=note.childNodes[1];
   //    title.contentEditable=true;
   //    desc.contentEditable=true;
   // }

   // ALL FUNCTIONS Ends::DONE 

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
   const [title,setTitle]=useState("");
   
   const createNote=()=>{
      const noteDesc=document.getElementById("textArea").innerText;
      const noteTitle=title; 
      if(noteDesc.length>=5 && noteTitle.length>=5){
         let cookieVal=document.cookie.split("; ").find((row) => row.startsWith("data="))?.split("=")[1];
         if (cookieVal !== undefined) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/decodetoken`, { user_token: `${cookieVal}` })
            .then((result) => {
               if (result.data.success === "true") {
                     const userEmail=result.data.data.user_email;
                     axios.post(`${process.env.REACT_APP_BASE_URL}/createnote`,{title:noteTitle,description:noteDesc,user_email:userEmail})
                     .then((result)=>{
                        if(result.data.success==="true"){
                           renderSuccessToast("Note Created Successfully");
                           setFakeReload(0);
                           }
                         else{
                            renderToast("Pls Login To Create Note")                          
                         }
                     })
                     .catch((e)=>{
                        renderToast("Network Error ...")
                     })   
                  }
                  else {
                     renderToast("Network Error ...");
                  }
               })
               .catch((e) => {
                  renderToast("Pls Login ...")
               })
         }
         else{
            renderToast("Pls Login First");
         }
      } 
      else{
         renderErrorToast("Pls Enter minimum five characeters")
      }
      
   }
            
   // ***************LEFT SIDEBAR LOGIC PART ENDS ********************
            
   // ***************RIGHT SIDE BAR LOGIC STARTS***************************   
   const [fakeReload,setFakeReload]=useState(1);
   const [userData,setUserData]=useState();
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
   const renderSuccessToast=(message)=>{
     toast.success(message,{
       position:"bottom-center",
       closeButton: false,
       autoClose: 500,
       hideProgressBar: true,
       closeOnClick: true,
       toastId:"hjjj",
       pauseOnHover: false,
       draggable: false,
       progress: undefined,
       theme: "light",
     });
   }
   useEffect(()=>{
     let cookieVal=document.cookie.split("; ").find((row) => row.startsWith("data="))?.split("=")[1];
     if(cookieVal!==undefined){
       axios.post(`${process.env.REACT_APP_BASE_URL}/decodetoken`,{user_token:`${cookieVal}`})
       .then((result)=>{
         if(result.data.success==="true"){
             axios.post(`${process.env.REACT_APP_BASE_URL}/showuserdata`,{user_email:result.data.data.user_email})
             .then((result)=>{
               // console.log(result.data.data.user_notes_data);
               if(result.data.success==="true"){
                 setUserData(result.data.data)
               }
               else{
                 console.log("sorry some error occured");
               }
             })  
             .catch((e)=>{console.log("Some Network Error..")})
         }
         else{
           console.log("Some Network error");
         }
       })
       .catch((e)=>{
         console.log("Some Network error")
       })
     }
     else{
        setUserData(null);
     }
   //   console.log("useffect running")
     setFakeReload(1);
    },[fakeReload]); 

   const deleteNote=(userEmail,noteId)=>{
     axios.post(`${process.env.REACT_APP_BASE_URL}/deletenote`,{noteid:noteId,user_email:userEmail})
     .then((result)=>{
       if(result.data.success==="true"){
            renderSuccessToast("note deleted successfully...");
            setFakeReload(0);
       }
       else{
          renderErrorToast("Pls Refresh page...");
       }
     })
     .catch((e)=>{renderErrorToast("Network Error Occured...")})
   }
   // ***************RIGHT SIDE BAR LOGIC ENDS***************************   
   return (
      <div>
       {/* ***************LEFT SIDE BAR ELEMENTS RENDER STARTS **************** */}
        <div className='leftSideBar unselectable'>
         <div id="containClickableElements">
               <div className="findAndReplaceDiv" id="findAndReplaceDiv">
                  <div className="findDiv" id="findDiv">
                     <div className="openerOfReplace arrowDown" id="openerOfReplace" onClick={toggleArrow}></div>
                     <div className="findInputAndTextDiv" id="findInputAndTextDiv" >
                        <div className="findInputDiv"><input type="text" id="findInput" className="findInput" placeholder='Find' /></div>
                        <div className="findTextDiv" id='findTextDiv'>Find</div>
                     </div>
                     <div className="closeIconFindAndReplaceDiv" id="closeIconFindAndReplaceDiv" onClick={closeFindAndReplace}></div>
                  </div>
                  <div className="replaceDiv" id="replaceDiv">
                     <div className="replaceInputDiv"><input type="text" id="replaceInput" className="replaceInput" placeholder='Replace' /></div>
                     <div className="replaceTextDiv" id="replaceTextDiv">Replace</div>
                  </div>
               </div>
         </div>
         <div className='leftSideBarContentDiv'>
            <div className="createNoteHeading">Create Note</div>
            <div className="textAreaDiv">
               <div className="titleDiv"><input type="text" placeholder='Add Title Here' onInput={(e)=>{setTitle(e.target.value)}}/></div>
               <div contentEditable="true" onPaste={(event)=>{event.preventDefault();pasteLogic(event)}} id='textArea' style={{fontFamily:"Calibri"}} placeholder="Add Note Description "></div>
            </div>
            <div className="allButtonsDiv" id="allButtonsDiv">
               <div className="Btns upperAndLowerCaseBtn unselectable" id="upperAndLowerCaseBtn" onClick={upperCaseAllToggle} ><img id="upperAndLowerCaseBtnImg" src="./images/upper.png" alt="" />&nbsp;All</div>
               <div className="Btns upperAndLowerCaseBtn unselectable" id="upperAndLowerCaseBtn" onClick={lowerCaseAllToggle} ><img id="LowerCaseBtnImg" src="./images/upper-to-lower.png" alt="" />&nbsp;All</div>
               <div className="Btns removeExtraSpacesBtn unselectable" id="removeExtraSpacesBtn" onClick={handleRemoveExtraSpaces}>Remove Spaces</div>
               <div className="Btns copyTextButton unselectable" id="copyTextButton" onClick={handleCopy}><img id="copyTextButtonImg" src="./images/copy.png" alt="" /></div>
               <div className="Btns clearTextButton unselectable" id="clearTextButton" onClick={handleClear}><img id="clearTextButtonImg" src="./images/clear.png" alt="" /></div>
               <div className="Btns findAndReplace unselectable" id="findAndReplace" onClick={findAndReplace}><img id="findAndReplaceImg" src="./images/fandr.png" alt="" /></div>
               <div id="boldBtnDiv" className='unselectable'><button id="boldBtn"  onClick={normalToggleFunction} className='Btns'>Normal</button></div> 
               <div id="boldBtnDiv" className='unselectable'><button id="boldBtn"  onClick={boldToggleFunction} className='Btns'><img id="boldBtnImg" src="./images/bold.png" alt="" /></button></div> 
               <div id="italicBtnDiv" className='unselectable'><button id="italicBtn" onClick={italicToggleFunction} className='Btns'><img id="italicBtnImg" src="./images/italic.png" alt="" /></button></div> 
               <div id="underlineBtnDiv" className='unselectable'><button id="underlineBtn" onClick={underlineButtonToggleFunction} className='Btns'><img id='underlineBtnImg' src="./images/underline.png" alt="" /></button></div> 
               <div id="lineThroughBtnDiv" className='unselectable'><button id="lineThroughBtn" onClick={linethroughToggleFunction} className='Btns'><img id='lineThroughBtnImg' src="./images/linethrough.png" alt="" /></button></div> 
               <div id="powerBtnDiv" className='unselectable'><button id="powerBtn" onClick={powerToggleFunction} className='Btns'><img id='powerBtnImg' src="./images/power.png" alt="" /></button></div> 
               <div id="baseBtnDiv" className='unselectable'><button id="baseBtn" onClick={baseToggleFunction} className='Btns'><img id='baseBtnImg' src="./images/base.png" alt="" /></button></div> 
               <div id="alignTextLeftBtnDiv" className='unselectable'><button id="alignTextLeftBtn" onClick={alignTextLeftBtnToggle} className='Btns'><img id='alignTextLeftBtnImg' src="./images/leftalign.png" alt="" /></button></div> 
               <div id="alignTextCenterBtnDiv" className='unselectable'><button id="alignTextCenterBtn" onClick={alignTextCenterBtnToggle} className='Btns'><img id='alignTextCenterBtnImg' src="./images/centeralign.png" alt="" /></button></div> 
               <div id="alignTextRightBtnDiv" className='unselectable'><button id="alignTextRightBtn" onClick={alignTextRightBtnToggle} className='Btns'><img id='alignTextRightBtnImg' src="./images/rightalign.png" alt="" /></button></div> 
               <div className="Btns">
                     <input type="color" id='colorInput' onChange={textColorFunction} className='unselectable'/>
               </div>
               <div className="fontSizeInputAndTextDiv Btns">
                  {/* <div className="fontSizeText">Font Size :</div> */}
                  <div className="fontSizeInputDiv unselectable" >
                     <input list="fontSizes" className='Btns unselectable' defaultValue="16" max="56" onInput={handleFontSize} name="fontSizes" id="fontSizeInput" />
                     <datalist id="fontSizes" className='unselectable'>
                        <option value="5">5</option>
                        <option value="5.5">5.5</option>
                        <option value="6.5">6.5</option>
                        <option value="7.5">7.5</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="10.5">10.5</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="14">14</option>
                        <option value="16">16</option>
                        <option value="18">18</option>
                        <option value="20">20</option>
                        <option value="22">22</option>
                        <option value="26">26</option>
                        <option value="28">28</option>
                        <option value="36">36</option>
                        <option value="48">48</option>
                     </datalist>
                  </div>
               </div>
               <div className="fontFamilyDiv Btns">
                  {/* <div className="fontFamilyText">Font Family:</div> */}
                  <div className='fontFamilyOptionsDiv'>
                     <select id="fontFamilies" onChange={handleFontFamilies}>
                     {/* <!-- <option disabled value="Sans Serif" style={{background-color: aqua;">Sans Serif</option> --> */}
                     <option value={"Helvetica"} style={{fontFamily:"Helvetica"}}>Helvetica</option>
                     <option value={"Verdana"} style={{fontFamily:"Verdana"}}>Verdana</option>
                     <option value={"Lucida Sans"} style={{fontFamily:"Lucida Sans"}}>Lucida Sans</option>
                     <option value={"Century Gothic"} style={{fontFamily:"Century Gothic"}}>Century Gothic</option>
                     <option value={"Candara"} style={{fontFamily:"Candara"}}>Candara</option>
                     <option value={"Futara"} style={{fontFamily:"Futara"}}>Futara</option>
                     <option value={"Franklin Gothic Medium"} style={{fontFamily:"Franklin Gothic Medium"}}>Franklin Gothic Medium</option>
                     <option value={"Geneva"} style={{fontFamily:"Geneva"}}>Geneva</option>
                     <option value={"Segoe UI"} style={{fontFamily:"Segoe UI"}}>Segoe UI</option>
                     {/* <!-- <opti{n disabled value="Serif" style={{background-color: aqua"}}>Serif</optin> --> */}
                     <option value={"Times New Roman"} style={{fontFamily:"Times New Roman"}}>Times New Roman</option>
                     <option value={"Bodoni MT"} style={{fontFamily:"Bodoni MT"}}>Bodoni MT</option>
                     <option value={"Book Antiqua"} style={{fontFamily:"Book Antiqua"}}>Book Antiqua</option>
                     <option value={"Bookman"} style={{fontFamily:"Bookman"}}>Bookman</option>
                     <option value={"Calisto MT"} style={{fontFamily:"Calisto MT"}}>Calisto MT</option>
                     <option value={"Cambria"} style={{fontFamily:"Cambria"}}>Cambria</option>
                     <option value={"Garamond"} style={{fontFamily:"Garamond"}}>Garamond</option>
                     <option value={"Georgia"} style={{fontFamily:"Georgia"}}>Georgia</option>
                     <option value={"Goudy Old Style"} style={{fontFamily:"Goudy Old Style"}}>Goudy Old Style</option>
                     <option value={"Hoefler Text"} style={{fontFamily:"Hoefler Text"}}>Hoefler Text</option>
                     <option value={"Lucida Bright"} style={{fontFamily:"Lucida Bright"}}>Lucida Bright</option>
                     <option value={"Perpetua"} style={{fontFamily:"Perpetua"}}>Perpetua</option>
                     <option value={"Rockwell"} style={{fontFamily:"Rockwell"}}>Rockwell</option>
                     <option value={"Rockwell Extra Bold"} style={{fontFamily:"Rockwell Extra Bold"}}>Rockwell Extra Bold</option>
                     <option value={"Baskerville"} style={{fontFamily:"Baskerville"}}>Baskerville</option>
                     {/* <!-- <opti{n disabled value="Monospace" style={{background-color: aqua"}}>Monospace</optin>     --> */}
                     <option value={"Consolas"} style={{fontFamily:"Consolas"}}>Consolas</option>
                     <option value={"Courier"} style={{fontFamily:"Courier"}}>Courier</option>
                     <option value={"Courier New"} style={{fontFamily:"Courier New"}}>Courier New</option>
                     <option value={"Lucida Console"} style={{fontFamily:"Lucida Console"}}>Lucida Console</option>
                     <option value={"Lucidatypewriter"} style={{fontFamily:"Lucidatypewriter"}}>Lucidatypewriter</option>
                     <option value={"Lucida Sans Typewriter"} style={{fontFamily:"Lucida Sans Typewriter"}}>Lucida Sans Typewriter</option>
                     <option value={"Monaco"} style={{fontFamily:"Monaco"}}>Monaco</option>
                     <option value={"Andale Mono"} style={{fontFamily:"Andale Mono"}}>Andale Mono</option>
                     {/* <!-- <option disabled value="Cursive" style={{background-color: aqua"}}>Cursive</option>     --> */}
                     <option value={"Comic Sans"} style={{fontFamily:"Comic Sans"}}>Comic Sans</option>
                     <option value={"Comic Sans MS"} style={{fontFamily:"Comic Sans MS"}}>Comic Sans MS</option>
                     <option value={"Brush Script MT"} style={{fontFamily:"Brush Script MT"}}>Brush Script MT</option>
                     <option value={"Snell Roundhan"} style={{fontFamily:"Snell Roundhan"}}>Snell Roundhan</option>
                     <option value={"Coronet script"} style={{fontFamily:"Coronet script"}}>Coronet script</option>
                     <option value={"Parkavenue"} style={{fontFamily:"Parkavenue"}}>Parkavenue</option>
                     <option value={"Zapf Chancery"} style={{fontFamily:"Zapf Chancery"}}>Zapf Chancery</option>
                     {/* <option di{abled value="Fantasy Font" style={{background-color: aqua"}}>Fantasy Font</option>     --> */}
                     <option value={"Impact"} style={{fontFamily:"Impact"}}>Impact</option>
                     <option value={"Brushstroke"} style={{fontFamily:"Brushstroke"}}>Brushstroke</option>
                     <option value={"Stencil Std"} style={{fontFamily:"Stencil Std"}}>Stencil Std</option>
                     <option value={"papyrus"} style={{fontFamily:"papyrus"}}>papyrus</option>
                     {/* <option di{abled value="More Fonts" style={{background-color: aqua"}}>More Fonts</option>     --> */}
                     <option value={"Calibri"} style={{fontFamily:"Calibri"}}>Calibri</option>
                     <option value={"Calibri Light"} style={{fontFamily:" Calibri Light"}}>Calibri Light</option>
                     <option value={"Agency FB"} style={{fontFamily:"Agency FB"}}>Agency FB</option>
                     <option value={"Algerian"} style={{fontFamily:"Algerian"}}>Algerian</option>
                     <option value={"Arial"} style={{fontFamily:"Arial"}}>Arial</option>
                     <option value={"Arial Black"} style={{fontFamily:"Arial Black"}}>Arial Black</option>
                     <option value={"Bahnschrift"} style={{fontFamily:"Bahnschrift"}}>Bahnschrift</option>
                     <option value={"Bahnschrift Condensed"} style={{fontFamily:"Bahnschrift Condensed"}}>Bahnschrift Condensed</option>
                     <option value={"Bahnschrift Light"} style={{fontFamily:"Bahnschrift Light"}}>Bahnschrift Light</option>
                     <option value={"Bahnschrift SemiBold"} style={{fontFamily:"Bahnschrift SemiBold"}}>Bahnschrift SemiBold</option>
                     <option value={"Baskerville Old Face"} style={{fontFamily:"Baskerville Old Face"}}>Baskerville Old Face</option>
                     <option value={"Arial Nova"} style={{fontFamily:"Arial Nova"}}>Arial Nova</option>
                     <option value={"Calisto MT"} style={{fontFamily:"Calisto MT"}}>Calisto MT</option>
                     <option value={"Cambodian"} style={{fontFamily:"Cambodian"}}>Cambodian</option>
                     <option value={"Cambria"} style={{fontFamily:"Cambria"}}>Cambria</option>
                     <option value={"Constantia"} style={{fontFamily:"Constantia"}}>Constantia</option>
                     <option value={"Copperplate Gothic Light"} style={{fontFamily:"Copperplate Gothic Light"}}>Copperplate Gothic Light</option>
                     <option value={"Corbel"} style={{fontFamily:"Corbel"}}>Corbel</option>
                     <option value={"Cordia New"} style={{fontFamily:"Cordia New"}}>Cordia New</option>
                     <option value={"Ebrima"} style={{fontFamily:"Ebrima"}}>Ebrima</option>
                     <option value={"Franklin Gothic Medium"} style={{fontFamily:"Franklin Gothic Medium"}}>Franklin Gothic Medium</option>
                     <option value={"Gabriola"} style={{fontFamily:"Gabriola"}}>Gabriola</option>
                     <option value={"Gadugi"} style={{fontFamily:"Gadugi"}}>Gadugi</option>
                     <option value={"Garamond"} style={{fontFamily:"Garamond"}}>Garamond</option>
                     <option value={"Gautami"} style={{fontFamily:"Gautami"}}>Gautami</option>
                     <option value={"Georgia Pro"} style={{fontFamily:"Georgia Pro"}}>Georgia Pro</option>
                     <option value={"Goudy Old Style"} style={{fontFamily:"Goudy Old Style"}}>Goudy Old Style</option>
                     <option value={"Gulim"} style={{fontFamily:"Gulim"}}>Gulim</option>
                     <option value={"Ink Free"} style={{fontFamily:"Ink Free"}}>Ink Free</option>
                     <option value={"Japanese"} style={{fontFamily:"Japanese"}}>Japanese</option>
                     <option value={"Javanese Text"} style={{fontFamily:"Javanese Text"}}>Javanese Text</option>
                     <option value={"Leelawadee"} style={{fontFamily:"Leelawadee"}}>Leelawadee</option>
                     <option value={"Leelawadee UI"} style={{fontFamily:"Leelawadee UI"}}>Leelawadee UI</option>
                     <option value={"Leelawadee UI Semilight"} style={{fontFamily:"Leelawadee UI Semilight"}}>Leelawadee UI Semilight</option>
                     <option value={"Levenim MT"} style={{fontFamily:"Levenim MT"}}>Levenim MT</option>
                     <option value={"Lucida Console"} style={{fontFamily:"Lucida Console"}}>Lucida Console</option>
                     <option value={"Lucida Handwriting"} style={{fontFamily:"Lucida Handwriting"}}>Lucida Handwriting</option>
                     <option value={"Lucida Sans"} style={{fontFamily:"Lucida Sans"}}>Lucida SansLucida Sans Typewriter</option>
                     <option value={"Lucida Sans Typewriter"} style={{fontFamily:"Lucida Sans Typewriter"}}>Lucida Sans Typewriter</option>
                     <option value={"Lucidatypewriter"} style={{fontFamily:"Lucidatypewriter"}}>Lucidatypewriter</option>
                     <option value={"Malgun Gothic"} style={{fontFamily:"Malgun Gothic"}}>Malgun Gothic</option>
                     <option value={"Microsoft Himalaya"} style={{fontFamily:"Microsoft Himalaya"}}>Microsoft Himalaya</option>
                     <option value={"Microsoft JhengHei"} style={{fontFamily:"Microsoft JhengHeiMicrosoft JhengHei UI"}}>Microsoft JhengHeiMicrosoft JhengHei UI</option>
                     <option value={"Microsoft JhengHei UI"} style={{fontFamily:"Microsoft JhengHei UI"}}>Microsoft JhengHei UI</option>
                     <option value={"Microsoft New Tai Lue"} style={{fontFamily:"Microsoft New Tai Lue"}}>Microsoft New Tai Lue</option>
                     <option value={"Microsoft PhagsPa"} style={{fontFamily:"Microsoft PhagsPa"}}>Microsoft PhagsPa</option>
                     <option value={"Microsoft Sans Serif"} style={{fontFamily:"Microsoft Sans Serif"}}>Microsoft Sans Serif</option>
                     <option value={"Microsoft Tai Le"} style={{fontFamily:"Microsoft Tai Le"}}>Microsoft Tai Le</option>
                     <option value={"Microsoft Uighur"} style={{fontFamily:"Microsoft Uighur"}}>Microsoft Uighur</option>
                     <option value={"Microsoft YaHei"} style={{fontFamily:"Microsoft YaHei"}}>Microsoft YaHei</option>
                     <option value={"Microsoft YaHei UI"} style={{fontFamily:"Microsoft YaHei UI"}}>Microsoft YaHei UI</option>
                     <option value={"Microsoft Yi Baiti"} style={{fontFamily:"Microsoft Yi Baiti"}}>Microsoft Yi Baiti</option>
                     <option value={"MingLiU_HKSCS-ExtB"} style={{fontFamily:"MingLiU_HKSCS-ExtB"}}>MingLiU_HKSCS-ExtB</option>
                     <option value={"MingLiU-ExtB"} style={{fontFamily:"MingLiU-ExtB"}}>MingLiU-ExtB</option>
                     <option value={"MS Gothic"} style={{fontFamily:"MS Gothic"}}>MS Gothic</option>
                     <option value={"MS PGothic"} style={{fontFamily:"MS PGothic"}}>MS PGothic</option>
                     <option value={"MS PMincho"} style={{fontFamily:"MS PMincho"}}>MS PMincho</option>
                     <option value={"MS UI Gothic"} style={{fontFamily:"MS UI Gothic"}}>MS UI Gothic</option>
                     <option value={"MV Boli"} style={{fontFamily:"MV Boli"}}>MV Boli</option>
                     <option value={"Myanmar Text"} style={{fontFamily:"Myanmar Text"}}>Myanmar Text</option>
                     <option value={"Nirmala UI"} style={{fontFamily:"Nirmala UI"}}>Nirmala UI</option>
                     <option value={"NSimSun"} style={{fontFamily:"NSimSun"}}>NSimSun</option>
                     <option value={"Optima"} style={{fontFamily:"Optima"}}>Optima</option>
                     <option value={"Palatino Linotype"} style={{fontFamily:"Palatino LinotypePerpetua"}}>Palatino LinotypePerpetua</option>
                     <option value={"Perpetua"} style={{fontFamily:"Perpetua"}}>Perpetua</option>
                     <option value={"Segoe Print"} style={{fontFamily:"Segoe Print"}}>Segoe Print</option>
                     <option value={"Segoe Script"} style={{fontFamily:"Segoe Script"}}>Segoe Script</option>
                     <option value={"Segoe UI"} style={{fontFamily:"Segoe UI"}}>Segoe UI</option>
                     <option value={"Segoe UI Emoji"} style={{fontFamily:"Segoe UI Emoji"}}>Segoe UI Emoji</option>
                     <option value={"Segoe UI Historic"} style={{fontFamily:"Segoe UI Historic"}}>Segoe UI Historic</option>
                     <option value={"Segoe UI Symbol"} style={{fontFamily:"Segoe UI Symbol"}}>Segoe UI Symbol</option>
                     <option value={"SimSun"} style={{fontFamily:"SimSun"}}>SimSun</option>
                     <option value={"SimSun-ExtB"} style={{fontFamily:"SimSun-ExtB"}}>SimSun-ExtB</option>
                     <option value={"Sylfaen"} style={{fontFamily:"Sylfaen"}}>Sylfaen</option>
                     <option value={"Tahoma"} style={{fontFamily:"Tahoma"}}>Tahoma</option>
                     <option value={"Thai"} style={{fontFamily:"Thai"}}>Thai</option>
                     <option value={"Times New Roman"} style={{fontFamily:"Times New Roman"}}>Times New Roman</option>
                     <option value={"Traditional Arabic"} style={{fontFamily:"Traditional Arabic"}}>Traditional Arabic</option>
                     <option value={"Trebuchet MS"} style={{fontFamily:"Trebuchet MS"}}>Trebuchet MS</option>
                  </select>
                  </div>
               </div>
            </div>
            <div className="createNoteButtonDiv">
               <div className="createNoteButton unselectable" onClick={()=>{createNote()}} id="createNoteButton" >Create Note</div>
            </div>
         </div>
            <div id="snackbar"></div>
            {/* <SnackBar /> */}
        </div>
      {/* ***************LEFT SIDE BAR ELEMENTS RENDER ENDS **************** */}

       {/* *************RIGHT SIDE BAR ELEMENTS STARTS *********** */}
         <div className="rightSideBar unselectable">
            <div className="notesHeadDiv unselectable"><h1>Notes</h1></div>
            <div className="notesContainer unselectable">
               <div className="notesInnerContainer unselectable">
                  {(userData == null || (userData.user_notes_data.length === 0)) && <div className='noNotes'>Sorry No Notes Found Add Note Or Login</div>}
                  {userData != null && userData.user_notes_data.map((note, i) => {
                     return (
                        <div key={i} id={`NOTE_ID_`+i} className="eachNote unselectable">
                           <div className="eachNoteTitle unselectable">{note.title}</div>
                           <div className="eachNoteDesc unselectable">{note.description}</div>
                           <div className="eachNoteButtons">
                              <div className="eachNoteBtn shareBtn unselectable" style={{"display":"none"}}><img src="./images/shareBtn.png" alt="" className='shareBtnImg' /></div>
                              <div className="eachNoteBtn editBtn unselectable" style={{"display":"none"}}><img src="./images/editButton.png" alt="" className="editBtnImg"/></div>
                              <div className="eachNoteBtn deleteBtn unselectable" onClick={()=>{deleteNote(userData.user_email, note._id) }}><img src="./images/deleteButton.png" alt="" className='deleteBtnImg' /></div>
                              <div className="eachNoteBtn copyBtn unselectable" onClick={()=>{copyNoteTextAndTitle(note.title,note.description)}}><img src="./images/copy.png" alt="" className='copyBtnImg' /></div>
                           </div>
                        </div>
                     )
                  })}
               </div>
            </div>
         </div>
       {/* *************RIGHT SIDE BAR ELEMENTS ENDS *********** */}
      </div>
  )
}
