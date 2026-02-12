const express = require('express');
const router = express.Router();
const EmployeeNoteController = require('../../controllers/employee/employeeNotesController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

// Employee Notes Routes
router.post('/add/:siteId', EmployeeNoteController.addNote);
router.get('/getNotes', EmployeeNoteController.getNotes);
router.put('/updateNotes/:id', EmployeeNoteController.updateNotes);

module.exports = router;