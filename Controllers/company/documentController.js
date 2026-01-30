const path = require('path');
const fs = require('fs');
const CompanyDocument = require('../../Models/company/companyDocumentModel');
const {
  createDocumentSchema,
  updateDocumentSchema,
} = require('../../dto/company/document.dto');

const getCompanyId = (req) => req.user?.id || req.params.companyId;

class DocumentController {
  static async getDocuments(req, res) {
    try {
      const companyId = getCompanyId(req);
      const docs = await CompanyDocument.find({ companyId }).sort({ createdAt: -1 });
      return res.status(200).json({ message: 'Success', count: docs.length, data: docs });
    } catch (err) {
      console.error('getDocuments error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async getDocumentById(req, res) {
    try {
      const companyId = getCompanyId(req);
      const doc = await CompanyDocument.findOne({ _id: req.params.id, companyId });
      if (!doc) return res.status(404).json({ message: 'Document not found' });
      return res.status(200).json({ message: 'Success', data: doc });
    } catch (err) {
      console.error('getDocumentById error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async createDocument(req, res) {
    try {
      const companyId = getCompanyId(req);
      const body = { ...req.body };
      let filePath = null;
      let fileName = null;
      let mimeType = null;
      if (req.file) {
        filePath = path.join(
          req.file.destination || '',
          req.file.filename || req.file.originalname
        );
        fileName = req.file.originalname || req.file.filename;
        mimeType = req.file.mimetype;
      }
      const { error, value } = createDocumentSchema.validate(body);
      if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
      if (!filePath) return res.status(400).json({ message: 'File is required' });
      const doc = await CompanyDocument.create({
        ...value,
        companyId,
        filePath,
        fileName,
        mimeType,
      });
      return res.status(201).json({ message: 'Document created', data: doc });
    } catch (err) {
      console.error('createDocument error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async updateDocument(req, res) {
    try {
      const { error, value } = updateDocumentSchema.validate(req.body);
      if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
      const companyId = getCompanyId(req);
      const doc = await CompanyDocument.findOneAndUpdate(
        { _id: req.params.id, companyId },
        value,
        { new: true }
      );
      if (!doc) return res.status(404).json({ message: 'Document not found' });
      return res.status(200).json({ message: 'Document updated', data: doc });
    } catch (err) {
      console.error('updateDocument error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async deleteDocument(req, res) {
    try {
      const companyId = getCompanyId(req);
      const doc = await CompanyDocument.findOne({ _id: req.params.id, companyId });
      if (!doc) return res.status(404).json({ message: 'Document not found' });
      if (doc.filePath && fs.existsSync(doc.filePath)) {
        try {
          fs.unlinkSync(doc.filePath);
        } catch (e) {
          /* ignore */
        }
      }
      await CompanyDocument.findByIdAndDelete(doc._id);
      return res.status(200).json({ message: 'Document deleted' });
    } catch (err) {
      console.error('deleteDocument error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async downloadDocument(req, res) {
    try {
      const companyId = getCompanyId(req);
      const doc = await CompanyDocument.findOne({ _id: req.params.id, companyId });
      if (!doc) return res.status(404).json({ message: 'Document not found' });
      if (!doc.filePath || !fs.existsSync(doc.filePath)) {
        return res.status(404).json({ message: 'File not found on server' });
      }
      res.download(doc.filePath, doc.fileName || path.basename(doc.filePath));
    } catch (err) {
      console.error('downloadDocument error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
}

module.exports = DocumentController;
