const express = require('express');
const router = express.Router();
const EventDetailsController = require('../../controllers/customer/eventDetailsController');
const auth = require('../../middlewares/authmiddleware');
const { uploadEventDetails } = require('../../middlewares/uploadMiddleware');

// Create Event Details (with optional file upload)
router.post('/createEventDetails/:customerId', uploadEventDetails, EventDetailsController.createEventDetails);

// Get Event Details by Customer
router.get('/getEventDetailsByCustomer/:customerId', auth, EventDetailsController.getEventDetailsByCustomer);

// Update Event Details (with optional file upload)
router.put('/updateEventDetails/:id', auth, uploadEventDetails, EventDetailsController.updateEventDetails);

// Master License Management
router.post('/addMasterLicense/:id', auth, EventDetailsController.addMasterLicense);
router.put('/updateMasterLicense/:id/:licenseIndex', auth, EventDetailsController.updateMasterLicense);
router.delete('/deleteMasterLicense/:id/:licenseIndex', auth, EventDetailsController.deleteMasterLicense);

// Delete Event Details
router.delete('/deleteEventDetails/:id', auth, EventDetailsController.deleteEventDetails);

module.exports = router;
