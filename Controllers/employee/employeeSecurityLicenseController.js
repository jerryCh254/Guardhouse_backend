const employeeSecurityLicense = require('../../models/employee/employeeSecurityLicenseModel');
const Employee = require('../../models/employee/employeeModel');

class EmployeeSecurityLicenseController {
    //add security license
    static async addSecurityLicense(req, res) {
        try {
            const { employeeId } = req.params;
            const { licenseType, licenseNumber, expireDate, reminder, critical } = req.body;
            
            let attachFile = [];
            if (req.file) {
                attachFile = [{
                    fileName: req.file.originalname,
                    fileUrl: `/uploads/security-license/${req.file.filename}`,
                    uploadedAt: new Date()
                }];
            }
            
            const newSecurityLicense = await employeeSecurityLicense.create({
                licenseType,
                licenseNumber,
                expireDate,
                reminder,
                critical,
                attachFile,
                employeeId: employeeId
            });
            
            await Employee.findByIdAndUpdate(employeeId, {
                $push: { securityLicenses: newSecurityLicense._id }
            });
            
            return res.status(201).json({
                message: "Security license created successfully",
                data: newSecurityLicense,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //get security licenses 
    static async getSecurityLicenses(req, res) {
        try {
            const licenses = await employeeSecurityLicense.find()
                .populate("employeeId", "firstName lastName email");
            
            res.status(200).json({
                message: "Security licenses fetched successfully",
                data: licenses
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    //get security license by employee
    static async getSecurityLicensesByEmployee(req, res) {
        try {
            const { employeeId } = req.params;
            const licenses = await employeeSecurityLicense.find({ employeeId })
                .populate("employeeId", "firstName lastName email");
            
            res.status(200).json({
                message: "Employee security licenses fetched successfully",
                data: licenses
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    //get security license by ID
    static async getSecurityLicenseById(req, res) {
        try {
            const license = await employeeSecurityLicense.findById(req.params.id)
                .populate("employeeId", "firstName lastName email");
            
            if (!license) {
                return res.status(404).json({
                    message: "Security license not found"
                });
            }
            
            res.status(200).json({
                message: "Security license fetched successfully",
                data: license
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    //update security license
    static async updateSecurityLicense(req, res) {
        try {
            let updateData = { ...req.body };
            
            if (req.file) {
                updateData.attachFile = [{
                    fileName: req.file.originalname,
                    fileUrl: `/uploads/security-license/${req.file.filename}`,
                    uploadedAt: new Date()
                }];
            }
            
            const updateLicense = await employeeSecurityLicense.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }
            ).populate("employeeId", "firstName lastName email");
            
            res.json({
                message: "Security license updated successfully",
                data: updateLicense
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    //delete security license
    static async deleteSecurityLicense(req, res) {
        try {
            const deleteLicense = await employeeSecurityLicense.findByIdAndDelete(req.params.id);
            
            if (!deleteLicense) {
                return res.status(404).json({
                    message: "Security license not found"
                });
            }
            
            res.json({
                message: "Security license deleted successfully",
                data: deleteLicense
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = EmployeeSecurityLicenseController;