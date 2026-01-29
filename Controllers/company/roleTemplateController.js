const RoleTemplate = require('../../Models/company/roleTemplateModel');
const { createRoleTemplateSchema, updateRoleTemplateSchema } = require('../../dto/company/roleTemplate.dto');

const getCompanyId = (req) => req.user?.id || req.params.companyId;

exports.getRoleTemplates = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const templates = await RoleTemplate.find({ companyId }).sort({ createdAt: -1 });
    return res.status(200).json({ message: 'Success', count: templates.length, data: templates });
  } catch (err) {
    console.error('getRoleTemplates error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getRoleTemplateById = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const template = await RoleTemplate.findOne({ _id: req.params.id, companyId });
    if (!template) return res.status(404).json({ message: 'Role template not found' });
    return res.status(200).json({ message: 'Success', data: template });
  } catch (err) {
    console.error('getRoleTemplateById error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createRoleTemplate = async (req, res) => {
  try {
    const { error, value } = createRoleTemplateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
    const companyId = getCompanyId(req);
    const template = await RoleTemplate.create({ ...value, companyId });
    return res.status(201).json({ message: 'Role template created', data: template });
  } catch (err) {
    console.error('createRoleTemplate error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateRoleTemplate = async (req, res) => {
  try {
    const { error, value } = updateRoleTemplateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
    const companyId = getCompanyId(req);
    const template = await RoleTemplate.findOneAndUpdate(
      { _id: req.params.id, companyId },
      value,
      { new: true }
    );
    if (!template) return res.status(404).json({ message: 'Role template not found' });
    return res.status(200).json({ message: 'Role template updated', data: template });
  } catch (err) {
    console.error('updateRoleTemplate error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteRoleTemplate = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const template = await RoleTemplate.findOneAndDelete({ _id: req.params.id, companyId });
    if (!template) return res.status(404).json({ message: 'Role template not found' });
    return res.status(200).json({ message: 'Role template deleted' });
  } catch (err) {
    console.error('deleteRoleTemplate error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
