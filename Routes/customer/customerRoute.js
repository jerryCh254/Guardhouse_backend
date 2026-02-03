const express = require('express');
const router = express.Router();
const CustomerController = require('../../controllers/customer/customerController');
const auth = require('../../middlewares/authmiddleware');
const customerPortal = require('./customerPortalRoute');

router.use('/customerPortal',customerPortal);

router.post('/createCustomer', auth, CustomerController.createCustomer);
router.get('/getAllCustomers', auth, CustomerController.getAllCustomers);
router.get('/getAllCustomers/:status', auth, CustomerController.getAllCustomers);
router.put('/updateCustomer/:id', auth, CustomerController.updateCustomer);
router.delete('/deleteCustomer/:id', auth, CustomerController.deleteCustomers);
router.patch('/updateCustomerStatus/:id', auth, CustomerController.updateCustomerStatus);

module.exports = router;
