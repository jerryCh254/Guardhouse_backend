const express = require('express');
const router = express.Router();
const { CompanyRegister, UpdateStatus, CompanyLogin, CompanyForgetPassword,getAllCompanies } = require('../Controllers/company.Controllers');
const auth = require('../middlewares/auth.middleware');
const IsSuperAdmin = require('../middlewares/SuperAdmin');

router.post ('/register',auth,CompanyRegister);
router.put('/request/:id/status',auth,IsSuperAdmin,UpdateStatus);
router.post('/login',CompanyLogin);
router.post('/forgetpassword',CompanyForgetPassword);
router.get('/get-all-companies{/:status}', auth, IsSuperAdmin, getAllCompanies);
module.exports = router