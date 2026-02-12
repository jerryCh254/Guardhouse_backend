const express = require('express');
const router = express.Router();
const EmployeeLeaveBalanceController = require('../../controllers/employee/employeeLeaveBalanceController');

// Get employee leave balance
router.get('/balance/:employeeId', EmployeeLeaveBalanceController.getEmployeeLeaveBalance);

// Switch leave type
router.post('/switch-type/:employeeId', EmployeeLeaveBalanceController.switchLeaveType);

// Add balance adjustment
router.post('/adjustment/:employeeId', EmployeeLeaveBalanceController.addBalanceAdjustment);

// Get leave balance history
router.get('/history/:employeeId', EmployeeLeaveBalanceController.getLeaveBalanceHistory);

// Update history status
router.put('/history/:employeeId/:historyId/status', EmployeeLeaveBalanceController.updateHistoryStatus);

// Initialize leave balance for new employee
router.post('/initialize', EmployeeLeaveBalanceController.initializeLeaveBalance);

module.exports = router;
