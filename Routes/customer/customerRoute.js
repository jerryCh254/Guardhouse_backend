const express = require('express');
const router = express.Router();
const { createCustomer, getAllCustomers, updateCustomer, deleteCustomers, updateCustomerStatus } = require('../../Controllers/customer/customerController');
const auth = require('../../middlewares/authmiddleware');
const allowRoles = require('../../middlewares/allowRoles');

router.post('/createCustomer', auth, createCustomer);
router.get('/getAllCustomers', auth, getAllCustomers);
router.get('/getAllCustomers/:status', auth, getAllCustomers);
router.put('/updateCustomer/:id', auth, updateCustomer);
router.delete('/deleteCustomer/:id', auth, deleteCustomers);
router.patch('/updateCustomerStatus/:id', auth, updateCustomerStatus);

module.exports = router;
