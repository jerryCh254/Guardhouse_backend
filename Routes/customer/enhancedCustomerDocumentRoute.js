const express = require('express');
const router = express.Router();
const EnhancedCustomerDocumentController = require('../../controllers/customer/enhancedCustomerDocumentController');
const auth = require('../../middlewares/authmiddleware');
const { uploadCustomerDocMiddleware } = require('../../middlewares/uploadMiddleware');

router.post('/createDocument/:customerId', uploadCustomerDocMiddleware, EnhancedCustomerDocumentController.createDocument);

router.get('/getAllDocuments', auth, EnhancedCustomerDocumentController.getAllDocuments);
router.get('/getDocumentsByCustomer/:customerId', auth, EnhancedCustomerDocumentController.getDocumentsByCustomer);
router.get('/getDocumentById/:id', auth, EnhancedCustomerDocumentController.getDocumentById);
router.put('/updateDocument/:id', auth, uploadCustomerDocMiddleware, EnhancedCustomerDocumentController.updateDocument);
router.post('/renewDocument/:id', auth, EnhancedCustomerDocumentController.renewDocument);
router.delete('/deleteDocument/:id', auth, EnhancedCustomerDocumentController.deleteDocument);
router.get('/getDocumentsRequiringRenewal', auth, EnhancedCustomerDocumentController.getDocumentsRequiringRenewal);
router.get('/getDocumentsRequiringRenewal/:customerId', auth, EnhancedCustomerDocumentController.getDocumentsRequiringRenewal);
module.exports = router;
