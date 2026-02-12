const express = require('express');
const router = express.Router();
const EventDetailsController = require('../../controllers/customer/eventDetailsController');
const { uploadEventDetailsMiddleware } = require('../../middlewares/uploadMiddleware');

// Create Event Details (with optional file upload)
router.post('/createEventDetails/:customerId', uploadEventDetailsMiddleware, EventDetailsController.createEventDetails);

// Get Event Details by Customer
router.get('/getEventDetailsByCustomer/:customerId', EventDetailsController.getEventDetailsByCustomer);

// Update Event Details (with optional file upload)
router.put('/updateEventDetails/:id', uploadEventDetailsMiddleware, EventDetailsController.updateEventDetails);

// Delete Event Details
router.delete('/deleteEventDetails/:id', EventDetailsController.deleteEventDetails);

module.exports = router;
