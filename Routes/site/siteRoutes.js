const express = require('express');
const router = express.Router();
const SiteController = require('../../Controllers/sites/siteControllers');

router.post('/addSite/:customerId', SiteController.createSite);
router.get('/getSites',SiteController.getSites);
router.put('/updateSite/:id',SiteController.updateSites);
router.delete('/deleteSite/:id',SiteController.deleteSite);
router.patch('/updateSiteStatus/:id',SiteController.updateSiteStatus);
module.exports = router;
