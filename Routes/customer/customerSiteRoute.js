const express = require('express');
const router = express.Router();
const CustomerWebsiteController = require('../../controllers/customer/customerSitesController');
const auth = require('../../middlewares/authmiddleware');

router.get('/getCustomerWebsiteData/:customerName', auth, CustomerWebsiteController.getCustomerWebsiteData);
router.get('/getCustomerStaticSites/:customerName', auth, CustomerWebsiteController.getCustomerStaticSites);
router.get('/getCustomerPatrolSites/:customerName', auth, CustomerWebsiteController.getCustomerPatrolSites);
router.get('/getAllCustomerPortals', auth, CustomerWebsiteController.getAllCustomerPortals);
router.get('/getAllCustomerPortals/:status', auth, CustomerWebsiteController.getAllCustomerPortals);
router.get('/getCustomerPortalInfo/:customerName', auth, CustomerWebsiteController.getCustomerPortalInfo);

module.exports = router;
