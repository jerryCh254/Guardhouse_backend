const PatrolSite = require('../../models/mobilepatrol/patrolSiteModel');
const { createPatrolSiteSchema, updatePatrolSiteSchema } = require('../../dto/mobilepatrol/patrolSite.dto');

const getCompanyId = (req) => req.user?.id || req.body?.companyId;

class PatrolSiteController {
  static async getPatrolSites(req, res) {
    try {
      const companyId = getCompanyId(req);
      const filter = companyId ? { companyId } : {};
      const { customerId, regionId, status } = req.query;
      if (customerId) filter.customerId = customerId;
      if (regionId) filter.regionId = regionId;
      if (status) filter.status = status;
      const sites = await PatrolSite.find(filter)
        .populate('customerId', 'customerName')
        .populate('regionId', 'name')
        .sort({ createdAt: -1 });
      return res.status(200).json({ message: 'Success', count: sites.length, data: sites });
    } catch (err) {
      console.error('getPatrolSites error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async getPatrolSiteById(req, res) {
    try {
      const companyId = getCompanyId(req);
      const site = await PatrolSite.findOne({ _id: req.params.id, companyId })
        .populate('customerId', 'customerName')
        .populate('regionId', 'name');
      if (!site) return res.status(404).json({ message: 'Patrol site not found' });
      return res.status(200).json({ message: 'Success', data: site });
    } catch (err) {
      console.error('getPatrolSiteById error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async createPatrolSite(req, res) {
    try {
      const { error, value } = createPatrolSiteSchema.validate(req.body);
      if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
      const companyId = getCompanyId(req);
      if (!companyId) return res.status(400).json({ message: 'companyId required' });
      const site = await PatrolSite.create({ ...value, companyId });
      return res.status(201).json({ message: 'Patrol site created', data: site });
    } catch (err) {
      console.error('createPatrolSite error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async updatePatrolSite(req, res) {
    try {
      const { error, value } = updatePatrolSiteSchema.validate(req.body);
      if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
      const companyId = getCompanyId(req);
      const site = await PatrolSite.findOneAndUpdate(
        { _id: req.params.id, companyId },
        value,
        { new: true }
      );
      if (!site) return res.status(404).json({ message: 'Patrol site not found' });
      return res.status(200).json({ message: 'Patrol site updated', data: site });
    } catch (err) {
      console.error('updatePatrolSite error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async deletePatrolSite(req, res) {
    try {
      const companyId = getCompanyId(req);
      const site = await PatrolSite.findOneAndDelete({ _id: req.params.id, companyId });
      if (!site) return res.status(404).json({ message: 'Patrol site not found' });
      return res.status(200).json({ message: 'Patrol site deleted' });
    } catch (err) {
      console.error('deletePatrolSite error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
}

module.exports = PatrolSiteController;
