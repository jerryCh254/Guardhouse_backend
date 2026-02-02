const express = require('express');
const router = express.Router();
const SitePositionController = require('../../controllers/sites/sitePositionController.js');

router.post('/addSitePosition/:id',SitePositionController.addSitePosition);
router.get('/getSitePositions',SitePositionController.getSitePosition);
router.get('/getSitePosition/:id',SitePositionController.getSitePositionById);
router.put('/updateSitePosition/:id',SitePositionController.updateSitePosition);
router.delete('/deleteSitePosition/:id',SitePositionController.deleteSitePosition);
module.exports = router;