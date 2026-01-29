const express = require('express');
const router = express.Router();
const complianceController = require('../../Controllers/company/complianceController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', complianceController.getComplianceItems);
router.get('/:id/renewals', complianceController.getRenewals);
router.get('/:id', complianceController.getComplianceItemById);
router.post('/', complianceController.createComplianceItem);
router.post('/:id/renewals', complianceController.addRenewal);
router.put('/:id', complianceController.updateComplianceItem);
router.delete('/:id', complianceController.deleteComplianceItem);

module.exports = router;
