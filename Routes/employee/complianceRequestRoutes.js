const express = require('express');
const router = express.Router({ mergeParams: true });
const EmployeeComplianceRequestController = require('../../controllers/employee/employeeComplianceRequestController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', EmployeeComplianceRequestController.getRequestsByEmployee);
router.post('/', EmployeeComplianceRequestController.createRequest);

module.exports = router;
