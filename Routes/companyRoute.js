const express = require('express');
const router = express.Router();
const { companyRegister, updateStatus, companyLogin, companyForgetPassword,getAllCompanies } = require('../Controllers/companyControllers');
const auth = require('../middlewares/authmiddleware');
const IsSuperAdmin = require('../middlewares/superAdmin');

router.post ('/register',auth,companyRegister);
router.put('/request/:id/status',auth,IsSuperAdmin,updateStatus);
router.post('/login',companyLogin);
router.post('/forgetpassword',companyForgetPassword);
router.get('/getAllCompanies{/:status}', auth, IsSuperAdmin, getAllCompanies);
module.exports = router