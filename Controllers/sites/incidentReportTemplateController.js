const IncidentReportTemplate = require('../../models/site/incidentReportTemplateModel');
const Site = require('../../models/site/siteModel');

class IncidentReportTemplateController {
    static async getAllIncidentReportTemplates(req, res) {
        try {
            const templates = await IncidentReportTemplate.find()
                .populate('sites', 'siteName address')
                .sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                message: "Incident report templates fetched successfully",
                data: templates
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async createIncidentReportTemplate(req, res) {
        try {
            const { name, description, isGlobal = true } = req.body;

            const existingTemplate = await IncidentReportTemplate.findOne({ name });
            if (existingTemplate) {
                return res.status(400).json({
                    success: false,
                    message: "Template with this name already exists"
                });
            }

            const template = await IncidentReportTemplate.create({
                name,
                description,
                isGlobal
            });

            res.status(201).json({
                success: true,
                message: "Incident report template created successfully",
                data: template
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async enableIncidentReportTemplateForSite(req, res) {
        try {
            const { templateId, siteId } = req.params;

            const template = await IncidentReportTemplate.findById(templateId);
            if (!template) {
                return res.status(404).json({
                    success: false,
                    message: "Template not found"
                });
            }

            const site = await Site.findById(siteId);
            if (!site) {
                return res.status(404).json({
                    success: false,
                    message: "Site not found"
                });
            }

            if (template.sites.includes(siteId)) {
                return res.status(400).json({
                    success: false,
                    message: "Template is already enabled for this site"
                });
            }

            template.sites.push(siteId);
            await template.save();

            if (!site.incidentReportTemplates) {
                site.incidentReportTemplates = [];
            }
            site.incidentReportTemplates.push(templateId);
            await site.save();

            res.status(200).json({
                success: true,
                message: "Template enabled for site successfully",
                data: template
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async disableIncidentReportTemplateForSite(req, res) {
        try {
            const { templateId, siteId } = req.params;

            const template = await IncidentReportTemplate.findById(templateId);
            if (!template) {
                return res.status(404).json({
                    success: false,
                    message: "Template not found"
                });
            }

            template.sites = template.sites.filter(site => site.toString() !== siteId);
            await template.save();

            await Site.findByIdAndUpdate(siteId, {
                $pull: { incidentReportTemplates: templateId }
            });

            res.status(200).json({
                success: true,
                message: "Template disabled for site successfully",
                data: template
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getSiteIncidentReportTemplates(req, res) {
        try {
            const { siteId } = req.params;

            const site = await Site.findById(siteId).populate('incidentReportTemplates');
            if (!site) {
                return res.status(404).json({
                    success: false,
                    message: "Site not found"
                });
            }

            const globalTemplates = await IncidentReportTemplate.find({ 
                isGlobal: true,
                isActive: true 
            });

            const siteSpecificTemplates = await IncidentReportTemplate.find({
                _id: { $in: site.incidentReportTemplates },
                isActive: true
            });

            const allTemplates = [...globalTemplates, ...siteSpecificTemplates];
            const uniqueTemplates = allTemplates.filter((template, index, self) =>
                index === self.findIndex((t) => t._id.toString() === template._id.toString())
            );

            res.status(200).json({
                success: true,
                message: "Site incident report templates fetched successfully",
                data: uniqueTemplates
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async updateIncidentReportTemplate(req, res) {
        try {
            const { templateId } = req.params;
            const { name, description, isActive } = req.body;

            const template = await IncidentReportTemplate.findByIdAndUpdate(
                templateId,
                { name, description, isActive, updatedAt: Date.now() },
                { new: true, runValidators: true }
            );

            if (!template) {
                return res.status(404).json({
                    success: false,
                    message: "Template not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Template updated successfully",
                data: template
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async deleteIncidentReportTemplate(req, res) {
        try {
            const { templateId } = req.params;

            const template = await IncidentReportTemplate.findByIdAndDelete(templateId);
            if (!template) {
                return res.status(404).json({
                    success: false,
                    message: "Template not found"
                });
            }

            await Site.updateMany(
                { incidentReportTemplates: templateId },
                { $pull: { incidentReportTemplates: templateId } }
            );

            res.status(200).json({
                success: true,
                message: "Template deleted successfully"
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = IncidentReportTemplateController;
