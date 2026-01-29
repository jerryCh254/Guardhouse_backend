const express = require('express');
const router = express.Router();
const { Signup, Login, forgetPassword, resetPassword, logout, getUsers } = require('../../Controllers/auth/authController');
const auth = require('../../middlewares/authmiddleware');

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/forgetpassword', forgetPassword);
router.post('/resetpassword', resetPassword);
router.post('/logout', auth, logout);
router.get('/getAllUsers', getUsers);
module.exports = router;
