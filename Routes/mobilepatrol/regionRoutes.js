const express = require('express');
const router = express.Router();
const RegionController = require('../../controllers/mobilepatrol/regionController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', RegionController.getRegions);
router.get('/:id', RegionController.getRegionById);
router.post('/', RegionController.createRegion);
router.put('/:id', RegionController.updateRegion);
router.delete('/:id', RegionController.deleteRegion);

module.exports = router;
