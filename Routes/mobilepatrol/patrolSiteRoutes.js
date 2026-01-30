const express = require('express');
const router = express.Router();
const PatrolSiteController = require('../../controllers/mobilepatrol/patrolSiteController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', PatrolSiteController.getPatrolSites);
router.get('/:id', PatrolSiteController.getPatrolSiteById);
router.post('/', PatrolSiteController.createPatrolSite);
router.put('/:id', PatrolSiteController.updatePatrolSite);
router.delete('/:id', PatrolSiteController.deletePatrolSite);

module.exports = router;
