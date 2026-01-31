const express = require('express');
const router = express.Router();
const PreferredStaffController = require('../../controllers/sites/preferredStaffController');

router.post('/employee/:employeeId/preferred', PreferredStaffController.addOrCheckPreferredStaff);

router.get('/employee/:employeeId/blocked', PreferredStaffController.getBlockedEmployees);
router.get('/blocked', PreferredStaffController.getBlockedEmployees);

router.get('/preferred', PreferredStaffController.getPreferredEmployees);

router.put('/employee/:employeeId/update', PreferredStaffController.updatePreferredStaff);

module.exports = router;