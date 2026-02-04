const express = require('express');
const router = express.Router();
const CustomerController = require('../../controllers/customer/customerController');
const auth = require('../../middlewares/authmiddleware');
const customerPortal = require('./customerPortalRoute');
const customerSite = require('./customerSiteRoute');
const customerDocument = require('./customerDocumentRoute');
const enhancedCustomerDocument = require('./enhancedCustomerDocumentRoute');
const eventDetails = require('./eventDetailsRoute');

router.use('/customerPortal',customerPortal);
router.use('/site', customerSite);
router.use('/document', customerDocument);
router.use('/documents', enhancedCustomerDocument);
router.use('/event-details', eventDetails);

router.post('/createCustomer', auth, CustomerController.createCustomer);
router.get('/getAllCustomers', auth, CustomerController.getAllCustomers);
router.get('/getAllCustomers/:status', auth, CustomerController.getAllCustomers);
router.put('/updateCustomer/:id', auth, CustomerController.updateCustomer);
router.delete('/deleteCustomer/:id', auth, CustomerController.deleteCustomers);
router.patch('/updateCustomerStatus/:id', auth, CustomerController.updateCustomerStatus);

module.exports = router;
