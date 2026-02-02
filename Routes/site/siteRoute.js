const express = require('express');
const router = express.Router();
const SiteController = require('../../controllers/sites/siteController');
const contactRoutes = require('./contactRoute');
const preferredStaffRoutes = require('./perferredStaffRoute');
const siteNoteRoutes = require('./siteNoteRoute');

router.use('/contact',contactRoutes);
router.use('/preferred-staff',preferredStaffRoutes);
router.use('/note', siteNoteRoutes);

router.post('/addSite/:customerId', SiteController.createSite);
router.get('/getSites',SiteController.getSites);
router.put('/updateSite/:id',SiteController.updateSites);
router.delete('/deleteSite/:id',SiteController.deleteSite);
router.patch('/updateSiteStatus/:id',SiteController.updateSiteStatus);
module.exports = router;
