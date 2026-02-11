const express = require('express');
const router = express.Router();
const EmployeeSiteController = require('../../controllers/employee/employeeSiteController');

router.get('/getAllSites',EmployeeSiteController.getSites);
router.get('/getPrefferedSiteForEmployee/:id',EmployeeSiteController.getPreferredSitesByEmployee);
router.post('/blacklistEmployeeFromAllSite/:id',EmployeeSiteController.blacklistEmployee);
router.post('/addPreferredEmployee',EmployeeSiteController.addPreferredEmployee);
router.post('/removePreferredEmployee',EmployeeSiteController.removePreferredEmployee);
router.post('/blacklistEmployeeFromSite',EmployeeSiteController.blacklistEmployeeFromSite);

module.exports = router;
