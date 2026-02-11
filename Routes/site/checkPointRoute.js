const express = require('express');
const CheckPointController = require('../../controllers/sites/checkPointController');
const router = express.Router();

router.post('/site/:siteId/create', CheckPointController.createCheckpoint);
router.get('/site/:siteId', CheckPointController.getCheckpointsBySite);
router.get('/all', CheckPointController.getAllCheckpoints);
router.post('/verify/:code', CheckPointController.verifyCheckpoint);
router.post('/verify-qr', CheckPointController.verifyQRCode);
router.post('/:checkpointId/geofence', CheckPointController.setGeofence);
router.get('/:checkpointId/geofence/check', CheckPointController.checkGeofence);
router.get('/geofence/enabled', CheckPointController.getGeofenceCheckpoints);
router.put('/:checkpointId/geofence', CheckPointController.updateCheckpointWithGeofence);
router.get('/nearby', CheckPointController.findNearbyCheckpoints);

module.exports = router;
