const express = require('express');
const router = express.Router();
const SubmittedComplianceController = require('../../controllers/employee/submittedComplianceController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', SubmittedComplianceController.getSubmittedComplianceList);
router.get('/:id', SubmittedComplianceController.getSubmittedComplianceById);
router.post('/', SubmittedComplianceController.createSubmittedCompliance);
router.put('/:id/approve', SubmittedComplianceController.approve);
router.put('/:id/reject', SubmittedComplianceController.reject);
router.put('/:id/cancel', SubmittedComplianceController.cancel);

module.exports = router;
