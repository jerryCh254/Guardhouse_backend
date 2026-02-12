const express = require('express');
const router = express.Router();
const ComplianceController = require('../../controllers/employee/complianceController');
const auth = require('../../middlewares/authmiddleware');
const { uploadCompliance } = require('../../middlewares/uploadMiddleware');

router.use(auth);

router.get('/', ComplianceController.getComplianceList);
router.get('/:id', ComplianceController.getComplianceById);
router.post('/', uploadCompliance, ComplianceController.createCompliance);
router.put('/:id', uploadCompliance, ComplianceController.updateCompliance);
router.delete('/:id', ComplianceController.deleteCompliance);
router.put('/:id/approve', ComplianceController.approveCompliance);
router.put('/:id/reject', ComplianceController.rejectCompliance);
router.put('/:id/cancel', ComplianceController.cancelCompliance);

module.exports = router;
