const express = require('express');
const router = express.Router();
const ComplianceController = require('../../Controllers/company/complianceController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', ComplianceController.getComplianceItems);
router.get('/:id/renewals', ComplianceController.getRenewals);
router.get('/:id', ComplianceController.getComplianceItemById);
router.post('/', ComplianceController.createComplianceItem);
router.post('/:id/renewals', ComplianceController.addRenewal);
router.put('/:id', ComplianceController.updateComplianceItem);
router.delete('/:id', ComplianceController.deleteComplianceItem);

module.exports = router;
