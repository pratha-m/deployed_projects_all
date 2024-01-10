const {Server}=require("socket.io");

const users=[];

const io=new Server({
    cors:{
        origin:"*"
    }
});

io.on("connection",(socket)=>{
    socket.on("user:joined",(userData)=>{      
       const {name,email}=userData;
       const findEmailIndex=users.findIndex((eachUser)=>{return eachUser.email===email});
       if(findEmailIndex===-1) users.push({name,email,id:socket.id}); 
       socket.broadcast.emit("user:joined:msg",name);
    })
    socket.on("user:send:msg",(userMsg)=>{
        const findUser=users.filter((eachUser)=>{
            return eachUser.id===socket.id; 
        })
        socket.broadcast.emit("user:recieve:msg",{
         message:userMsg.message,
         name:findUser[0].name
        });
    })
})
io.listen(3001,()=>{
    console.log("Server Connected");
})