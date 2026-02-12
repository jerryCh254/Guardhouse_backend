const EventDetails = require('../../models/customer/eventDetailsModel');

class MasterLicenseController {
    // Add Master License to Event Details
    static async addMasterLicense(req, res) {
        try {
            const { eventDetailsId } = req.params;
            const { state, licenseNumber } = req.body;
            
            if (!state || !licenseNumber) {
                return res.status(400).json({ message: "State and license number are required" });
            }
            
            // Check if event details exist
            const eventDetails = await EventDetails.findById(eventDetailsId);
            if (!eventDetails) {
                return res.status(404).json({ message: "Event details not found" });
            }
            
            // Add master license
            const updatedEventDetails = await EventDetails.findByIdAndUpdate(
                eventDetailsId,
                {
                    $push: {
                        masterLicenses: { state, licenseNumber }
                    }
                },
                { new: true }
            ).populate("customer", "customerName customerReferenceNumber email city country");
            
            res.status(201).json({
                message: "Master license added successfully",
                data: updatedEventDetails
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    // Get All Master Licenses for Event Details
    static async getMasterLicenses(req, res) {
        try {
            const { eventDetailsId } = req.params;
            
            const eventDetails = await EventDetails.findById(eventDetailsId)
                .select('masterLicenses')
                .populate("customer", "customerName customerReferenceNumber");
            
            if (!eventDetails) {
                return res.status(404).json({ message: "Event details not found" });
            }
            
            res.status(200).json({
                message: "Master licenses fetched successfully",
                data: eventDetails.masterLicenses
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    // Update Master License
    static async updateMasterLicense(req, res) {
        try {
            const { eventDetailsId, licenseId } = req.params;
            const { state, licenseNumber } = req.body;
            
            if (!state || !licenseNumber) {
                return res.status(400).json({ message: "State and license number are required" });
            }
            
            const eventDetails = await EventDetails.findById(eventDetailsId);
            if (!eventDetails) {
                return res.status(404).json({ message: "Event details not found" });
            }
            
            // Find and update the specific master license
            const licenseIndex = eventDetails.masterLicenses.findIndex(
                license => license._id.toString() === licenseId
            );
            
            if (licenseIndex === -1) {
                return res.status(404).json({ message: "Master license not found" });
            }
            
            eventDetails.masterLicenses[licenseIndex] = { state, licenseNumber };
            await eventDetails.save();
            
            const updatedEventDetails = await EventDetails.findById(eventDetailsId)
                .populate("customer", "customerName customerReferenceNumber email city country");
            
            res.status(200).json({
                message: "Master license updated successfully",
                data: updatedEventDetails
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    // Delete Master License
    static async deleteMasterLicense(req, res) {
        try {
            const { eventDetailsId, licenseId } = req.params;
            
            const eventDetails = await EventDetails.findById(eventDetailsId);
            if (!eventDetails) {
                return res.status(404).json({ message: "Event details not found" });
            }
            
            // Remove the specific master license
            eventDetails.masterLicenses = eventDetails.masterLicenses.filter(
                license => license._id.toString() !== licenseId
            );
            
            await eventDetails.save();
            
            const updatedEventDetails = await EventDetails.findById(eventDetailsId)
                .populate("customer", "customerName customerReferenceNumber email city country");
            
            res.status(200).json({
                message: "Master license deleted successfully",
                data: updatedEventDetails
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = MasterLicenseController;
