const express = require('express');
const router = express.Router();
const RunsheetController = require('../../controllers/mobilepatrol/runsheetController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', RunsheetController.getRunsheets);
router.get('/:id', RunsheetController.getRunsheetById);
router.post('/', RunsheetController.createRunsheet);
router.put('/:id', RunsheetController.updateRunsheet);
router.delete('/:id', RunsheetController.deleteRunsheet);

module.exports = router;
