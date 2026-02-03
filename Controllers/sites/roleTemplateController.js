const siteRoleTemplate = require('../../models/site/roleTemplateModel.js');
const Sites = require('../../models/site/siteModel.js');

class SiteRoleTemplateController {
    static async createSiteRoleTemplate(req, res) {
    try {
      const { id: siteId } = req.params;
      const { name } = req.body;
      
      const template = await siteRoleTemplate.create({
        name,
        site: siteId
      });

      // Add template ID to site's roleTemplates array
      await Sites.findByIdAndUpdate(
        siteId,
        { $push: { roleTemplates: template._id } },
        { new: true }
      );
      
      return res.status(201).json({ message: 'Site role template created', data: template });
    } catch (err) {
      console.error('createSiteRoleTemplate error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  // Get all role templates for a site
  static async getSiteRoleTemplates(req, res) {
    try {
      const { siteId } = req.params;
      const templates = await siteRoleTemplate.find({ site: siteId }).sort({ createdAt: -1 });
      return res.status(200).json({ message: 'Success', count: templates.length, data: templates });
    } catch (err) {
      console.error('getSiteRoleTemplates error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  // Get role template by ID
  static async getSiteRoleTemplateById(req, res) {
    try {
      const { siteId, id } = req.params;
      const template = await siteRoleTemplate.findOne({ _id: id, site: siteId });
      if (!template) return res.status(404).json({ message: 'Role template not found' });
      return res.status(200).json({ message: 'Success', data: template });
    } catch (err) {
      console.error('getSiteRoleTemplateById error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  // Update role template
  static async updateSiteRoleTemplate(req, res) {
    try {
      const { siteId, id } = req.params;
      const { name } = req.body;
      
      const template = await siteRoleTemplate.findOneAndUpdate(
        { _id: id, site: siteId },
        { name },
        { new: true }
      );
      
      if (!template) return res.status(404).json({ message: 'Role template not found' });
      return res.status(200).json({ message: 'Site role template updated', data: template });
    } catch (err) {
      console.error('updateSiteRoleTemplate error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  // Delete role template
  static async deleteSiteRoleTemplate(req, res) {
    try {
      const { siteId, id } = req.params;
      const template = await siteRoleTemplate.findOneAndDelete({ _id: id, site: siteId });
      if (!template) return res.status(404).json({ message: 'Role template not found' });

      // Remove template ID from site's roleTemplates array
      await Sites.findByIdAndUpdate(
        siteId,
        { $pull: { roleTemplates: id } },
        { new: true }
      );

      return res.status(200).json({ message: 'Site role template deleted' });
    } catch (err) {
      console.error('deleteSiteRoleTemplate error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
}
module.exports = SiteRoleTemplateController