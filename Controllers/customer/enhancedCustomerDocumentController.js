const EnhancedCustomerDocument = require('../../models/customer/enhancedCustomerDocumentModel');
const Customer = require('../../models/customer/customerModel');

class enhancedCustomerDocumentController {
    // Create Customer Document
    static async createDocument(req, res) {
        try {
            const { customerId } = req.params;
            const { 
                documentName, 
                documentType, 
                note, 
                allowStaffToView,
                requiresAcknowledgement,
                requiresSignature,
                requiresRenewal,
                renewalPeriod,
                acknowledgementDeadline
            } = req.body;
            
            // Check if customer exists
            const customer = await Customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
            
            // Handle file uploads
            let attachFile = [];
            if (req.files && req.files.length > 0) {
                attachFile = req.files.map(file => ({
                    fileName: file.originalname,
                    fileUrl: `/uploads/customer-doc/${file.filename}`,
                    uploadedAt: new Date()
                }));
            }
            
            const newDocument = await EnhancedCustomerDocument.create({
                customer: customerId,
                documentName,
                documentType,
                note,
                attachFile,
                allowStaffToView: allowStaffToView || false,
                requiresAcknowledgement: requiresAcknowledgement || false,
                requiresSignature: requiresSignature || false,
                requiresRenewal: requiresRenewal || false,
                renewalPeriod: renewalPeriod || '1 year',
                acknowledgementDeadline: acknowledgementDeadline ? new Date(acknowledgementDeadline) : null
            });
            
            // Add document reference to customer
            await Customer.findByIdAndUpdate(customerId, {
                $push: { documents: newDocument._id }
            });
            
            return res.status(201).json({
                message: "Document created successfully",
                data: newDocument,
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    // Get All Documents (with search)
    static async getAllDocuments(req, res) {
        try {
            const { search } = req.query;
            
            // Build query
            let query = {};
            
            // Add search filter
            if (search) {
                query.$or = [
                    { documentName: { $regex: search, $options: 'i' } },
                    { documentType: { $regex: search, $options: 'i' } },
                    { note: { $regex: search, $options: 'i' } }
                ];
            }
            
            const documents = await EnhancedCustomerDocument.find(query)
                .populate("customer", "customerName customerReferenceNumber email city country")
                .sort({ createdAt: -1 });
            
            res.status(200).json({
                message: "Documents fetched successfully",
                data: documents,
                count: documents.length
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
    
    // Get Documents by Customer
    static async getDocumentsByCustomer(req, res) {
        try {
            const { customerId } = req.params;
            const { search } = req.query;
            
            // Build query
            let query = { customer: customerId };
            
            // Add search filter
            if (search) {
                query.$or = [
                    { documentName: { $regex: search, $options: 'i' } },
                    { documentType: { $regex: search, $options: 'i' } },
                    { note: { $regex: search, $options: 'i' } }
                ];
            }
            
            const documents = await EnhancedCustomerDocument.find(query)
                .populate("customer", "customerName customerReferenceNumber email city country")
                .sort({ createdAt: -1 });
            
            res.status(200).json({
                message: "Customer documents fetched successfully",
                data: documents,
                count: documents.length
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
    
    // Get Document by ID
    static async getDocumentById(req, res) {
        try {
            const { id } = req.params;
            const document = await EnhancedCustomerDocument.findById(id)
                .populate("customer", "customerName customerReferenceNumber email city country");
            
            if (!document) {
                return res.status(404).json({ message: "Document not found" });
            }
            
            res.status(200).json({
                message: "Document fetched successfully",
                data: document
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
    
    // Update Document
    static async updateDocument(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            
            // Handle file uploads if present
            if (req.files && req.files.length > 0) {
                const newFiles = req.files.map(file => ({
                    fileName: file.originalname,
                    fileUrl: `/uploads/customer-doc/${file.filename}`,
                    uploadedAt: new Date()
                }));
                
                // Add new files to existing ones
                if (updateData.attachFile) {
                    updateData.attachFile = [...updateData.attachFile, ...newFiles];
                } else {
                    updateData.attachFile = newFiles;
                }
            }
            
            const updatedDocument = await EnhancedCustomerDocument.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            ).populate("customer", "customerName customerReferenceNumber email city country");
            
            if (!updatedDocument) {
                return res.status(404).json({ message: "Document not found" });
            }
            
            res.json({
                message: "Document updated successfully",
                data: updatedDocument
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    
    // Renew Document
    static async renewDocument(req, res) {
        try {
            const { id } = req.params;
            const { renewalPeriod } = req.body;
            
            const document = await EnhancedCustomerDocument.findById(id);
            if (!document) {
                return res.status(404).json({ message: "Document not found" });
            }
            
            // Update renewal information
            document.lastRenewedAt = new Date();
            if (renewalPeriod) {
                document.renewalPeriod = renewalPeriod;
            }
            
            // Calculate new renewal date
            if (document.renewalPeriod) {
                const periodMap = {
                    '1 month': 1,
                    '3 months': 3,
                    '6 months': 6,
                    '1 year': 12,
                    '2 years': 24,
                    '3 years': 36,
                    '5 years': 60
                };
                
                const months = periodMap[document.renewalPeriod] || 12;
                document.renewalDate = new Date();
                document.renewalDate.setMonth(document.renewalDate.getMonth() + months);
            }
            
            await document.save();
            
            const updatedDocument = await EnhancedCustomerDocument.findById(id)
                .populate("customer", "customerName customerReferenceNumber email city country");
            
            res.json({
                message: "Document renewed successfully",
                data: updatedDocument
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    
    // Delete Document
    static async deleteDocument(req, res) {
        try {
            const { id } = req.params;
            const document = await EnhancedCustomerDocument.findByIdAndDelete(id);
            
            if (!document) {
                return res.status(404).json({ message: "Document not found" });
            }
            
            // Remove document reference from customer
            await Customer.findByIdAndUpdate(document.customer, {
                $pull: { documents: id }
            });
            
            res.json({
                message: "Document deleted successfully"
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    
    // Get Documents Requiring Renewal
    static async getDocumentsRequiringRenewal(req, res) {
        try {
            const { customerId } = req.params;
            const { days = 30 } = req.query;
            
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() + parseInt(days));
            
            let query = {
                requiresRenewal: true,
                renewalDate: { $lte: cutoffDate }
            };
            
            if (customerId) {
                query.customer = customerId;
            }
            
            const documents = await EnhancedCustomerDocument.find(query)
                .populate("customer", "customerName customerReferenceNumber email city country")
                .sort({ renewalDate: 1 });
            
            res.status(200).json({
                message: "Documents requiring renewal fetched successfully",
                data: documents,
                count: documents.length
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}

module.exports = enhancedCustomerDocumentController;
