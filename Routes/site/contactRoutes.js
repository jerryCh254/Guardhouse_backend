const express = require('express');
const ContactController = require('../../Controllers/sites/contactControllers');
const router = express.Router();

router.post('/addContact/:siteId', ContactController.createContact);
module.exports = router;