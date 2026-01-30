const SubmittedCompliance = require('../../models/employee/submittedComplianceModel');
const {
  createSubmittedComplianceSchema,
  updateSubmittedComplianceSchema,
} = require('../../dto/employee/submittedCompliance.dto');

const getCompanyId = (req) => req.user?.id || req.body?.companyId;

class SubmittedComplianceController {
  static async getSubmittedComplianceList(req, res) {
    try {
      const companyId = getCompanyId(req);
      const filter = companyId ? { companyId } : {};
      const { employeeId, status, complianceType } = req.query;
      if (employeeId) filter.employeeId = employeeId;
      if (status) filter.status = status;
      if (complianceType) filter.complianceType = complianceType;
      const list = await SubmittedCompliance.find(filter)
        .populate('employeeId', 'firstName lastName email')
        .sort({ createdAt: -1 });
      return res.status(200).json({ message: 'Success', count: list.length, data: list });
    } catch (err) {
      console.error('getSubmittedComplianceList error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async getSubmittedComplianceById(req, res) {
    try {
      const companyId = getCompanyId(req);
      const item = await SubmittedCompliance.findOne({ _id: req.params.id, companyId }).populate(
        'employeeId',
        'firstName lastName email'
      );
      if (!item) return res.status(404).json({ message: 'Submitted compliance not found' });
      return res.status(200).json({ message: 'Success', data: item });
    } catch (err) {
      console.error('getSubmittedComplianceById error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async createSubmittedCompliance(req, res) {
    try {
      const { error, value } = createSubmittedComplianceSchema.validate(req.body);
      if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
      const companyId = getCompanyId(req);
      if (!companyId) return res.status(400).json({ message: 'companyId required' });
      const item = await SubmittedCompliance.create({ ...value, companyId });
      return res.status(201).json({ message: 'Submitted compliance created', data: item });
    } catch (err) {
      console.error('createSubmittedCompliance error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async approve(req, res) {
    try {
      const companyId = getCompanyId(req);
      const item = await SubmittedCompliance.findOneAndUpdate(
        { _id: req.params.id, companyId },
        { approved: true, status: 'Approved' },
        { new: true }
      );
      if (!item) return res.status(404).json({ message: 'Submitted compliance not found' });
      return res.status(200).json({ message: 'Approved', data: item });
    } catch (err) {
      console.error('approve error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async reject(req, res) {
    try {
      const companyId = getCompanyId(req);
      const item = await SubmittedCompliance.findOneAndUpdate(
        { _id: req.params.id, companyId },
        { approved: false, status: 'Rejected' },
        { new: true }
      );
      if (!item) return res.status(404).json({ message: 'Submitted compliance not found' });
      return res.status(200).json({ message: 'Rejected', data: item });
    } catch (err) {
      console.error('reject error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async cancel(req, res) {
    try {
      const companyId = getCompanyId(req);
      const item = await SubmittedCompliance.findOneAndUpdate(
        { _id: req.params.id, companyId },
        { status: 'Cancelled' },
        { new: true }
      );
      if (!item) return res.status(404).json({ message: 'Submitted compliance not found' });
      return res.status(200).json({ message: 'Request cancelled', data: item });
    } catch (err) {
      console.error('cancel error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
}

module.exports = SubmittedComplianceController;
