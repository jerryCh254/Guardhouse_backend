const Employee = require('../../models/employee/employeeModel');
const { createEmployeeSchema, updateEmployeeSchema } = require('../../dto/employee/employee.dto');

const getCompanyId = (req) => req.user?.id || req.body?.companyId;

class EmployeeController {
  static async getEmployees(req, res) {
    try {
      const companyId = getCompanyId(req);
      const filter = companyId ? { companyId } : {};
      const { customerId, status, accessPrivilege } = req.query;
      if (customerId) filter.customerId = customerId;
      if (status) filter.status = status;
      if (accessPrivilege) filter.accessPrivilege = accessPrivilege;
      const employees = await Employee.find(filter)
        .populate('customerId', 'customerName')
        .sort({ createdAt: -1 });
      return res.status(200).json({ message: 'Success', count: employees.length, data: employees });
    } catch (err) {
      console.error('getEmployees error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async getEmployeeById(req, res) {
    try {
      const companyId = getCompanyId(req);
      const employee = await Employee.findOne({ _id: req.params.id, companyId }).populate(
        'customerId',
        'customerName'
      );
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
      return res.status(200).json({ message: 'Success', data: employee });
    } catch (err) {
      console.error('getEmployeeById error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async createEmployee(req, res) {
    try {
      const { error, value } = createEmployeeSchema.validate(req.body);
      if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
      const companyId = getCompanyId(req);
      if (!companyId) return res.status(400).json({ message: 'companyId required' });
      const employee = await Employee.create({ ...value, companyId });
      return res.status(201).json({ message: 'Employee created', data: employee });
    } catch (err) {
      console.error('createEmployee error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async updateEmployee(req, res) {
    try {
      const { error, value } = updateEmployeeSchema.validate(req.body);
      if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
      const companyId = getCompanyId(req);
      const employee = await Employee.findOneAndUpdate(
        { _id: req.params.id, companyId },
        value,
        { new: true }
      );
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
      return res.status(200).json({ message: 'Employee updated', data: employee });
    } catch (err) {
      console.error('updateEmployee error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async deleteEmployee(req, res) {
    try {
      const companyId = getCompanyId(req);
      const employee = await Employee.findOneAndDelete({ _id: req.params.id, companyId });
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
      return res.status(200).json({ message: 'Employee deleted' });
    } catch (err) {
      console.error('deleteEmployee error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async updateEmployeeStatus(req, res) {
    try {
      const companyId = getCompanyId(req);
      const { status } = req.body;
      if (!status || !['Active', 'Deactive'].includes(status)) {
        return res.status(400).json({ message: 'status must be Active or Deactive' });
      }
      const employee = await Employee.findOneAndUpdate(
        { _id: req.params.id, companyId },
        { status },
        { new: true }
      );
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
      return res.status(200).json({ message: 'Employee status updated', data: employee });
    } catch (err) {
      console.error('updateEmployeeStatus error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
}

module.exports = EmployeeController;
