const express = require('express');
const router = express.Router();
const employeeRoutes = require('./employeeRoutes');
const hrNoteRoutes = require('./hrNoteRoutes');
const complianceRequestRoutes = require('./complianceRequestRoutes');
const managerSiteRoutes = require('./managerSiteRoutes');
const submittedComplianceRoutes = require('./submittedComplianceRoutes');

router.use('/employees', employeeRoutes);
router.use('/employees/:id/notes', hrNoteRoutes);
router.use('/employees/:id/compliance-requests', complianceRequestRoutes);
router.use('/employees/:id/manager-sites', managerSiteRoutes);
router.use('/submitted-compliance', submittedComplianceRoutes);

module.exports = router;
