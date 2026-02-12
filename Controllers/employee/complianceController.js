const Compliance = require('../../models/employee/complianceModel');
const {
  createComplianceSchema,
  updateComplianceSchema,
} = require('../../dto/employee/compliance.dto');

const getCompanyId = (req) => req.user?.id || req.body?.companyId;

class ComplianceController {
  static async getComplianceList(req, res) {
    try {
      const companyId = getCompanyId(req);
      const filter = companyId ? { companyId } : {};
      const { employeeId, status, complianceType, critical } = req.query;
      if (employeeId) filter.employeeId = employeeId;
      if (status) filter.status = status;
      if (complianceType) filter.complianceType = complianceType;
      if (critical) filter.critical = critical === 'true';
      
      const list = await Compliance.find(filter)
        .populate('employeeId', 'firstName lastName email')
        .sort({ createdAt: -1 });
      return res.status(200).json({ message: 'Success', count: list.length, data: list });
    } catch (err) {
      console.error('getComplianceList error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async getComplianceById(req, res) {
    try {
      const companyId = getCompanyId(req);
      const item = await Compliance.findOne({ _id: req.params.id, companyId })
        .populate('employeeId', 'firstName lastName email');
      if (!item) return res.status(404).json({ message: 'Compliance not found' });
      return res.status(200).json({ message: 'Success', data: item });
    } catch (err) {
      console.error('getComplianceById error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async createCompliance(req, res) {
    try {
      const { error, value } = createComplianceSchema.validate(req.body);
      if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
      const companyId = getCompanyId(req);
      if (!companyId) return res.status(400).json({ message: 'companyId required' });
      
      // Handle file upload
      if (req.file) {
        value.attachmentPath = `/uploads/security-license/${req.file.filename}`;
      }
      
      const item = await Compliance.create({ ...value, companyId });
      return res.status(201).json({ message: 'Compliance created', data: item });
    } catch (err) {
      console.error('createCompliance error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async updateCompliance(req, res) {
    try {
      const { error, value } = updateComplianceSchema.validate(req.body);
      if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
      const companyId = getCompanyId(req);
      
      // Handle file upload
      if (req.file) {
        value.attachmentPath = `/uploads/security-license/${req.file.filename}`;
      }
      
      const item = await Compliance.findOneAndUpdate(
        { _id: req.params.id, companyId },
        { ...value, updatedAt: new Date() },
        { new: true }
      ).populate('employeeId', 'firstName lastName email');
      if (!item) return res.status(404).json({ message: 'Compliance not found' });
      return res.status(200).json({ message: 'Compliance updated', data: item });
    } catch (err) {
      console.error('updateCompliance error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async deleteCompliance(req, res) {
    try {
      const companyId = getCompanyId(req);
      const item = await Compliance.findOneAndDelete({ _id: req.params.id, companyId });
      if (!item) return res.status(404).json({ message: 'Compliance not found' });
      return res.status(200).json({ message: 'Compliance deleted', data: item });
    } catch (err) {
      console.error('deleteCompliance error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async approveCompliance(req, res) {
    try {
      const companyId = getCompanyId(req);
      const item = await Compliance.findOneAndUpdate(
        { _id: req.params.id, companyId },
        { approved: true, status: 'Approved', updatedAt: new Date() },
        { new: true }
      ).populate('employeeId', 'firstName lastName email');
      if (!item) return res.status(404).json({ message: 'Compliance not found' });
      return res.status(200).json({ message: 'Compliance approved', data: item });
    } catch (err) {
      console.error('approveCompliance error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async rejectCompliance(req, res) {
    try {
      const companyId = getCompanyId(req);
      const item = await Compliance.findOneAndUpdate(
        { _id: req.params.id, companyId },
        { approved: false, status: 'Rejected', updatedAt: new Date() },
        { new: true }
      ).populate('employeeId', 'firstName lastName email');
      if (!item) return res.status(404).json({ message: 'Compliance not found' });
      return res.status(200).json({ message: 'Compliance rejected', data: item });
    } catch (err) {
      console.error('rejectCompliance error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async cancelCompliance(req, res) {
    try {
      const companyId = getCompanyId(req);
      const item = await Compliance.findOneAndUpdate(
        { _id: req.params.id, companyId },
        { status: 'Cancelled', updatedAt: new Date() },
        { new: true }
      ).populate('employeeId', 'firstName lastName email');
      if (!item) return res.status(404).json({ message: 'Compliance not found' });
      return res.status(200).json({ message: 'Compliance cancelled', data: item });
    } catch (err) {
      console.error('cancelCompliance error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
}

module.exports = ComplianceController;
