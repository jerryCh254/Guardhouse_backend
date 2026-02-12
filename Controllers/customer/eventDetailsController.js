const EventDetails = require('../../models/customer/eventDetailsModel');
const Customer = require('../../models/customer/customerModel');

class eventDetailsController {
    // Create Event Details
    static async createEventDetails(req, res) {
        try {
            const { customerId } = req.params;
            const { abn, businessContactNumber, businessAddress } = req.body;
            
            const customer = await Customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
                        const existingEventDetails = await EventDetails.findOne({ customer: customerId });
            if (existingEventDetails) {
                return res.status(400).json({ message: "Event details already exist for this customer" });
            }
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
                businessAddress
            });
                        await Customer.findByIdAndUpdate(customerId, {
                eventDetails: newEventDetails._id
            });
            
            return res.status(201).json({
                message: "Event details created successfully",
                data: newEventDetails,
            });
        }
        catch (error) {
            console.error('Create Event Details Error:', error);
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
    
    // Delete Event Details
    static async deleteEventDetails(req, res) {
        try {
            const { id } = req.params;
            const eventDetails = await EventDetails.findByIdAndDelete(id);
            
            if (!eventDetails) {
                return res.status(404).json({ message: "Event details not found" });
            }
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
