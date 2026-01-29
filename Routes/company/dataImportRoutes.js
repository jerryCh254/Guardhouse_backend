const express = require('express');
const router = express.Router();
const dataImportController = require('../../Controllers/company/dataImportController');
const auth = require('../../middlewares/authmiddleware');
const { uploadDataImport } = require('../../middlewares/uploadMiddleware');

router.use(auth);

router.get('/types', dataImportController.getImportTypes);
router.get('/', dataImportController.getDataImports);
router.get('/:jobId/status', dataImportController.getDataImportStatus);
router.post('/', uploadDataImport, dataImportController.createDataImport);

module.exports = router;
