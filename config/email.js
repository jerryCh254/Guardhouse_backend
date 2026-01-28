const nodemailer = require("nodemailer");
const ResetLink = `${process.env.FRONTURL}/admin/password-reset-requests`;

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
async function sendResetPasswordEmail(email, token) {
  try {
    const resetLink = `${process.env.FRONTURL}/reset-password/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      text: `You requested a password reset.
Click the link below to reset your password:
${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
    return true;

  } catch (err) {
    console.error(err);
    return false;
  }
}
//after super approves company 

async function notifyCompanyApproval(email,plainPassword){
  try{
    const mailerOption ={
      from: process.env.EMAIL_USER,
       to: email,
        subject: "Guard House Account Approved",
        text: `Your account has been approved.\nEmail: ${email}\nPassword: ${plainPassword}`
      }
      const info = await transporter.sendMail(mailerOption);
      console.log("Approved email is send",info.message);
      return true;
  }
  catch(err){
       console.error("Actual error:", err);  
    return false;
  }
}
//after companies got reject
async function notifyCompanyRejection(email){
  try{
    const mailerOption ={
      from: process.env.EMAIL_USER,
       to: email,
       subject: "Guard House Account Request - Rejected",    
       text: `Your account has been rejected.\nEmail: ${email}`
      }
      const info = await transporter.sendMail(mailerOption);
      console.log("Approved email is send",info.message);
      return true;
  }
  catch(err){
       console.error("Actual error:", err);  
    return false;
  }
}
//request of forget passoword
async function notifySuperAdmin(companyEmail){
  try{
    const mailerOption ={
      
      from:process.env.EMAIL_USER,
      to:process.env.SUPER_ADMIN,
      subject:'New Password Reset Request',
      text:`Company ${companyEmail} has sent forget password request. 
Approve/reject open super admin panel to accept or reject ${ResetLink} `
      }
      const info = await transporter.sendMail(mailerOption);
      console.log("Approved email is send",info.message);
      return true;
  }
  catch(err){
       console.error("Actual error:", err);  
    return false;
  }
}


module.exports = {notifyCompanyRejection,notifyCompanyApproval,notifySuperAdmin,sendResetPasswordEmail};
