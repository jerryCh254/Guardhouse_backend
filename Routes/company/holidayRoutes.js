const express = require('express');
const router = express.Router();
const HolidayController = require('../../Controllers/company/holidayController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', HolidayController.getHolidays);
router.get('/meta/countries', HolidayController.getMetaCountries);
router.get('/meta/states', HolidayController.getMetaStates);
router.get('/meta/years', HolidayController.getMetaYears);
router.get('/:id', HolidayController.getHolidayById);
router.post('/', HolidayController.createHoliday);
router.put('/:id', HolidayController.updateHoliday);
router.delete('/:id', HolidayController.deleteHoliday);

module.exports = router;
