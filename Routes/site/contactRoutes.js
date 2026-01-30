const express = require('express');
const ContactController = require('../../Controllers/sites/contactControllers');
const router = express.Router();

router.post('/addContact/:id',ContactController);
module.exports = router;