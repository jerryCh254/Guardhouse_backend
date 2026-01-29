const ComplianceItem = require('../../Models/company/complianceItemModel');
const { createComplianceItemSchema, updateComplianceItemSchema, addRenewalSchema } = require('../../dto/company/compliance.dto');

const getCompanyId = (req) => req.user?.id || req.params.companyId;

exports.getComplianceItems = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const items = await ComplianceItem.find({ companyId }).sort({ createdAt: -1 });
    return res.status(200).json({ message: 'Success', count: items.length, data: items });
  } catch (err) {
    console.error('getComplianceItems error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getComplianceItemById = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const item = await ComplianceItem.findOne({ _id: req.params.id, companyId });
    if (!item) return res.status(404).json({ message: 'Compliance item not found' });
    return res.status(200).json({ message: 'Success', data: item });
  } catch (err) {
    console.error('getComplianceItemById error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createComplianceItem = async (req, res) => {
  try {
    const { error, value } = createComplianceItemSchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
    const companyId = getCompanyId(req);
    const item = await ComplianceItem.create({ ...value, companyId });
    return res.status(201).json({ message: 'Compliance item created', data: item });
  } catch (err) {
    console.error('createComplianceItem error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateComplianceItem = async (req, res) => {
  try {
    const { error, value } = updateComplianceItemSchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
    const companyId = getCompanyId(req);
    const item = await ComplianceItem.findOneAndUpdate(
      { _id: req.params.id, companyId },
      value,
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Compliance item not found' });
    return res.status(200).json({ message: 'Compliance item updated', data: item });
  } catch (err) {
    console.error('updateComplianceItem error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteComplianceItem = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const item = await ComplianceItem.findOneAndDelete({ _id: req.params.id, companyId });
    if (!item) return res.status(404).json({ message: 'Compliance item not found' });
    return res.status(200).json({ message: 'Compliance item deleted' });
  } catch (err) {
    console.error('deleteComplianceItem error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getRenewals = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const item = await ComplianceItem.findOne({ _id: req.params.id, companyId }).select('renewals');
    if (!item) return res.status(404).json({ message: 'Compliance item not found' });
    return res.status(200).json({ message: 'Success', data: item.renewals || [] });
  } catch (err) {
    console.error('getRenewals error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.addRenewal = async (req, res) => {
  try {
    const { error, value } = addRenewalSchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
    const companyId = getCompanyId(req);
    const item = await ComplianceItem.findOne({ _id: req.params.id, companyId });
    if (!item) return res.status(404).json({ message: 'Compliance item not found' });
    item.renewals = item.renewals || [];
    item.renewals.push(value);
    await item.save();
    return res.status(201).json({ message: 'Renewal added', data: item });
  } catch (err) {
    console.error('addRenewal error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
