const express = require('express');
const router = express.Router();
const { CompanyRegister, UpdateStatus, CompanyLogin, CompanyForgetPassword,getAllCompanies } = require('../Controllers/companyControllers');
const auth = require('../middlewares/authmiddleware');
const IsSuperAdmin = require('../middlewares/superAdmin');

router.post ('/register',auth,CompanyRegister);
router.put('/request/:id/status',auth,IsSuperAdmin,UpdateStatus);
router.post('/login',CompanyLogin);
router.post('/forgetpassword',CompanyForgetPassword);
router.get('/get-all-companies{/:status}', auth, IsSuperAdmin, getAllCompanies);
module.exports = router