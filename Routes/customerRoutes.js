const express = require('express');
const router = express.Router();
const { createCustomer, getAllCustomers, updateCustomer, deleteCustomers,updateCustomerStatus }= require('../Controllers/customerControllers');
const auth = require('../middlewares/authmiddleware');
const allowRoles = require('../middlewares/allowRoles');
router.post('/createCustomer',
    auth,
    allowRoles("SUPER_ADMIN","ADMIN","MANAGER"),
    createCustomer);
router.get('/getAllCustomers/{:status}',auth,allowRoles("SUPER_ADMIN","ADMIN","MANAGER"),getAllCustomers);
router.put('/updateCustomer/{:id}',auth,allowRoles("SUPER_ADMIN","ADMIN","MANAGER"),updateCustomer);
router.delete('/deleteCustomer/{:id}',auth,allowRoles("SUPER_ADMIN","ADMIN","MANAGER"),deleteCustomers);
router.patch('/updateCustomerStatus/{:id}',auth,allowRoles("SUPER_ADMIN","ADMIN","MANAGER"),updateCustomerStatus);


module.exports = router;