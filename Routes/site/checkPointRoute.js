const express = require('express');
const CheckPointController = require('../../controllers/sites/checkPointController');
const router = express.Router();

// Create checkpoint for a site
router.post('/site/:siteId/create', CheckPointController.createCheckpoint);

// Get all checkpoints for a site
router.get('/site/:siteId', CheckPointController.getCheckpointsBySite);

// Get all checkpoints
router.get('/all', CheckPointController.getAllCheckpoints);

// Verify checkpoint by code with location check
router.post('/verify/:code', CheckPointController.verifyCheckpoint);

// Verify QR code with embedded location data
router.post('/verify-qr', CheckPointController.verifyQRCode);

// Set geofence for a checkpoint
router.post('/:checkpointId/geofence', CheckPointController.setGeofence);

// Check if user is within geofence
router.get('/:checkpointId/geofence/check', CheckPointController.checkGeofence);

// Get all checkpoints with geofence enabled
router.get('/geofence/enabled', CheckPointController.getGeofenceCheckpoints);

// Update checkpoint with geofence
router.put('/:checkpointId/geofence', CheckPointController.updateCheckpointWithGeofence);

// Find nearby checkpoints
router.get('/nearby', CheckPointController.findNearbyCheckpoints);

module.exports = router;
