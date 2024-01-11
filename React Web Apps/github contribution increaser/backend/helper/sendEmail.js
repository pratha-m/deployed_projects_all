const  nodemailer=require("nodemailer");

exports.sendEmail=async(email)=>{
    try{
        let transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
              user:process.env.FROM_EMAIL,
              pass:process.env.FROM_PASSWORD
            }
        })
    
        let mailOptions={
            from:process.env.FROM_EMAIL,
            to:email,
            subject:"Email Sent ",
            html:`Email sent after 24 hours`
        }
    
        await transporter.sendMail(mailOptions);
    
        console.log("Email Sent Successfully");
    }
    catch(error){
        console.log("Erorr in senting email "+error.message);
    }
}
