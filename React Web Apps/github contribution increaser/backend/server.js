const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const cron = require('node-cron');
const { sendEmail } = require("./helper/sendEmail");

const app=express();

cron.schedule("* * * * *",()=>{
   sendEmail(process.env.TO_EMAIL);
})

app.listen(3001,()=>{
   console.log("Lsitening at port 3001");
})