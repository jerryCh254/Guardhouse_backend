const express = require('express');
const router = express.Router();
const CompanyController = require('../../Controllers/company/companyController');
const auth = require('../../middlewares/authmiddleware');
const IsSuperAdmin = require('../../middlewares/superAdmin');

const holidayRoutes = require('./holidayRoutes');
const skillRoutes = require('./skillRoutes');
const complianceRoutes = require('./complianceRoutes');
const roleTemplateRoutes = require('./roleTemplateRoutes');
const documentRoutes = require('./documentRoutes');
const dataImportRoutes = require('./dataImportRoutes');
const sitePositionRoutes = require('./sitePositionRoutes');

router.post('/register', auth, CompanyController.companyRegister);
router.put('/request/:id/status', auth, IsSuperAdmin, CompanyController.updateStatus);
router.post('/login', CompanyController.companyLogin);
router.post('/forgetpassword', CompanyController.companyForgetPassword);
router.get('/getAllCompanies', auth, IsSuperAdmin, CompanyController.getAllCompanies);
router.get('/getAllCompanies/:status', auth, IsSuperAdmin, CompanyController.getAllCompanies);

router.use('/holidays', holidayRoutes);
router.use('/skills', skillRoutes);
router.use('/compliance-items', complianceRoutes);
router.use('/role-templates', roleTemplateRoutes);
router.use('/documents', documentRoutes);
router.use('/data-import', dataImportRoutes);
router.use('/site-positions', sitePositionRoutes);

module.exports = router;
