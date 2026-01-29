const express = require('express');
const router = express.Router();
const roleTemplateController = require('../../Controllers/company/roleTemplateController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', roleTemplateController.getRoleTemplates);
router.get('/:id', roleTemplateController.getRoleTemplateById);
router.post('/', roleTemplateController.createRoleTemplate);
router.put('/:id', roleTemplateController.updateRoleTemplate);
router.delete('/:id', roleTemplateController.deleteRoleTemplate);

module.exports = router;
