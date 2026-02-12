const express = require('express');
const router = express.Router();
const MasterLicenseController = require('../../controllers/customer/masterLicenseController');
const auth = require('../../middlewares/authmiddleware');

// Apply auth middleware to all routes
router.use(auth);

// Master License Routes
router.post('/add/:eventDetailsId', MasterLicenseController.addMasterLicense);
router.get('/list/:eventDetailsId', MasterLicenseController.getMasterLicenses);
router.put('/update/:eventDetailsId/:licenseId', MasterLicenseController.updateMasterLicense);
router.delete('/delete/:eventDetailsId/:licenseId', MasterLicenseController.deleteMasterLicense);

module.exports = router;
