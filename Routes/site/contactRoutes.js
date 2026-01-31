const express = require('express');
const ContactController = require('../../controllers/sites/contactControllers');
const router = express.Router();

router.post('/addContact/:siteId', ContactController.createContact);
module.exports = router;