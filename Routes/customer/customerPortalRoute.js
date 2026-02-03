const express = require('express');
const router = express.Router();
const CustomerPortalController = require('../../controllers/customer/customerPortaController');
const auth = require('../../middlewares/authmiddleware');

router.post('/createCustomerPortal/:id',CustomerPortalController.createCustomerPortal);
router.get ('/getAllCustomerPortal',CustomerPortalController.getAllCustomersPortal);

module.exports = router;
