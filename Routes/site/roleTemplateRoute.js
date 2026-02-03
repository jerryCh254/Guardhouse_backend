const express = require('express');
const router = express.Router();
const SiteRoleTemplateController = require('../../controllers/sites/roleTemplateController.js');
router.post('/addRoleTemplate/:id', SiteRoleTemplateController.createSiteRoleTemplate);
router.get('/getRoleTemplates/:siteId', SiteRoleTemplateController.getSiteRoleTemplates);
router.get('/getRoleTemplate/:siteId/:id', SiteRoleTemplateController.getSiteRoleTemplateById);
router.put('/updateRoleTemplate/:siteId/:id', SiteRoleTemplateController.updateSiteRoleTemplate);
router.delete('/deleteRoleTemplate/:siteId/:id', SiteRoleTemplateController.deleteSiteRoleTemplate);
module.exports = router;