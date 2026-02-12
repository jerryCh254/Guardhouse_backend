const express = require('express');
const router = express.Router();
const CustomerDocumentController = require('../../controllers/customer/customerDocumentController');
const auth = require('../../middlewares/authmiddleware');
const { uploadCustomerDocMiddleware } = require('../../middlewares/uploadMiddleware')


router.post('/createDocument/:customerId', uploadCustomerDocMiddleware, CustomerDocumentController.createDocument);
router.get('/getAllDocuments', CustomerDocumentController.getCustomerDocument);
router.get('/getDocumentsByCustomer/:customerId', auth, CustomerDocumentController.getDocumentsByCustomer);
router.put('/updateDocument/:id', auth, CustomerDocumentController.updateCustomerDocument);
router.delete('/deleteDocument/:id', auth, CustomerDocumentController.deleteDocument);

module.exports = router;