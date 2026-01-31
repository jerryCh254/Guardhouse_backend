const Employee = require('../../models/employee/employeeModel');
const Site = require('../../models/site/siteModel');
const PreferredStaff = require('../../models/site/preferredStaffModel');

class PreferredStaffController {
  static async addOrCheckPreferredStaff(req, res) {
    try {
      const { employeeId } = req.params;
      const { siteId, customerId, action } = req.body;

      if (!employeeId) {
        return res.status(400).json({ success: false, message: 'EmployeeId is required' });
      }

      if (action && (siteId || customerId)) {
        let existingEntry;
        
        if (siteId) {
          existingEntry = await PreferredStaff.findOne({ employeeId, siteId });
        } else if (customerId) {
          existingEntry = await PreferredStaff.findOne({ employeeId, customerId });
        }

        if (!existingEntry) {
          const newEntry = new PreferredStaff({
            employeeId,
            ...(siteId && { siteId }),
            ...(customerId && { customerId }),
            isPreferred: action === 'prefer',
            isBlocked: action === 'block'
          });
          await newEntry.save();
          
          return res.status(201).json({
            success: true,
            message: `Employee ${action}ed successfully`,
            data: newEntry
          });
        } else {
          if (action === 'prefer') {
            existingEntry.isPreferred = true;
            existingEntry.isBlocked = false;
          } else if (action === 'block') {
            existingEntry.isPreferred = false;
            existingEntry.isBlocked = true;
          } else if (action === 'remove') {
            existingEntry.isPreferred = false;
            existingEntry.isBlocked = false;
          }
          
          await existingEntry.save();
          
          return res.status(200).json({
            success: true,
            message: `Employee ${action}d successfully`,
            data: existingEntry
          });
        }
      }

      const preferredEntries = await PreferredStaff.find({
        employeeId,
        isPreferred: true,
        isBlocked: false
      })
      .populate('employeeId', 'firstName lastName email')
      .populate('siteId', 'siteName location')
      .populate('customerId', 'customerName');

      if (!preferredEntries || preferredEntries.length === 0) {
        return res.status(200).json({
          success: true,
          message: 'Employee is not preferred or is blocked',
          staff: []
        });
      }

      res.status(200).json({
        success: true,
        staff: preferredEntries
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getBlockedEmployees(req, res) {
    try {
      const { employeeId } = req.params;
      const { siteId, customerId } = req.query;

      let query = { isBlocked: true };
      
      if (employeeId) {
        query.employeeId = employeeId;
      }
      if (siteId) {
        query.siteId = siteId;
      }
      if (customerId) {
        query.customerId = customerId;
      }

      const blockedEntries = await PreferredStaff.find(query)
        .populate('employeeId', 'firstName lastName email')
        .populate('siteId', 'siteName location')
        .populate('customerId', 'customerName');

      res.status(200).json({
        success: true,
        blockedStaff: blockedEntries
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getPreferredEmployees(req, res) {
    try {
      const { siteId, customerId } = req.query;

      let query = { isPreferred: true, isBlocked: false };
      
      if (siteId) {
        query.siteId = siteId;
      }
      if (customerId) {
        query.customerId = customerId;
      }

      const preferredEntries = await PreferredStaff.find(query)
        .populate('employeeId', 'firstName lastName email')
        .populate('siteId', 'siteName location')
        .populate('customerId', 'customerName');

      res.status(200).json({
        success: true,
        preferredStaff: preferredEntries
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updatePreferredStaff(req, res) {
    try {
      const { employeeId } = req.params;
      const { siteId, customerId, isPreferred, isBlocked } = req.body;

      if (!employeeId) {
        return res.status(400).json({ success: false, message: 'EmployeeId is required' });
      }

      if (!siteId && !customerId) {
        return res.status(400).json({ success: false, message: 'Either siteId or customerId is required' });
      }

      let query = { employeeId };
      if (siteId) query.siteId = siteId;
      if (customerId) query.customerId = customerId;

      const existingEntry = await PreferredStaff.findOne(query);

      if (!existingEntry) {
        return res.status(404).json({ success: false, message: 'No preference entry found for this employee' });
      }

      if (isPreferred !== undefined) existingEntry.isPreferred = isPreferred;
      if (isBlocked !== undefined) existingEntry.isBlocked = isBlocked;

      await existingEntry.save();

      res.status(200).json({
        success: true,
        message: 'Preference updated successfully',
        data: existingEntry
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = PreferredStaffController;