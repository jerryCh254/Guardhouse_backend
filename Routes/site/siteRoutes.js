const express = require('express');
const router = express.Router();
const SiteController = require('../../controllers/sites/siteControllers');

router.post('/createSite', SiteController.createSite);
module.exports = router;
