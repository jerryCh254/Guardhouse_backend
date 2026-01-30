const Runsheet = require('../../models/mobilepatrol/runsheetModel');
const { createRunsheetSchema, updateRunsheetSchema } = require('../../dto/mobilepatrol/runsheet.dto');

const getCompanyId = (req) => req.user?.id || req.body?.companyId;

class RunsheetController {
  static async getRunsheets(req, res) {
    try {
      const companyId = getCompanyId(req);
      const filter = companyId ? { companyId } : {};
      const { regionId } = req.query;
      if (regionId) filter.regionId = regionId;
      const runsheets = await Runsheet.find(filter)
        .populate('regionId', 'name')
        .populate('patrolSites.patrolSiteId', 'name')
        .sort({ createdAt: -1 });
      return res.status(200).json({ message: 'Success', count: runsheets.length, data: runsheets });
    } catch (err) {
      console.error('getRunsheets error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async getRunsheetById(req, res) {
    try {
      const companyId = getCompanyId(req);
      const runsheet = await Runsheet.findOne({ _id: req.params.id, companyId })
        .populate('regionId', 'name')
        .populate('patrolSites.patrolSiteId', 'name siteDetails');
      if (!runsheet) return res.status(404).json({ message: 'Runsheet not found' });
      return res.status(200).json({ message: 'Success', data: runsheet });
    } catch (err) {
      console.error('getRunsheetById error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async createRunsheet(req, res) {
    try {
      const { error, value } = createRunsheetSchema.validate(req.body);
      if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
      const companyId = getCompanyId(req);
      if (!companyId) return res.status(400).json({ message: 'companyId required' });
      const runsheet = await Runsheet.create({ ...value, companyId });
      return res.status(201).json({ message: 'Runsheet created', data: runsheet });
    } catch (err) {
      console.error('createRunsheet error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async updateRunsheet(req, res) {
    try {
      const { error, value } = updateRunsheetSchema.validate(req.body);
      if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
      const companyId = getCompanyId(req);
      const runsheet = await Runsheet.findOneAndUpdate(
        { _id: req.params.id, companyId },
        value,
        { new: true }
      );
      if (!runsheet) return res.status(404).json({ message: 'Runsheet not found' });
      return res.status(200).json({ message: 'Runsheet updated', data: runsheet });
    } catch (err) {
      console.error('updateRunsheet error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async deleteRunsheet(req, res) {
    try {
      const companyId = getCompanyId(req);
      const runsheet = await Runsheet.findOneAndDelete({ _id: req.params.id, companyId });
      if (!runsheet) return res.status(404).json({ message: 'Runsheet not found' });
      return res.status(200).json({ message: 'Runsheet deleted' });
    } catch (err) {
      console.error('deleteRunsheet error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
}

module.exports = RunsheetController;
