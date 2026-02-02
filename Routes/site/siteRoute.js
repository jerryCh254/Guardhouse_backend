const express = require('express');
const router = express.Router();
const SiteController = require('../../controllers/sites/siteController');
const contactRoutes = require('./contactRoute');
const preferredStaffRoutes = require('./perferredStaffRoute');
const siteNoteRoutes = require('./siteNoteRoute');
const sitePositionRoutes = require('./sitePositionRoute');
const checkPointRoute = require('./checkPointRoute')
router.use('/contact',contactRoutes);
router.use('/preferred-staff',preferredStaffRoutes);
router.use('/note', siteNoteRoutes);
router.use('/sitePosition',sitePositionRoutes);
router.use('/checkPoint',checkPointRoute);


router.post('/addSite/:customerId', SiteController.createSite);
router.get('/getSites',SiteController.getSites);
router.get('/getSite/:id',SiteController.getSiteById);
router.put('/updateSite/:id',SiteController.updateSites);
router.delete('/deleteSite/:id',SiteController.deleteSite);
router.patch('/updateSiteStatus/:id',SiteController.updateSiteStatus);
module.exports = router;
