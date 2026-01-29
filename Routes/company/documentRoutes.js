const express = require('express');
const router = express.Router();
const documentController = require('../../Controllers/company/documentController');
const auth = require('../../middlewares/authmiddleware');
const { uploadCompanyDocument } = require('../../middlewares/uploadMiddleware');

router.use(auth);

router.get('/', documentController.getDocuments);
router.get('/:id/download', documentController.downloadDocument);
router.get('/:id', documentController.getDocumentById);
router.post('/', uploadCompanyDocument, documentController.createDocument);
router.put('/:id', documentController.updateDocument);
router.delete('/:id', documentController.deleteDocument);

module.exports = router;
