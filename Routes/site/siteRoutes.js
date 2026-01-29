const express = require('express');
const router = express.Router();
const { createSite } = require('../../Controllers/site/siteControllers');

router.post('/createSite',createSite);
module.exports = router;
