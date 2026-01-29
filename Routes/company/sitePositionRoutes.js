const express = require('express');
const router = express.Router();
const sitePositionController = require('../../Controllers/company/sitePositionController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', sitePositionController.getSitePositions);
router.get('/:id', sitePositionController.getSitePositionById);
router.post('/', sitePositionController.createSitePosition);
router.put('/:id', sitePositionController.updateSitePosition);
router.delete('/:id', sitePositionController.deleteSitePosition);

module.exports = router;
