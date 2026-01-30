const express = require('express');
const router = express.Router({ mergeParams: true });
const HrNoteController = require('../../controllers/employee/hrNoteController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', HrNoteController.getNotesByEmployee);
router.post('/', HrNoteController.createNote);
router.delete('/:noteId', HrNoteController.deleteNote);

module.exports = router;
