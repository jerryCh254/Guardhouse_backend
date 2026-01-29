const SitePosition = require('../../Models/company/sitePositionModel');
const { createSitePositionSchema, updateSitePositionSchema } = require('../../dto/company/sitePosition.dto');

const getCompanyId = (req) => req.user?.id || req.params.companyId;

exports.getSitePositions = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const positions = await SitePosition.find({ companyId }).sort({ createdAt: -1 });
    return res.status(200).json({ message: 'Success', count: positions.length, data: positions });
  } catch (err) {
    console.error('getSitePositions error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getSitePositionById = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const position = await SitePosition.findOne({ _id: req.params.id, companyId });
    if (!position) return res.status(404).json({ message: 'Site position not found' });
    return res.status(200).json({ message: 'Success', data: position });
  } catch (err) {
    console.error('getSitePositionById error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createSitePosition = async (req, res) => {
  try {
    const { error, value } = createSitePositionSchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
    const companyId = getCompanyId(req);
    const position = await SitePosition.create({ ...value, companyId });
    return res.status(201).json({ message: 'Site position created', data: position });
  } catch (err) {
    console.error('createSitePosition error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateSitePosition = async (req, res) => {
  try {
    const { error, value } = updateSitePositionSchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
    const companyId = getCompanyId(req);
    const position = await SitePosition.findOneAndUpdate(
      { _id: req.params.id, companyId },
      value,
      { new: true }
    );
    if (!position) return res.status(404).json({ message: 'Site position not found' });
    return res.status(200).json({ message: 'Site position updated', data: position });
  } catch (err) {
    console.error('updateSitePosition error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteSitePosition = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const position = await SitePosition.findOneAndDelete({ _id: req.params.id, companyId });
    if (!position) return res.status(404).json({ message: 'Site position not found' });
    return res.status(200).json({ message: 'Site position deleted' });
  } catch (err) {
    console.error('deleteSitePosition error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
