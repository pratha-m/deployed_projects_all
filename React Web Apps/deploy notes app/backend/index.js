require('dotenv').config()
const mongoose=require('mongoose');
const express=require("express");
const app=express();
const User=require("./models/User");
const otpGenerator=require("./utils/otpGenerator");
const cors=require("cors");
const port=process.env.PORT || 5000;
const jwt=require("jsonwebtoken");

mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("database connection succeded")})
.catch((error)=>{console.log("database connection not succeded",error)})    

app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cors());

let otp;
let registeredUser;
app.post("/createuser",async(req,res)=>{
        try{
            const findEmail=await User.find({user_email:req.body.user_email});
            if(findEmail[0]==undefined){
                registeredUser=new User({
                    user_email:req.body.user_email,
                    user_password:req.body.user_password
                })
               const nodemailer=require("nodemailer")
               otp=otpGenerator(5);
               let mailTransporter=nodemailer.createTransport({
                   host:"smtp.gmail.com",
                   port:587,
                   secure:false,
                   service:"gmail",
                   auth:{
                       user:process.env.FROM_EMAIL,
                       pass:process.env.FROM_EMAIL_PASSWORD
                   }
               })
               let details={
                   from:process.env.FROM_EMAIL,
                   to:req.body.user_email,
                   subject:"Email Verification",
                   text:"Sent otp",
                   html:`<h1>OTP Is : ${otp}</h1>`
               }   
               mailTransporter.sendMail(details,async(error)=>{
                   if(error){
                       res.status(200).send({success:"false",error:"otherError"});
                   }
                   else{
                      res.status(200).send({success:"true"})
                   }
               })     
               
            }
            else{
                res.status(200).send({success:"false",error:"duplicateUser"})
            }
        }
        catch(error){
           res.status(500).send({success:"false",error:"otherError"}); 
        }
})
app.post("/checkotp",async(req,res)=>{
    if(otp!=undefined){
        let userOtp=req.body.otp;
        if(userOtp==otp){ 
           const registered=await registeredUser.save();  
           res.status(200).send({success:"true",data:registered});
        }
        else{
            res.status(200).send({success:"false",error:"otpIncorrect"});
        }
    }
})
app.post("/login",async(req,res)=>{
    try{
        let email=req.body.user_email;
        let password=req.body.user_password;
        let findEmailData=await User.findOne({user_email:email});
        if(findEmailData!=null){
            if(findEmailData.user_password==password){
                let userData={user_email:email};
                let userDataToken=jwt.sign(userData,process.env.TOKEN_PASSWORD,{expiresIn:"182 days"});
                res.status(200).send({success:"true",user_data:userDataToken});
            }
            else{
                res.status(200).send({success:"false",error:"passwordIncorrect"})
            }
        }
        else{
            res.status(200).send({success:"false",error:"userNotExists"});
        }
    }
    catch(e){
        res.status(200).send({success:"false",error:"otherError"});
    }
})
app.post("/decodetoken",async(req,res)=>{
    try{
        let token=req.body.user_token;
        let decodedToken=jwt.verify(token,process.env.TOKEN_PASSWORD);
        res.status(200).send({success:"true",data:decodedToken});
    }
    catch(e){
        res.status(200).send({success:"false",error:"tokenError"});
    }
})
app.post("/createnote",async(req,res)=>{
    try{
        const noteTitle=req.body.title;
        const noteDescription=req.body.description;
        const userEmail=req.body.user_email;
        const findDocByEmail=await User.findOne({user_email:userEmail});
        if(findDocByEmail!=null){
           findDocByEmail.user_notes_data.push({title:noteTitle,description:noteDescription});
           findDocByEmail.save();
           res.status(200).send({success:"true",data:findDocByEmail});
        }
        else{
           res.status(200).send({success:"false",error:"clearCookies"})
        }
    }
    catch(e){
        res.status(200).send({success:"false",error:"otherError"})
    }
})
app.post("/showuserdata",async(req,res)=>{
    try{
        let userEmail=req.body.user_email;
        let docFindByEmail=await User.findOne({user_email:userEmail});
        if(docFindByEmail!=null){
            res.status(200).send({success:"true",data:docFindByEmail});
        } 
    }
    catch(e){
        res.status(200).send({success:"false",error:"otherError"})
    }
})
app.post("/deletenote",async(req,res)=>{
    try{
        let noteId=req.body.noteid;
        let email=req.body.user_email;
        User.findOneAndUpdate(
            {user_email:email},
            {$pull:{user_notes_data:{ _id:noteId}}},(err)=>{
                 if(err){
                    return res.status(200).send({success:"false",error:"error In deleting"})
                 }
                 return res.status(200).send({success:"true"})
            }
        );
    }
    catch(e){
        res.status(200).send({success:"false",error:"otherError"})
    }
})
app.get("/getdata",async(req, res) => {
    try{
        let data=await User.find();
        res.status(200).send({success:"true",message:data})
    }
    catch(e){
        res.status(200).send({success:"false",message:"sorry not"})
    }
})

app.listen(port,()=>{
    console.log(`Connection Succeded at port ${port}`);
})