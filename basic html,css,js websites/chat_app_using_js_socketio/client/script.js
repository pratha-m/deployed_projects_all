import {io} from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";
const socket=io("http://localhost:3001");
const messageForm=document.getElementById("messageForm");
const name=prompt("Enter Name :");
const email=prompt("Enter Email :");

const addMessage=(message,position)=>{
     const chatsBox=document.getElementById("chatsBox");
     const element=document.createElement("p");
     element.textContent=message;
     element.classList.add(position);
     chatsBox.appendChild(element);
}
messageForm.addEventListener("submit",function(e){
    e.preventDefault();
    const messageInput=document.getElementById("message");
    if(messageInput.value===null || messageInput.value==='' || messageInput.value[0]===' ') alert("Pls Enter Something To Send ");
    else{
        socket.emit("user:send:msg",{message:messageInput.value})
        addMessage(`You: ${messageInput.value}`,"right");
        messageInput.value=null;
    }
})
socket.emit("user:joined",{name,email});
socket.on("user:joined:msg",name=>{
    addMessage(`${name} Joined the Chat`,"left");
})
socket.on("user:recieve:msg",(data)=>{
    addMessage(`${data.name}: ${data.message}`,"left")
})