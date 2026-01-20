const Company = require('../Models/company.Model');
const CompanySchema = require('../dto/company.dto');
const bcrypt = require("bcrypt");
const transport = require('../config/email.js');

exports.CompanyRegister = async(req,res)=>{
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
exports.UpdateStatus = async(req,res)=>{
    try{
        const {status} = req.body;
         const Id = req.params.id;
        if(!status){
            return res.status(400).json({message:"Status should be given"});
        }
        const company = await Company.findOne({ _id: Id });
        if(!company){
            return res.status(400).json({message:"Company not Found"});
        }
        company.status = status;
        if (status === "ACTIVE") {
            const plainPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(plainPassword, 10);
            company.password = hashedPassword;

            await transport.sendMail({
                
                to: company.companyEmail,
                subject: "Guard House Account Approved",
                text: `Your account has been approved.\nEmail: ${company.companyEmail}\nPassword: ${plainPassword}`
            });
        }

        await company.save();
    return res.status(200).json({message:"Email is sent sucessfully"});
    }

    catch(err){
         console.error("Registrion error:", err);
    res.status(500).json({ message: "Server error ", error: err.message });
    }
}
//Company login
exports.CompanyLogin = async(req,res)=>{
    try{
        
    }
    catch(err){
         console.error("Registrion error:", err);
    res.status(500).json({ message: "Server error ", error: err.message });
    }
}