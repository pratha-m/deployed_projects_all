const sendEmail=(toEmail,subjectEmail,htmlEmail,registeredUser,res)=>{
    const nodemailer=require("nodemailer")
    let mailTransporter=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        service:"gmail",
        auth:{
            user:"jsnode02@gmail.com",
            pass:"wikjmcsckqpcwlnf"
        }
    })
    let details={
        from:"jsnode02@gmail.com",
        to:"prathamchhabra85@gmail.com",
        subject:"forgpt otp",
        text:"new text",
        html:`<h1>hfhhfj</h1>`
    }
    mailTransporter.sendMail(details,async(error)=>{
        if(error){
            console.log("mail error",error);
            res.status(500).send({success:"false",error:"Sorry This Email Not Exists"});
        }
        else{
            console.log("email has send successfully")
            // res.status(200).send({success:"true"});
            const registered=await registeredUser.save();
            res.status(200).send({success:"true",data:registered})
        }
    })            
}
module.exports=sendEmail;