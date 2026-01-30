const express = require('express');
const router = express.Router();
const DocumentController = require('../../controllers/company/documentController');
const auth = require('../../middlewares/authmiddleware');
const { uploadCompanyDocument } = require('../../middlewares/uploadMiddleware');

router.use(auth);

router.get('/', DocumentController.getDocuments);
router.get('/:id/download', DocumentController.downloadDocument);
router.get('/:id', DocumentController.getDocumentById);
router.post('/', uploadCompanyDocument, DocumentController.createDocument);
router.put('/:id', DocumentController.updateDocument);
router.delete('/:id', DocumentController.deleteDocument);

module.exports = router;
