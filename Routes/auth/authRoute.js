const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/auth/authController');
const auth = require('../../middlewares/authmiddleware');

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/forgetpassword', AuthController.forgetPassword);
router.post('/resetpassword', AuthController.resetPassword);
router.post('/logout', auth, AuthController.logout);
router.get('/getAllUsers', AuthController.getUsers);
module.exports = router;
