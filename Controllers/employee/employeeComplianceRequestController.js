const EmployeeComplianceRequest = require('../../models/employee/employeeComplianceRequestModel');
const { createComplianceRequestSchema } = require('../../dto/employee/complianceRequest.dto');

const getCompanyId = (req) => req.user?.id || req.body?.companyId;

class EmployeeComplianceRequestController {
  static async getRequestsByEmployee(req, res) {
    try {
      const companyId = getCompanyId(req);
      const { id: employeeId } = req.params;
      const requests = await EmployeeComplianceRequest.find({ employeeId, companyId })
        .populate('complianceItemIds', 'name')
        .sort({ createdAt: -1 });
      return res.status(200).json({ message: 'Success', count: requests.length, data: requests });
    } catch (err) {
      console.error('getRequestsByEmployee error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async createRequest(req, res) {
    try {
      const { error, value } = createComplianceRequestSchema.validate(req.body);
      if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
      const companyId = getCompanyId(req);
      if (!companyId) return res.status(400).json({ message: 'companyId required' });
      const employeeId = req.params.id;
      const request = await EmployeeComplianceRequest.create({
        employeeId,
        complianceItemIds: value.complianceItemIds,
        companyId,
      });
      return res.status(201).json({ message: 'Compliance request created', data: request });
    } catch (err) {
      console.error('createRequest error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
}

module.exports = EmployeeComplianceRequestController;
