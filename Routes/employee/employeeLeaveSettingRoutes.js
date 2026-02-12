const express = require('express');
const router = express.Router();
const EmployeeLeaveSettingController = require('../../controllers/employee/employeeLeaveSettingController');

router.post('/createLeaveSetting',EmployeeLeaveSettingController.createLeaveSetting);
router.get('/getAllLeaveSetting',EmployeeLeaveSettingController.getAllLeaveSettings);
router.put('/updateLeaveSetting/:id',EmployeeLeaveSettingController.updateLeaveSetting);
router.delete('/deleteLeaveSetting/:id',EmployeeLeaveSettingController.deleteLeaveSetting);

module.exports = router;
