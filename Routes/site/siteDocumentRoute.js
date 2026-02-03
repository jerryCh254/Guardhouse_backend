const express = require('express');
const router = express.Router();
const SiteDocumentController = require('../../controllers/sites/siteDocumentController.js');
const { uploadSiteDoc } = require('../../middlewares/uploadMiddleware')

router.post('/addSiteDocument/:siteId',uploadSiteDoc,SiteDocumentController.addSiteDoc);
router.get('/getSiteDocuments',uploadSiteDoc,SiteDocumentController.getSiteDoc);
router.put('/updateSiteDocument/:id',uploadSiteDoc,SiteDocumentController.updateSiteDoc);
module.exports = router;