const express = require('express');
const router = express.Router();
const skillController = require('../../Controllers/company/skillController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', skillController.getSkills);
router.get('/:id', skillController.getSkillById);
router.post('/', skillController.createSkill);
router.put('/:id', skillController.updateSkill);
router.delete('/:id', skillController.deleteSkill);

module.exports = router;
