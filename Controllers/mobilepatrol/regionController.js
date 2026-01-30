const Region = require('../../models/mobilepatrol/regionModel');
const { createRegionSchema, updateRegionSchema } = require('../../dto/mobilepatrol/region.dto');

const getCompanyId = (req) => req.user?.id || req.body?.companyId;

class RegionController {
  static async getRegions(req, res) {
    try {
      const companyId = getCompanyId(req);
      const filter = companyId ? { companyId } : {};
      const regions = await Region.find(filter).sort({ createdAt: -1 });
      return res.status(200).json({ message: 'Success', count: regions.length, data: regions });
    } catch (err) {
      console.error('getRegions error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async getRegionById(req, res) {
    try {
      const companyId = getCompanyId(req);
      const region = await Region.findOne({ _id: req.params.id, companyId });
      if (!region) return res.status(404).json({ message: 'Region not found' });
      return res.status(200).json({ message: 'Success', data: region });
    } catch (err) {
      console.error('getRegionById error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async createRegion(req, res) {
    try {
      const { error, value } = createRegionSchema.validate(req.body);
      if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
      const companyId = getCompanyId(req);
      if (!companyId) return res.status(400).json({ message: 'companyId required' });
      const region = await Region.create({ ...value, companyId });
      return res.status(201).json({ message: 'Region created', data: region });
    } catch (err) {
      console.error('createRegion error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async updateRegion(req, res) {
    try {
      const { error, value } = updateRegionSchema.validate(req.body);
      if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
      const companyId = getCompanyId(req);
      const region = await Region.findOneAndUpdate(
        { _id: req.params.id, companyId },
        value,
        { new: true }
      );
      if (!region) return res.status(404).json({ message: 'Region not found' });
      return res.status(200).json({ message: 'Region updated', data: region });
    } catch (err) {
      console.error('updateRegion error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async deleteRegion(req, res) {
    try {
      const companyId = getCompanyId(req);
      const region = await Region.findOneAndDelete({ _id: req.params.id, companyId });
      if (!region) return res.status(404).json({ message: 'Region not found' });
      return res.status(200).json({ message: 'Region deleted' });
    } catch (err) {
      console.error('deleteRegion error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
}

module.exports = RegionController;
