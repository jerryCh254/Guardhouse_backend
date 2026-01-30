require('dotenv').config();
const express = require('express');
const ConnectDB = require('./config/db');
const authRoutes = require('./routes/auth/authRoute.js');
const companyRoutes = require('./routes/company/companyRoute.js');
const customerRoutes = require('./routes/customer/customerRoute.js');
const siteRoutes = require('./routes/site/siteRoutes.js');
const mobilePatrolRoutes = require('./routes/mobilepatrol/mobilePatrolRoute.js');
const staffRoutes = require('./routes/employee/staffRoute.js');
const { PORT } = require('./config/env');
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/site', siteRoutes);
app.use('/api/mobile-patrol', mobilePatrolRoutes);
app.use('/api/staff', staffRoutes);

ConnectDB();
app.listen(PORT,()=>{
    console.log(`Server is connected to Port:${PORT}`);
})