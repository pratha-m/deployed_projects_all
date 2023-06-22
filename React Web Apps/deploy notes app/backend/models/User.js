const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
   user_email:{
      type:String
   },
   user_password:{
      type:String
   },
   user_notes_data:{
      type:[
         {
            title:{
               type:String
            },
            description:{
               type:String
            }
         }
      ]
   }
})
const user=new mongoose.model("user",userSchema);
module.exports=user;