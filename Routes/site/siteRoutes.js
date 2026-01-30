const express = require('express');
const router = express.Router();
const SiteController = require('../../Controllers/sites/siteControllers');

router.post('/createSite', SiteController.createSite);
module.exports = router;
