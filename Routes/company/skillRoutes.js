const express = require('express');
const router = express.Router();
const SkillController = require('../../Controllers/company/skillController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', SkillController.getSkills);
router.get('/:id', SkillController.getSkillById);
router.post('/', SkillController.createSkill);
router.put('/:id', SkillController.updateSkill);
router.delete('/:id', SkillController.deleteSkill);

module.exports = router;
