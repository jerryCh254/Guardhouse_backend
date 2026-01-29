const Company = require('../../Models/company/companyModel.js');
const CompanySchema = require('../../dto/company/company.dto.js');
const bcrypt = require("bcrypt");
const {notifyCompanyRejection,notifyCompanyApproval,notifySuperAdmin} = require('../../config/email.js');
const jwt = require('jsonwebtoken')
const {JWT}= require('../../config/env.js');
const crypto = require('crypto');


exports.companyRegister = async(req,res)=>{
    try{
        const {error,value} = CompanySchema.validate(req.body);
        if(error){
            return res.status(400).json({messaage:"Feilds does't match",error})
        }

        const {companyEmail,status} = req.body;
        const existingCompany = await Company.findOne({companyEmail});
        if(existingCompany){
            return res.status(401).json({message:"Company already registered"});
        }
        const newCompany = await Company.create(value)
        
        return res.status(201).json({
            message:"Company is created sucessfully",
            data:newCompany,
            status:newCompany.req
        })
    }
    catch(err){
        console.error("Registrion error:", err);
    res.status(500).json({ message: "Server error ", error: err.message });
    }
}
//Update Status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const Id = req.params.id;

    if (!status) {
      return res.status(400).json({ message: "Status should be given" });
    }

    const company = await Company.findOne({ _id: Id });
    if (!company) {
      return res.status(400).json({ message: "Company not Found" });
    }

    company.status = status; // update status

    // Scenario: Company Approved / ACTIVE
    if (status === "ACTIVE") {
      const plainPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      company.password = hashedPassword;

      const emailSent = await notifyCompanyApproval(company.companyEmail, plainPassword);

      await company.save();

      if (emailSent) {
        return res.status(200).json({ message: "Company approved & email sent successfully" });
      } else {
        return res.status(200).json({ message: "Company approved but email not sent" });
      }
    }

    // Scenario: Company Rejected
    if (status === "REJECTED") {
      const emailSent = await notifyCompanyRejection(company.companyEmail, company.companyName);

      await company.save();

      if (emailSent) {
        return res.status(200).json({ message: "Company rejected & email sent successfully" });
      } else {
        return res.status(200).json({ message: "Company rejected but email not sent" });
      }
    }

    // If some other status
    await company.save();
    return res.status(200).json({ message: `Company status updated to ${status}` });

  } catch (err) {
    console.error("UpdateStatus error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//Company login
exports.companyLogin = async(req,res)=>{
    try{
         const { companyEmail, password } = req.body;
        
            if (!companyEmail || !password) {
              return res.status(401).json({ message: "Email aur password is required." });
            }
        
            const company = await Company.findOne({companyEmail}).select("+pasword");
            if (!company) {
              return res.status(401).json({ message: "Email not exist"});
            }
             if (company.status !== 'ACTIVE') {
              return res.status(401).json({ message: "Company is not active" });
            }
            
        
            const isMatch = await bcrypt.compare(password, company.password);
            if (!isMatch) {
              return res.status(401).json({ message: "Invalid email or password." });
            }
            
                const token = jwt.sign(
                {
                    id: Company._id,
                    email: Company.email,
                },
                JWT,
                { expiresIn: "1h" }
            );
        
            return res.status(200).json({
              message: "Login successful ",
              token,
              id: company._id,
              companyEmail: company.companyEmail,
              CompanyName: company.companyName,
              password:company.password
          
            });
    }
    catch(err){
         console.error("Registrion error:", err);
    res.status(500).json({ message: "Server error ", error: err.message });
    }
}
//forget password
exports.companyForgetPassword = async(req,res)=>{
     try{
    const {companyEmail} = req.body;
    const company = await Company.findOne({companyEmail})
    if(!company){
      return res.status(404).json({message:"Email not found"});
    }
    const resetToken = await crypto.randomBytes(40).toString('hex');
    company.resetToken = resetToken;
    company.ResetTokenExpire = Date.now()+10*60*1000;
    await company.save();

    const sendMail = await notifySuperAdmin(company.companyEmail);
            if(sendMail){
                return res.status(200).json({message:"Email is sent sucessfully"});
            }
            else{
                return res.status(200).json({message:"Email  is not send"});
            }
  }
  catch (err) {
    console.error("Actual error:", err);  
    return res.status(500).json({ message: "Server errors", error: err.message || err });
}
}
//REQUEST FORGET PASSWORD APPROVE OR REJECT
exports.requestPassword = async(req,res)=>{
try{
     const Id = req.params.id;
        const company = await Company.findOne({ _id: Id });
        if(!company){
            return res.status(400).json({message:"Company not Found"});
        }
        if (company.status !== 'ACTIVE') {
              return res.status(401).json({ message: "Company is not active" });
            }

}
catch(err){  
     console.error("Actual error:", err);  
    return res.status(500).json({ message: "Server errors", error: err.message || err });
}
}
exports.getAllCompanies = async (req, res) => {
    try {
        const status = req.params.status || req.query.status;         

        let filter = {};
        if (status) {
            filter.status = status.toUpperCase();  
        }

        const companies = await Company.find(filter).select('-password -__v');        

        return res.status(200).json({
            message: "Successfully fetched companies",
            count: companies.length,
            companies
        });
    } catch (error) {
        console.error("Get companies error:", error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};
