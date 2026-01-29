const express = require('express');
const router = express.Router();
const holidayController = require('../../Controllers/company/holidayController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', holidayController.getHolidays);
router.get('/meta/countries', holidayController.getMetaCountries);
router.get('/meta/states', holidayController.getMetaStates);
router.get('/meta/years', holidayController.getMetaYears);
router.get('/:id', holidayController.getHolidayById);
router.post('/', holidayController.createHoliday);
router.put('/:id', holidayController.updateHoliday);
router.delete('/:id', holidayController.deleteHoliday);

module.exports = router;
