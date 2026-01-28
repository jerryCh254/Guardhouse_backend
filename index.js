require('dotenv').config();
const express = require('express');
const ConnectDB = require('./config/db');
const authRoutes = require('./Routes/authRoute.js');
const companyRoutes = require('./Routes/companyRoute.js')
const customerRoutes = require('./Routes/customerRoutes.js');
const { PORT }= require('./config/env');
const app = express();
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/company',companyRoutes);
app.use('/api/customer',customerRoutes);

ConnectDB();
app.listen(PORT,()=>{
    console.log(`Server is connected to Port:${PORT}`);
})