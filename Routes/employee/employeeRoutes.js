const express = require('express');
const router = express.Router();
const EmployeeController = require('../../controllers/employee/employeeController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', EmployeeController.getEmployees);
router.get('/:id', EmployeeController.getEmployeeById);
router.post('/', EmployeeController.createEmployee);
router.put('/:id', EmployeeController.updateEmployee);
router.delete('/:id', EmployeeController.deleteEmployee);
router.patch('/:id/status', EmployeeController.updateEmployeeStatus);

module.exports = router;
