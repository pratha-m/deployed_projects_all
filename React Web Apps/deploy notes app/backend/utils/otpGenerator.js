const generateOtp=(length)=>{
    let otp='';
    const characters='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for(let i=0;i<length;i++){
      const index=Math.floor(Math.random() * characters.length);
      otp=otp+characters[index];
    }
    return otp;
}
module.exports=generateOtp;