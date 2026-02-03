const express = require('express');
const ContactController = require('../../controllers/sites/siteContactController');
const router = express.Router();

router.post('/addContact/:siteId', ContactController.createContact);
router.get('/getContacts', ContactController.getContact);
router.put('/updateContact/:id', ContactController.updateContact);
router.delete('/deleteContact/:id', ContactController.deleteContact);

module.exports = router;