const express = require('express');
const router = express.Router({ mergeParams: true });
const ManagerSiteAssignmentController = require('../../controllers/employee/managerSiteAssignmentController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', ManagerSiteAssignmentController.getSitesByManager);
router.put('/', ManagerSiteAssignmentController.updateManagerSites);

module.exports = router;
