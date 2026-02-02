const express = require('express');
const router = express.Router();
const NoteController = require('../../controllers/sites/siteNoteController');
const { uploadSiteDocument } = require('../../middlewares/uploadMiddleware')

router.post('/add/:siteId',uploadSiteDocument,NoteController.addNote);
router.get('/getNotes',NoteController.getNotes);
router.put('/updateNotes/:id',NoteController.updateNotes);
module.exports = router;