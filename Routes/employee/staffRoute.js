const express = require('express');
const router = express.Router();
const employeeRoutes = require('./employeeRoutes');
const hrNoteRoutes = require('./hrNoteRoutes');
const complianceRequestRoutes = require('./complianceRequestRoutes');
const managerSiteRoutes = require('./managerSiteRoutes');
const submittedComplianceRoutes = require('./submittedComplianceRoutes');
const employeeSiteRoutes = require('./employeeSiteRoutes');
const employeeNotesRoutes= require('./employeeNotesRoutes');
const complianceRoutes = require('./complianceRoutes');
const employeeSecurityLicenseRoutes = require('./employeeSecurityLicenseRoutes');
const employeeLeaveSettingRoutes = require('./employeeLeaveSettingRoutes');

router.use('/site',employeeSiteRoutes);
router.use('/employees', employeeRoutes);
router.use('/employees/:id/notes', hrNoteRoutes);
router.use('/employees/:id/compliance-requests', complianceRequestRoutes);
router.use('/employees/:id/manager-sites', managerSiteRoutes);
router.use('/submitted-compliance', submittedComplianceRoutes);
router.use('/notes',employeeNotesRoutes);
router.use('/compliance', complianceRoutes);
router.use('/security-license', employeeSecurityLicenseRoutes);
router.use('/site',employeeLeaveSettingRoutes);

module.exports = router;
