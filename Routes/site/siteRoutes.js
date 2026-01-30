const express = require('express');
const router = express.Router();
const { createSite } = require('../../Controllers/customer/customerSiteControllers');

router.post('/createSite',createSite);
module.exports = router;
