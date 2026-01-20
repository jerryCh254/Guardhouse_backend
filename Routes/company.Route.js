const express = require('express');
const router = express.Router();
const { CompanyRegister, UpdateStatus } = require('../Controllers/company.Controllers');
const auth = require('../middlewares/auth.middleware');
const IsSuperAdmin = require('../middlewares/SuperAdmin');

router.post ('/register',auth,CompanyRegister);
router.put('/update/:id/status',auth,IsSuperAdmin,UpdateStatus);
module.exports = router