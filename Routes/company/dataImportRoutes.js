const express = require('express');
const router = express.Router();
const DataImportController = require('../../Controllers/company/dataImportController');
const auth = require('../../middlewares/authmiddleware');
const { uploadDataImport } = require('../../middlewares/uploadMiddleware');

router.use(auth);

router.get('/types', DataImportController.getImportTypes);
router.get('/', DataImportController.getDataImports);
router.get('/:jobId/status', DataImportController.getDataImportStatus);
router.post('/', uploadDataImport, DataImportController.createDataImport);

module.exports = router;
