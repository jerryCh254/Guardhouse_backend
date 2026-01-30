const express = require('express');
const router = express.Router();
const RoleTemplateController = require('../../controllers/company/roleTemplateController');
const auth = require('../../middlewares/authmiddleware');

router.use(auth);

router.get('/', RoleTemplateController.getRoleTemplates);
router.get('/:id', RoleTemplateController.getRoleTemplateById);
router.post('/', RoleTemplateController.createRoleTemplate);
router.put('/:id', RoleTemplateController.updateRoleTemplate);
router.delete('/:id', RoleTemplateController.deleteRoleTemplate);

module.exports = router;
