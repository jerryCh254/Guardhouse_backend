const Skill = require('../../Models/company/skillModel');
const { createSkillSchema, updateSkillSchema } = require('../../dto/company/skill.dto');

const getCompanyId = (req) => req.user?.id || req.params.companyId;

exports.getSkills = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const skills = await Skill.find({ companyId }).sort({ createdAt: -1 });
    return res.status(200).json({ message: 'Success', count: skills.length, data: skills });
  } catch (err) {
    console.error('getSkills error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getSkillById = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const skill = await Skill.findOne({ _id: req.params.id, companyId });
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    return res.status(200).json({ message: 'Success', data: skill });
  } catch (err) {
    console.error('getSkillById error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createSkill = async (req, res) => {
  try {
    const { error, value } = createSkillSchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
    const companyId = getCompanyId(req);
    const skill = await Skill.create({ ...value, companyId });
    return res.status(201).json({ message: 'Skill created', data: skill });
  } catch (err) {
    console.error('createSkill error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const { error, value } = updateSkillSchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
    const companyId = getCompanyId(req);
    const skill = await Skill.findOneAndUpdate(
      { _id: req.params.id, companyId },
      value,
      { new: true }
    );
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    return res.status(200).json({ message: 'Skill updated', data: skill });
  } catch (err) {
    console.error('updateSkill error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const skill = await Skill.findOneAndDelete({ _id: req.params.id, companyId });
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    return res.status(200).json({ message: 'Skill deleted' });
  } catch (err) {
    console.error('deleteSkill error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
