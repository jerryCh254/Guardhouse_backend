const express = require('express');
const router = express.Router();
const IncidentReportTemplateController = require('../../controllers/sites/incidentReportTemplateController');

router.get('/getAll', IncidentReportTemplateController.getAllIncidentReportTemplates);
router.post('/create', IncidentReportTemplateController.createIncidentReportTemplate);
router.get('/site/:siteId', IncidentReportTemplateController.getSiteIncidentReportTemplates);
router.post('/enable/:templateId/:siteId', IncidentReportTemplateController.enableIncidentReportTemplateForSite);
router.delete('/disable/:templateId/:siteId', IncidentReportTemplateController.disableIncidentReportTemplateForSite);
router.put('/update/:templateId', IncidentReportTemplateController.updateIncidentReportTemplate);
router.delete('/delete/:templateId', IncidentReportTemplateController.deleteIncidentReportTemplate);

module.exports = router;
