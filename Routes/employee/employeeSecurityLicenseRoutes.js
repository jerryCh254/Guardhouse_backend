const express = require('express');
const router = express.Router();
const EmployeeSecurityLicenseController = require('../../controllers/employee/employeeSecurityLicenseController');
const auth = require('../../middlewares/authmiddleware');
const { uploadSecurityLicense } = require('../../middlewares/uploadMiddleware');

router.use(auth);

router.get('/', EmployeeSecurityLicenseController.getSecurityLicenses);
router.get('/employee/:employeeId', EmployeeSecurityLicenseController.getSecurityLicensesByEmployee);
router.get('/:id', EmployeeSecurityLicenseController.getSecurityLicenseById);
router.post('/employee/:employeeId', uploadSecurityLicense, EmployeeSecurityLicenseController.addSecurityLicense);
router.put('/:id', uploadSecurityLicense, EmployeeSecurityLicenseController.updateSecurityLicense);
router.delete('/:id', EmployeeSecurityLicenseController.deleteSecurityLicense);

module.exports = router;
