require('dotenv').config();
const express = require('express');
const ConnectDB = require('./config/db');
const authRoutes = require('./Routes/auth/authRoute.js');
const companyRoutes = require('./Routes/company/companyRoute.js');
const customerRoutes = require('./Routes/customer/customerRoute.js');
const siteRoutes = require('./Routes/site/siteRoutes.js');
const { PORT }= require('./config/env');
const app = express();
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/company',companyRoutes);
app.use('/api/customer',customerRoutes);
app.use('/api/site',siteRoutes);

ConnectDB();
app.listen(PORT,()=>{
    console.log(`Server is connected to Port:${PORT}`);
})