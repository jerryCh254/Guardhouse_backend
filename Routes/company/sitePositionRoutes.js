const express = require('express');
const router = express.Router();
const SitePositionController = require('../../controllers/company/sitePositionController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', SitePositionController.getSitePositions);
router.get('/:id', SitePositionController.getSitePositionById);
router.post('/', SitePositionController.createSitePosition);
router.put('/:id', SitePositionController.updateSitePosition);
router.delete('/:id', SitePositionController.deleteSitePosition);

module.exports = router;
