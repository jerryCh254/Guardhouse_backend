const express = require('express');
const CheckPointController = require('../../controllers/sites/checkPointController');
const router = express.Router();

router.post('/addQrCode',CheckPointController.createCheckpoint);
module.exports = router;
