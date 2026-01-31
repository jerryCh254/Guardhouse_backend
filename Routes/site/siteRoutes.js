const express = require('express');
const router = express.Router();
const SiteController = require('../../controllers/sites/siteControllers');
const contactRoutes = require('./contactRoutes');

router.use('/contact',contactRoutes);

router.post('/addSite/:customerId', SiteController.createSite);
router.get('/getSites',SiteController.getSites);
router.put('/updateSite/:id',SiteController.updateSites);
router.delete('/deleteSite/:id',SiteController.deleteSite);
router.patch('/updateSiteStatus/:id',SiteController.updateSiteStatus);
module.exports = router;
