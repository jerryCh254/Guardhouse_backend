const CustomerDocument = require('../../models/customer/customerDocumentModel');
const Customer = require('../../models/customer/customerModel');

class customerDocumentController {
    //add document
    static async createDocument(req, res) {
        try {
            const { customerId } = req.params;
            const { documentName, documentType, note } = req.body;
            let attachFile = [];

            if (req.files && req.files.length > 0) {
                attachFile = req.files.map(file => ({
                    fileName: file.originalname,
                    fileUrl: `/uploads/customer-documents/${file.filename}`,
                    uploadedAt: new Date()
                }));
            }

            const newCustomerDocument = await CustomerDocument.create({
                documentName,
                note,
                documentType,
                attachFile,
                customer: customerId
            })

            await Customer.findByIdAndUpdate(customerId, {
                $push: { documents: newCustomerDocument._id }
            })

            return res.status(201).json({
                message: "Document is created successfully",
                data: newCustomerDocument,
            })
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //get all documents 
    static async getCustomerDocument(req, res) {
        try {
            const documents = await CustomerDocument.find()
                .populate("customer", "customerName customerReferenceNumber email city country");

            res.status(200).json({
                message: "Documents fetched successfully",
                data: documents
            });

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    //get documents by customer
    static async getDocumentsByCustomer(req, res) {
        try {
            const { customerId } = req.params;
            const documents = await CustomerDocument.find({ customer: customerId })
                .populate("customer", "customerName customerReferenceNumber email city country");

            res.status(200).json({
                message: "Customer documents fetched successfully",
                data: documents
            });

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    //update document
    static async updateCustomerDocument(req, res) {
        try {
            const updateDocument = await CustomerDocument.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            )
            res.json({
                message: "Document updated successfully",
                data: updateDocument
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    //delete document
    static async deleteDocument(req, res) {
        try {
            const document = await CustomerDocument.findByIdAndDelete(req.params.id);

            if (!document) {
                return res.status(404).json({ message: "Document not found" });
            }

            // Remove document reference from customer
            await Customer.findByIdAndUpdate(document.customer, {
                $pull: { documents: document._id }
            });

            res.json({
                message: "Document deleted successfully"
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = customerDocumentController;