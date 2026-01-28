const express = require('express');
const router = express.Router();
const { CompanyRegister, UpdateStatus, CompanyLogin, CompanyForgetPassword,getAllCompanies } = require('../Controllers/company.Controllers');
const auth = require('../middlewares/auth.middleware');
const IsSuperAdmin = require('../middlewares/SuperAdmin');

router.post ('/register',auth,CompanyRegister);
router.put('/update/:id/status',auth,IsSuperAdmin,UpdateStatus);
router.post('/login',CompanyLogin);
router.post('/forgetpassword',CompanyForgetPassword);
router.get('/get-all-companaies',auth,IsSuperAdmin,getAllCompanies);
module.exports = router