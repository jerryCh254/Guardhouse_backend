const express = require('express');
const router = express.Router();
const regionRoutes = require('./regionRoutes');
const patrolSiteRoutes = require('./patrolSiteRoutes');
const runsheetRoutes = require('./runsheetRoutes');

router.use('/regions', regionRoutes);
router.use('/patrol-sites', patrolSiteRoutes);
router.use('/runsheets', runsheetRoutes);

module.exports = router;
