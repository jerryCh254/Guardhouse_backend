const express = require('express');
const ConnectDB = require('./config/db');
const authRoutes = require('./Routes/Auth.Route.js')
const { PORT }= require('./config/env');
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(express.json());

app.use('/api/auth',authRoutes);

ConnectDB();
app.listen(PORT,()=>{
    console.log(`Server is connected to Port:${PORT}`);
})