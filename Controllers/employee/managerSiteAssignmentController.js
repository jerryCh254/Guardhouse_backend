const ManagerSiteAssignment = require('../../models/employee/managerSiteAssignmentModel');
const { updateManagerSitesSchema } = require('../../dto/employee/managerSite.dto');

const getCompanyId = (req) => req.user?.id || req.body?.companyId;

class ManagerSiteAssignmentController {
  static async getSitesByManager(req, res) {
    try {
      const companyId = getCompanyId(req);
      const managerId = req.params.id;
      let assignment = await ManagerSiteAssignment.findOne({ managerId, companyId }).populate(
        'siteIds',
        'siteName address'
      );
      if (!assignment) {
        assignment = { managerId, siteIds: [] };
      }
      return res.status(200).json({ message: 'Success', data: assignment });
    } catch (err) {
      console.error('getSitesByManager error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async updateManagerSites(req, res) {
    try {
      const { error, value } = updateManagerSitesSchema.validate(req.body);
      if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
      const companyId = getCompanyId(req);
      if (!companyId) return res.status(400).json({ message: 'companyId required' });
      const managerId = req.params.id;
      const assignment = await ManagerSiteAssignment.findOneAndUpdate(
        { managerId, companyId },
        { siteIds: value.siteIds },
        { new: true, upsert: true }
      ).populate('siteIds', 'siteName address');
      return res.status(200).json({ message: 'Manager sites updated', data: assignment });
    } catch (err) {
      console.error('updateManagerSites error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
}

module.exports = ManagerSiteAssignmentController;
