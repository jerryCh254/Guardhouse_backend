const EventDetails = require('../../models/customer/eventDetailsModel');
const Customer = require('../../models/customer/customerModel');

class eventDetailsController {
    // Create Event Details
    static async createEventDetails(req, res) {
        try {
            const { customerId } = req.params;
            const { abn, businessContactNumber, businessAddress, masterLicenses } = req.body;
            
            // Check if customer exists
            const customer = await Customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
            
            // Check if event details already exist for this customer
            const existingEventDetails = await EventDetails.findOne({ customer: customerId });
            if (existingEventDetails) {
                return res.status(400).json({ message: "Event details already exist for this customer" });
            }
            
            // Handle file uploads
            let leftHeaderLogo = {};
            let rightHeaderLogo = {};
            
            if (req.files) {
                if (req.files.leftHeaderLogo && req.files.leftHeaderLogo.length > 0) {
                    leftHeaderLogo = {
                        fileName: req.files.leftHeaderLogo[0].originalname,
                        fileUrl: `/uploads/event-details/${req.files.leftHeaderLogo[0].filename}`,
                        uploadedAt: new Date()
                    };
                }
                
                if (req.files.rightHeaderLogo && req.files.rightHeaderLogo.length > 0) {
                    rightHeaderLogo = {
                        fileName: req.files.rightHeaderLogo[0].originalname,
                        fileUrl: `/uploads/event-details/${req.files.rightHeaderLogo[0].filename}`,
                        uploadedAt: new Date()
                    };
                }
            }
            
            const newEventDetails = await EventDetails.create({
                customer: customerId,
                leftHeaderLogo,
                rightHeaderLogo,
                abn,
                businessContactNumber,
                businessAddress,
                masterLicenses: masterLicenses || []
            });
            
            // Add event details reference to customer
            await Customer.findByIdAndUpdate(customerId, {
                eventDetails: newEventDetails._id
            });
            
            return res.status(201).json({
                message: "Event details created successfully",
                data: newEventDetails,
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    // Get Event Details by Customer
    static async getEventDetailsByCustomer(req, res) {
        try {
            const { customerId } = req.params;
            const eventDetails = await EventDetails.findOne({ customer: customerId })
                .populate("customer", "customerName customerReferenceNumber email city country");
            
            if (!eventDetails) {
                return res.status(404).json({ message: "Event details not found for this customer" });
            }
            
            res.status(200).json({
                message: "Event details fetched successfully",
                data: eventDetails
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
    
    // Update Event Details
    static async updateEventDetails(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            
            // Handle file uploads if present
            if (req.files) {
                if (req.files.leftHeaderLogo && req.files.leftHeaderLogo.length > 0) {
                    updateData.leftHeaderLogo = {
                        fileName: req.files.leftHeaderLogo[0].originalname,
                        fileUrl: `/uploads/event-details/${req.files.leftHeaderLogo[0].filename}`,
                        uploadedAt: new Date()
                    };
                }
                
                if (req.files.rightHeaderLogo && req.files.rightHeaderLogo.length > 0) {
                    updateData.rightHeaderLogo = {
                        fileName: req.files.rightHeaderLogo[0].originalname,
                        fileUrl: `/uploads/event-details/${req.files.rightHeaderLogo[0].filename}`,
                        uploadedAt: new Date()
                    };
                }
            }
            
            const updatedEventDetails = await EventDetails.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            ).populate("customer", "customerName customerReferenceNumber email city country");
            
            if (!updatedEventDetails) {
                return res.status(404).json({ message: "Event details not found" });
            }
            
            res.json({
                message: "Event details updated successfully",
                data: updatedEventDetails
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    
    // Add Master License
    static async addMasterLicense(req, res) {
        try {
            const { id } = req.params;
            const { state, licenseNumber } = req.body;
            
            if (!state || !licenseNumber) {
                return res.status(400).json({ message: "State and license number are required" });
            }
            
            const updatedEventDetails = await EventDetails.findByIdAndUpdate(
                id,
                {
                    $push: {
                        masterLicenses: { state, licenseNumber }
                    }
                },
                { new: true }
            ).populate("customer", "customerName customerReferenceNumber email city country");
            
            if (!updatedEventDetails) {
                return res.status(404).json({ message: "Event details not found" });
            }
            
            res.json({
                message: "Master license added successfully",
                data: updatedEventDetails
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    
    // Update Master License
    static async updateMasterLicense(req, res) {
        try {
            const { id, licenseIndex } = req.params;
            const { state, licenseNumber } = req.body;
            
            const eventDetails = await EventDetails.findById(id);
            if (!eventDetails) {
                return res.status(404).json({ message: "Event details not found" });
            }
            
            if (licenseIndex >= eventDetails.masterLicenses.length) {
                return res.status(400).json({ message: "Invalid license index" });
            }
            
            eventDetails.masterLicenses[licenseIndex] = { state, licenseNumber };
            await eventDetails.save();
            
            const updatedEventDetails = await EventDetails.findById(id)
                .populate("customer", "customerName customerReferenceNumber email city country");
            
            res.json({
                message: "Master license updated successfully",
                data: updatedEventDetails
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    
    // Delete Master License
    static async deleteMasterLicense(req, res) {
        try {
            const { id, licenseIndex } = req.params;
            
            const eventDetails = await EventDetails.findById(id);
            if (!eventDetails) {
                return res.status(404).json({ message: "Event details not found" });
            }
            
            if (licenseIndex >= eventDetails.masterLicenses.length) {
                return res.status(400).json({ message: "Invalid license index" });
            }
            
            eventDetails.masterLicenses.splice(licenseIndex, 1);
            await eventDetails.save();
            
            const updatedEventDetails = await EventDetails.findById(id)
                .populate("customer", "customerName customerReferenceNumber email city country");
            
            res.json({
                message: "Master license deleted successfully",
                data: updatedEventDetails
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    
    // Delete Event Details
    static async deleteEventDetails(req, res) {
        try {
            const { id } = req.params;
            const eventDetails = await EventDetails.findByIdAndDelete(id);
            
            if (!eventDetails) {
                return res.status(404).json({ message: "Event details not found" });
            }
            
            // Remove event details reference from customer
            await Customer.findByIdAndUpdate(eventDetails.customer, {
                $unset: { eventDetails: 1 }
            });
            
            res.json({
                message: "Event details deleted successfully"
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = eventDetailsController;
